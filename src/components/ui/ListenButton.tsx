'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { Pause, Play, Square, Volume2 } from 'lucide-react';
import styles from './ListenButton.module.css';

// Ported from Top Web Works' listen-button. Ranked allowlist of natural voices each browser ships, best first.
// Edge: Microsoft "Natural" voices. Safari: downloaded Premium/Enhanced voices, then Samantha.
// Chrome: Google US English. Zira beats Windows' default David as a last resort.
// ponytail: if these still sound dated, the upgrade is a pre-generated MP3 per post in <audio>.
const preferredVoices = [
  /Microsoft Ava/i,
  /Microsoft Andrew/i,
  /Microsoft Emma/i,
  /Microsoft Brian/i,
  /Microsoft Jenny/i,
  /Microsoft Aria/i,
  /Microsoft Guy/i,
  /\((Premium|Enhanced)\)/i,
  /Samantha/i,
  /Google US English$/i,
  /Microsoft Zira/i,
];

const noVoices: SpeechSynthesisVoice[] = [];
let curated = noVoices;
let curatedKey = '';

// Cached so useSyncExternalStore gets the same array until the voice list actually changes.
function curatedVoices() {
  if (!('speechSynthesis' in window)) return noVoices;
  const english = window.speechSynthesis.getVoices().filter((voice) => voice.lang.startsWith('en'));
  const picks = preferredVoices
    .map((pattern) => english.find((voice) => pattern.test(voice.name)))
    .filter((voice): voice is SpeechSynthesisVoice => Boolean(voice));
  const fallback = english.find((voice) => voice.default) ?? english[0];
  const next = picks.length > 0 ? picks : fallback ? [fallback] : noVoices;
  const key = next.map((voice) => voice.voiceURI).join('|');
  if (key !== curatedKey) {
    curated = next;
    curatedKey = key;
  }
  return curated;
}

// Chrome loads voices lazily and announces them with "voiceschanged".
function subscribeVoices(onChange: () => void) {
  if (!('speechSynthesis' in window)) return () => {};
  const synth = window.speechSynthesis;
  synth.addEventListener('voiceschanged', onChange);
  return () => synth.removeEventListener('voiceschanged', onChange);
}

// "Microsoft AvaMultilingual Online (Natural) - English (United States)" -> "Ava"
const voiceLabel = (voice: SpeechSynthesisVoice) =>
  voice.name
    .replace(/^Microsoft\s+/, '')
    .split(/\s+[-(]/)[0]
    .replace(/\s+Online$/, '')
    .replace(/\s*Multilingual/i, '');

const VOICE_KEY = 'bs_listen_voice';

function savedVoice() {
  try {
    return localStorage.getItem(VOICE_KEY) ?? '';
  } catch {
    return '';
  }
}

// ponytail: module-level timer, fine with one ListenButton per page.
let keepAlive: number | undefined;
const stopKeepAlive = () => window.clearInterval(keepAlive);

const states = {
  idle: { label: 'Listen', Icon: Volume2 },
  playing: { label: 'Pause', Icon: Pause },
  paused: { label: 'Resume', Icon: Play },
};

// Reads an element's text aloud with the browser's built-in speech. No service, no cost.
export default function ListenButton({
  targetId,
  title,
  className,
}: {
  targetId: string;
  title?: string;
  className?: string;
}) {
  // Empty on the server and until the browser lists voices, so hydration matches.
  const voices = useSyncExternalStore(subscribeVoices, curatedVoices, () => noVoices);
  const [voiceURI, setVoiceURI] = useState(savedVoice);
  const [status, setStatus] = useState<keyof typeof states>('idle');

  // Stop speaking when the reader leaves the page.
  useEffect(() => {
    return () => {
      stopKeepAlive();
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, []);

  if (voices.length === 0) return null;

  const voice = voices.find((v) => v.voiceURI === voiceURI) ?? voices[0];
  // Edge's Natural and Apple's Premium/Enhanced voices sound human; without one, point to Edge.
  const hint = /Natural|Premium|Enhanced/i.test(voices[0].name) ? undefined : 'Sounds best in Microsoft Edge';

  function start() {
    const text = document.getElementById(targetId)?.innerText ?? '';
    // One utterance per paragraph keeps natural phrasing; sentence-sized pieces sound choppy.
    const chunks = [title ?? '', ...text.split(/\n+/)].map((chunk) => chunk.trim()).filter(Boolean);
    if (chunks.length === 0) return;

    const synth = window.speechSynthesis;
    synth.cancel();
    synth.resume(); // Chrome stays paused after cancel() if it was paused.
    chunks.forEach((chunk, i) => {
      const utterance = new SpeechSynthesisUtterance(chunk);
      utterance.voice = voice;
      utterance.lang = voice.lang;
      utterance.rate = 0.9; // A little slower than the browser default.
      if (i === chunks.length - 1) {
        utterance.onend = utterance.onerror = () => {
          stopKeepAlive();
          setStatus('idle');
        };
      }
      synth.speak(utterance);
    });

    // Chrome's Google voices go silent about 15s into an utterance; a quick pause/resume keeps them going.
    stopKeepAlive();
    if (voice.name.startsWith('Google')) {
      keepAlive = window.setInterval(() => {
        if (synth.speaking && !synth.paused) {
          synth.pause();
          synth.resume();
        }
      }, 10000);
    }
    setStatus('playing');
  }

  function toggle() {
    const synth = window.speechSynthesis;
    if (status === 'idle') return start();
    if (status === 'playing') {
      synth.pause();
      setStatus('paused');
    } else {
      synth.resume();
      setStatus('playing');
    }
  }

  function stop() {
    stopKeepAlive();
    window.speechSynthesis.cancel();
    setStatus('idle');
  }

  function chooseVoice(uri: string) {
    stop(); // The next Listen uses the new voice.
    setVoiceURI(uri);
    try {
      localStorage.setItem(VOICE_KEY, uri);
    } catch {}
  }

  const { label, Icon } = states[status];

  return (
    <div className={className ? `${styles.listen} ${className}` : styles.listen}>
      <button type="button" onClick={toggle} className={styles.toggle} title={status === 'idle' ? hint : undefined}>
        <Icon size={16} aria-hidden="true" />
        {label}
      </button>
      {status !== 'idle' && (
        <button type="button" onClick={stop} aria-label="Stop listening" className={styles.stop}>
          <Square size={12} fill="currentColor" aria-hidden="true" />
        </button>
      )}
      {voices.length > 1 && (
        <>
          <span aria-hidden="true" className={styles.divider} />
          <select
            aria-label="Voice"
            value={voice.voiceURI}
            onChange={(event) => chooseVoice(event.target.value)}
            className={styles.voice}
          >
            {voices.map((v) => (
              <option key={v.voiceURI} value={v.voiceURI}>
                {voiceLabel(v)}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
}
