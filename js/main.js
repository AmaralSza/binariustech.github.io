// Renderização dinâmica do conteúdo
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("hero-title").innerHTML = siteContent.hero.title;
  document.getElementById("hero-subtitle").innerText =
    siteContent.hero.subtitle;
  const btnPrimary = document.getElementById("hero-btn-primary");
  btnPrimary.innerText = siteContent.hero.btnPrimaryText;
  btnPrimary.href = siteContent.hero.btnPrimaryLink;
  document.getElementById("hero-btn-secondary").innerText =
    siteContent.hero.btnSecondaryText;
  document.getElementById("nav-cta").href = siteContent.hero.btnPrimaryLink;

  // Serviços
  document.getElementById("services-container").innerHTML = siteContent.services
    .map(
      (s) => `
        <div class="service-card">
            <div class="service-icon"><i class="${s.icon}"></i></div>
            <h3>${s.title}</h3>
            <p>${s.desc}</p>
        </div>
    `,
    )
    .join("");

  // Sobre
  document.getElementById("about-title").innerText = siteContent.about.title;
  document.getElementById("about-desc").innerText =
    siteContent.about.description;
  document.getElementById("about-img-src").src = siteContent.about.image;
  document.getElementById("features-container").innerHTML =
    siteContent.about.features
      .map(
        (f) => `
        <div class="feature-item"><i class="fa-solid fa-circle-check"></i> ${f}</div>
    `,
      )
      .join("");

  // Redes Sociais
  document.getElementById("social-container").innerHTML = siteContent.socials
    .map(
      (soc) => `
        <a href="${soc.link}" target="_blank" title="${soc.name}"><i class="${soc.icon}"></i></a>
    `,
    )
    .join("");

  document.getElementById("copyright-text").innerHTML = siteContent.copyright;

  // Inicialização do Carrossel
  initCarousel();
});

// Lógica do Carrossel
let currentSlide = 0;
function initCarousel() {
  const slidesContainer = document.getElementById("carousel-slides");
  const dotsContainer = document.getElementById("carousel-dots");
  if (!slidesContainer || !siteContent.hero.images) return;

  slidesContainer.innerHTML = siteContent.hero.images
    .map((img) => `<img src="${img}" alt="Binarius Tech">`)
    .join("");
  dotsContainer.innerHTML = siteContent.hero.images
    .map(
      (_, index) =>
        `<div class="dot ${index === 0 ? "active" : ""}" onclick="currentSlideIndex(${index})"></div>`,
    )
    .join("");

  // Troca automática a cada 4 segundos
  setInterval(() => {
    currentSlide++;
    updateCarousel();
  }, 4000);
}

function updateCarousel() {
  const slides = document.querySelectorAll(".carousel-slides img");
  const dots = document.querySelectorAll(".dot");
  if (slides.length === 0) return;

  if (currentSlide >= slides.length) currentSlide = 0;
  if (currentSlide < 0) currentSlide = slides.length - 1;

  document.getElementById("carousel-slides").style.transform =
    `translateX(-${currentSlide * 100}%)`;

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

function moveSlide(direction) {
  currentSlide += direction;
  updateCarousel();
}

function currentSlideIndex(index) {
  currentSlide = index;
  updateCarousel();
}
