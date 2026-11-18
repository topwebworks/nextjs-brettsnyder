// Native radio behavior provides Arrow/Space selection; inactive content stays out of focus.
document.querySelectorAll('.master-tab-wrap').forEach(group => {
  const radios = [...group.querySelectorAll('input.tab')];
  const sync = () => radios.forEach(radio => {
    const panel = document.getElementById(radio.getAttribute('aria-controls'));
    panel.inert = !radio.checked;
    panel.setAttribute('aria-hidden', String(!radio.checked));
  });
  group.addEventListener('change', sync);
  sync();
});

const dialog = document.querySelector('#myModal');
const trigger = document.querySelector('#modalBtn');
if (dialog && trigger) {
  const video = dialog.querySelector('iframe');
  trigger.addEventListener('click', () => {
    video.src = video.dataset.src;
    dialog.showModal();
  });
  dialog.querySelector('.close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => video.removeAttribute('src'));
}

const marker = document.querySelector('#btn1');
const floating = document.querySelector('#btn2');
if (marker && floating) {
  const sync = () => {
    const show = marker.getBoundingClientRect().bottom < 0;
    floating.hidden = !show;
    floating.classList.toggle('visible', show);
  };
  window.addEventListener('scroll', sync, { passive: true });
  window.addEventListener('resize', sync);
  sync();
}

// Enable the demo button only after its local-only submission handler is attached.
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    form.querySelector('.archive-form-note').textContent = 'Demo only. No information was sent or stored.';
  });
  form.querySelector('button[type=submit]').disabled = false;
});
