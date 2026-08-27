const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav-trigger').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const group = trigger.closest('.nav-group');
    const open = group.classList.toggle('open');
    trigger.setAttribute('aria-expanded', String(open));
  });
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.nav-group')) {
    document.querySelectorAll('.nav-group.open').forEach((group) => {
      group.classList.remove('open');
      group.querySelector('.nav-trigger').setAttribute('aria-expanded', 'false');
    });
  }
});

const track = document.querySelector('.post-track');
document.querySelector('.carousel-button.next').addEventListener('click', () => {
  track.scrollBy({ left: track.clientWidth * 0.72, behavior: 'smooth' });
});
document.querySelector('.carousel-button.previous').addEventListener('click', () => {
  track.scrollBy({ left: -track.clientWidth * 0.72, behavior: 'smooth' });
});
