const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.main-nav');
const reader = document.querySelector('.reader');

menuButton?.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('[data-reader-open]').forEach((button) => {
  button.addEventListener('click', () => reader?.showModal());
});

document.querySelectorAll('[data-reader-close]').forEach((button) => {
  button.addEventListener('click', () => reader?.close());
});

reader?.addEventListener('click', (event) => {
  if (event.target === reader) reader.close();
});

const observer = new IntersectionObserver(
  (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('visible')),
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
document.querySelector('#year').textContent = new Date().getFullYear();

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.main-nav a')];

window.addEventListener('scroll', () => {
  const current = sections.findLast((section) => section.offsetTop <= window.scrollY + 180);
  if (!current) return;
  navLinks.forEach((link) => link.classList.toggle('active', link.hash === `#${current.id}`));
}, { passive: true });
