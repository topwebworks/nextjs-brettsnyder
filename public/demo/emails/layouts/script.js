const approach = document.querySelector('#approach');
const width = document.querySelector('#width');
const frame = document.querySelector('#email');
const stage = document.querySelector('.stage');
const statusOutput = document.querySelector('#state');
const openLink = document.querySelector('#open');

function readWidth() {
  statusOutput.textContent = `${approach.selectedOptions[0].textContent} · ${Math.round(frame.getBoundingClientRect().width)} px viewport`;
}

approach.addEventListener('change', () => {
  const url = `variants/${approach.value}.html`;
  frame.src = url;
  frame.title = `${approach.selectedOptions[0].textContent} email example`;
  openLink.href = url;
  readWidth();
});
width.addEventListener('change', () => {
  stage.dataset.width = width.value;
});
new ResizeObserver(readWidth).observe(frame);
readWidth();
