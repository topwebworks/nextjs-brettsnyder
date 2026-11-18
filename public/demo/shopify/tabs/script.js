const root = document.querySelector('main');
const tabs = [...document.querySelectorAll('[role=tab]')];
const layout = document.querySelector('#layout');
const icons = document.querySelector('#icons');
function updateStatus() { document.querySelector('#state').textContent = [layout.options[layout.selectedIndex].text, icons.checked ? 'Icon tabs' : 'Text tabs', tabs.find(t => t.getAttribute('aria-selected') === 'true').textContent.trim()].join(' · '); }
function activate(tab, focus = false) { for (const item of tabs) {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
} root.dataset.activeSubject = tab.dataset.subject; if (focus) {
    tab.focus();
    tab.scrollIntoView({ block: 'nearest', inline: 'nearest' });
} updateStatus(); }
for (const tab of tabs) {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', event => { const vertical = layout.value === 'vertical' && innerWidth > 640; const next = vertical ? 'ArrowDown' : 'ArrowRight', previous = vertical ? 'ArrowUp' : 'ArrowLeft'; let index = tabs.indexOf(tab); if (event.key === next)
        index = (index + 1) % tabs.length;
    else if (event.key === previous)
        index = (index + tabs.length - 1) % tabs.length;
    else if (event.key === 'Home')
        index = 0;
    else if (event.key === 'End')
        index = tabs.length - 1;
    else
        return; event.preventDefault(); activate(tabs[index], true); });
}
function arrange() { root.dataset.layout = layout.value; root.dataset.icons = String(icons.checked); document.querySelector('[role=tablist]').setAttribute('aria-orientation', layout.value === 'vertical' && innerWidth > 640 ? 'vertical' : 'horizontal'); updateStatus(); }
layout.addEventListener('change', arrange);
icons.addEventListener('change', arrange);
matchMedia('(max-width:640px)').addEventListener('change', arrange);
arrange();
