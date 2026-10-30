// Published Microsoft Forms voting link; the embedded form is in index.html.
const VOTING_FORM_URL = 'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=2zH5WK9dC0Wxyvkqk8LWfrDFBeKJoU9MvE1GYf_4z_1UQjE5T1pITExOMDNBSzdFTDFJMDJDVE0wSi4u';

for (const link of document.querySelectorAll('.vote-link')) {
  link.href = VOTING_FORM_URL;
}

// Filters
const cards = [...document.querySelectorAll('.card')];
for (const filter of document.querySelectorAll('.filter')) {
  filter.addEventListener('click', () => {
    for (const button of document.querySelectorAll('.filter')) {
      const selected = button === filter;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-pressed', String(selected));
    }
    for (const card of cards) {
      card.hidden = filter.dataset.filter !== 'all' && card.dataset.category !== filter.dataset.filter;
    }
    const visibleCount = cards.filter(card => !card.hidden).length;
    document.querySelector('.results').textContent = `Showing ${visibleCount} ${visibleCount === 1 ? 'entry' : 'entries'}`;
    document.querySelector('#empty-state').hidden = visibleCount !== 0;
  });
}

// Enlarged entry dialog, with previous/next through the visible entries
const dialog = document.querySelector('#entry-dialog');
const dialogImage = document.querySelector('#dialog-image');
let lastTrigger;
let current;

function show(trigger) {
  current = trigger;
  document.querySelector('#dialog-title').textContent = trigger.dataset.title;
  document.querySelector('#dialog-description').textContent = trigger.dataset.description;
  dialogImage.src = trigger.dataset.image;
  dialogImage.alt = trigger.querySelector('img').alt;
  const many = visibleTriggers().length > 1;
  for (const step of document.querySelectorAll('.dialog-step')) step.hidden = !many;
}

function visibleTriggers() {
  return cards.filter(card => !card.hidden).map(card => card.querySelector('.image-button'));
}

function step(direction) {
  const list = visibleTriggers();
  if (list.length < 2) return;
  const index = list.indexOf(current);
  show(list[(index + direction + list.length) % list.length]);
}

for (const trigger of document.querySelectorAll('.image-button')) {
  trigger.addEventListener('click', () => {
    lastTrigger = trigger;
    show(trigger);
    dialog.showModal();
    document.body.classList.add('modal-open');
  });
}
for (const button of document.querySelectorAll('.dialog-step')) {
  button.addEventListener('click', () => step(Number(button.dataset.step)));
}
dialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight') step(1);
  if (event.key === 'ArrowLeft') step(-1);
});
document.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const box = dialog.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  // Return focus to the entry that is now showing, so keyboard users land where they left off.
  (current || lastTrigger)?.focus();
});

// Click the jack-o'-lantern for a hop
const scene = document.querySelector('.scene');
scene?.addEventListener('click', () => {
  scene.classList.remove('boo');
  void scene.getBoundingClientRect();
  scene.classList.add('boo');
});
scene?.addEventListener('animationend', event => {
  if (event.animationName === 'boo-hop') scene.classList.remove('boo');
});
