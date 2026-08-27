const pageKey = location.pathname.replace(/^\/+|\/+$/g, '') || 'home';
const page = window.HUA_PAGES[pageKey];

const navigation = `
  <a href="/">Home</a>
  <div class="nav-group"><button class="nav-trigger" aria-expanded="false">About Us <span>⌄</span></button><div class="nav-menu">
    <a href="/executiveofficers/">Executive Officers</a><a href="/executive-team/">Executive Team</a><a href="/join/">Join the HUA</a><a href="/calendar/">Calendar</a><a href="/governing-docs/">Governing Documents</a><a href="/hua-semesterly-grant-opening/">Semesterly Grants</a>
  </div></div>
  <a href="/election-guidelines/">Election Guidelines</a><a href="/newsroom/">Newsroom</a><a href="/teams-and-contacts/">Teams and Contacts</a>
  <div class="nav-group"><button class="nav-trigger" aria-expanded="false">Resources <span>⌄</span></button><div class="nav-menu">
    <a href="/crimson-career-closet/">Crimson Career Closet</a><a href="/harvard-guides/">Harvard Guides</a><a href="/hua-logos/">HUA Logos</a>
  </div></div>
  <a href="/finances/">Finances</a>
  <div class="nav-group"><button class="nav-trigger" aria-expanded="false">Club Funding <span>⌄</span></button><div class="nav-menu">
    <a href="/funding/">Funding Sources</a><a href="/club-funding/pubbing/">HUA Club Pubbing</a><a href="/club-funding/grant-information/">Grant Information</a><a href="/club-funding/grant-application/">Grant Application</a><a href="/club-funding/receipts/">Receipts</a>
  </div></div><a href="/donations/">Alumni Donations</a>`;

function renderCards(cards = []) {
  return `<div class="info-grid">${cards.map(card => `<article class="info-card">
    ${card.eyebrow ? `<p class="card-eyebrow">${card.eyebrow}</p>` : ''}<h3>${card.title}</h3>
    ${card.text ? `<p>${card.text}</p>` : ''}${card.meta ? `<a class="contact-link" href="mailto:${card.meta}">${card.meta}</a>` : ''}
    ${card.link ? `<a class="arrow-link" href="${card.link}">${card.label || 'Learn more'} <span>→</span></a>` : ''}
  </article>`).join('')}</div>`;
}

function renderSection(section, index) {
  const body = [
    section.text ? `<p class="section-lead">${section.text}</p>` : '',
    section.cards ? renderCards(section.cards) : '',
    section.list ? `<ol class="check-list">${section.list.map(item => `<li>${item}</li>`).join('')}</ol>` : '',
    section.stats ? `<div class="stats">${section.stats.map(([value, label]) => `<div><strong>${value}</strong><span>${label}</span></div>`).join('')}</div>` : '',
    section.logos ? `<div class="logo-grid">${section.logos.map((label, i) => `<div class="logo-tile logo-${i + 1}"><img src="/assets/hua-logo.webp" alt="HUA ${label} logo"><span>${label}</span></div>`).join('')}</div>` : '',
    section.cta ? `<a class="pill-button" href="${section.cta.href}">${section.cta.label}</a>` : ''
  ].join('');
  return `<section class="content-section ${index % 2 ? 'section-tint' : ''}"><div class="sub-wrap"><div class="section-number">${String(index + 1).padStart(2, '0')}</div><div class="section-body"><h2>${section.title}</h2>${body}</div></div></section>`;
}

if (!page) {
  document.title = 'Page not found — Harvard Undergraduate Association';
  document.querySelector('#app').innerHTML = `<main class="not-found"><p class="section-kicker red">404</p><h1>We couldn’t find that page.</h1><a class="pill-button" href="/">Return home</a></main>`;
} else {
  document.title = `${page.title} — Harvard Undergraduate Association`;
  document.querySelector('#app').innerHTML = `
    <header class="site-header compact-header"><a class="brand" href="/" aria-label="Harvard Undergraduate Association home"><img src="/assets/hua-logo.webp" alt="Harvard Undergraduate Association"></a>
      <button class="menu-toggle" aria-controls="site-nav" aria-expanded="false">Menu</button><nav id="site-nav" class="site-nav" aria-label="Primary navigation">${navigation}</nav>
    </header>
    <main id="main">
      <section class="sub-hero" style="--hero-image:url('${page.image}')"><div class="sub-hero-shade"></div><div class="sub-wrap sub-hero-inner"><p class="section-kicker">${page.kicker}</p><h1>${page.title}</h1><p>${page.intro}</p></div></section>
      ${page.sections.map(renderSection).join('')}
      <section class="page-cta"><div class="sub-wrap"><p class="section-kicker">Still looking?</p><h2>Find the right HUA team.</h2><a href="/teams-and-contacts/">Browse teams and contacts <span>→</span></a></div></section>
    </main>
    <footer class="site-footer"><div class="wrap footer-grid"><img src="/assets/hua-logo.webp" alt="HUA"><div><strong>Harvard Undergraduate Association</strong><p>56 Linnean Street<br>Cambridge, MA 02138</p></div><div><strong>Follow</strong><p><a href="https://www.instagram.com/theharvardua/">Instagram</a><br><a href="https://www.linkedin.com/company/thehua/">LinkedIn</a></p></div><a class="back-top" href="#main" aria-label="Back to top">↑</a></div></footer>`;
}

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
menuToggle?.addEventListener('click', () => { const open = nav.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', String(open)); });
document.querySelectorAll('.nav-trigger').forEach(trigger => trigger.addEventListener('click', () => { const group = trigger.closest('.nav-group'); const open = group.classList.toggle('open'); trigger.setAttribute('aria-expanded', String(open)); }));
document.addEventListener('click', event => { if (!event.target.closest('.nav-group')) document.querySelectorAll('.nav-group.open').forEach(group => { group.classList.remove('open'); group.querySelector('.nav-trigger').setAttribute('aria-expanded', 'false'); }); });
