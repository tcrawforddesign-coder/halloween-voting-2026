// Published Microsoft Forms voting link; the embedded form is in index.html.
const VOTING_FORM_URL = 'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=2zH5WK9dC0Wxyvkqk8LWfrDFBeKJoU9MvE1GYf_4z_1UQjE5T1pITExOMDNBSzdFTDFJMDJDVE0wSi4u';

for (const link of document.querySelectorAll('.vote-link')) {
  link.href = VOTING_FORM_URL;
}

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
    document.querySelector('.results').textContent = `Showing ${cards.filter(card => !card.hidden).length} entries`;
  });
}

const dialog = document.querySelector('#entry-dialog');
let lastTrigger;
for (const trigger of document.querySelectorAll('.image-button')) {
  trigger.addEventListener('click', () => {
    lastTrigger = trigger;
    document.querySelector('#dialog-title').textContent = trigger.dataset.title;
    document.querySelector('#dialog-description').textContent = trigger.dataset.description;
    const image = document.querySelector('#dialog-image');
    image.src = `assets/${trigger.dataset.image}.svg`;
    image.alt = trigger.querySelector('img').alt;
    dialog.showModal();
    document.body.classList.add('modal-open');
  });
}
document.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const box = dialog.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  lastTrigger?.focus();
});
