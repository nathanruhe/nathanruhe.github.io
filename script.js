/* --------- MENU --------- */
const navMenu = document.querySelector("#nav-menu");
navToggle = document.querySelector("#nav-toggle");
navClose = document.querySelector("#nav-close");

/* Menu show */
/* Validate if constant exists */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/* Menu hidden */
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/* --------- REMOVE MENU MOBILE --------- */
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.querySelector("#nav-menu");

  // when we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
}

navLink.forEach((n) => n.addEventListener("click", linkAction));

/* --------- CHANGE THEME --------- */
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const vercelLogo = document.querySelector(".vercel");
const homeSection = document.querySelector(".home");
const imgContact = document.querySelector(".contact__img");

// Verifica el tema inicial en el almacenamiento local
let isDark = localStorage.getItem("theme") === "dark";

// Establece el tema inicial
if (isDark) {
  document.body.classList.add("dark-theme");
  themeIcon.textContent = "🌙";
  vercelLogo.src = "assets/iconos/vercel-white.png";
  imgContact.src = "assets/perfil/contact-black.png";
  homeSection.style.backgroundImage = "url('assets/imagenes/oficina.png')";
} else {
  document.body.classList.add("light-theme");
  themeIcon.textContent = "☀️";
  vercelLogo.src = "assets/iconos/vercel-black.png";
  imgContact.src = "assets/perfil/contact-white.png";
  homeSection.style.backgroundImage = "url('assets/imagenes/oficina2.png')";
}

// Función para cambiar la imagen con una duración determinada
const changeImageWithTransition = (imgElement, newSrc) => {
  imgElement.style.opacity = "0"; // Desvanece la imagen
  setTimeout(() => {
    imgElement.src = newSrc; // Cambia el src de la imagen
    imgElement.style.opacity = "1"; // Vuelve a mostrar la imagen
  }, 200); // Espera unos milisegundos antes de cambiar la imagen
};

// Alterna el tema al hacer clic en el botón
themeToggle.addEventListener("click", () => {
  isDark = !isDark;

  if (isDark) {
    document.body.classList.remove("light-theme");
    document.body.classList.add("dark-theme");
    themeIcon.textContent = "🌙";
    localStorage.setItem("theme", "dark");

    // Cambia la imagen a la versión de tema oscuro con transición
    changeImageWithTransition(imgContact, "assets/perfil/contact-black.png");
    // Cambia la imagen a la versión de tema oscuro
    vercelLogo.src = "assets/iconos/vercel-white.png";
    // imgContact.src = "assets/PERFIL/2-black.png"
    homeSection.style.backgroundImage = "url('assets/imagenes/oficina.png')";

  } else {
    document.body.classList.remove("dark-theme");
    document.body.classList.add("light-theme");
    themeIcon.textContent = "☀️";
    localStorage.setItem("theme", "light");

    // Cambia la imagen a la versión de tema claro con transición
    changeImageWithTransition(imgContact, "assets/perfil/contact-white.png");
    // Cambia la imagen a la versión de tema claro
    vercelLogo.src = "assets/iconos/vercel-black.png";
    // imgContact.src = "assets/PERFIL/1-white.png"
    homeSection.style.backgroundImage = "url('assets/imagenes/oficina2.png')";
  }
});

/* --------- CHANGE BACKGROUND HEADER --------- */
function scrollHeader() {
  const header = document.querySelector("#header");

  // when the scroll is greater than 80 viewport height, add the scroll-header class to header tag
  if (this.scrollY >= 80) header.classList.add("scroll-header");
  else header.classList.remove("scroll-header");
}

window.addEventListener("scroll", scrollHeader);

/* --------- SHOW SCROLL UP --------- */
function scrollUp() {
  const scrollUp = document.querySelector("#scroll-up");

  // when the scroll is greater than 350 viewport height, add the show-scroll class to scroll-top class
  if (this.scrollY >= 350) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}

window.addEventListener("scroll", scrollUp);

/* --------- HOME --------- */
const typed = new Typed(".multiple-text", {
  strings: [
    "Full Stack",
    "Learning Design UX/UI",
    "Frontend Enthusiast",
    "Currently Freelancer",
  ],
  typeSpeed: 100,
  backSpeed: 50,
  backDelay: 500,
  loop: true,
  showCursor: false,
  cursorChar: "|", // Carácter del cursor
});

/* --------- ABOUT TABS --------- */
const tabs = document.querySelectorAll("[data-target]"),
  tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("tab__active");
    });

    target.classList.add("tab__active");

    tabs.forEach((tab) => {
      tab.classList.remove("tab__active");
    });

    tab.classList.add("tab__active");
  });
});

/* --------- CONTACT FORM --------- */
const contactForm = document.querySelector("#contact-form");
contactName = document.querySelector("#contact-name");
contactEmail = document.querySelector("#contact-email");
contactSubject = document.querySelector("#contact-subject");
contactMessage = document.querySelector("#contact-message");
errorMessage = document.querySelector("#error-message");

const sendEmail = (e) => {
  e.preventDefault();

  // check if the field has a value
  if (
    contactName.value === "" ||
    contactEmail.value === "" ||
    contactSubject.value === "" ||
    contactMessage.value === ""
  ) {
    // show message
    errorMessage.classList.add("color-first");
    errorMessage.textContent = "* Todos los campos son obligatorios";
  } else {
    // serviceID - templateID - #form - publickey
    emailjs
      .sendForm(
        "service_rnmrfab",
        "template_j99d1f9",
        "#contact-form",
        "9KjG4NOUX0PIE7q-p"
      )
      .then(
        () => {
          // show message and add color, window + dot to open emoji
          errorMessage.classList.add("color-first");
          errorMessage.textContent = "Mensaje enviado ✓";

          // remove message after 5 seconds
          setTimeout(() => {
            errorMessage.textContent = "";
          }, 5000);
        },
        (error) => {
          alert("OOPs! SOMETHING WENT WRONG...", error);
        }
      );

    // clean input fields
    contactName.value = "";
    contactEmail.value = "";
    contactSubject.value = "";
    contactMessage.value = "";
  }
};

contactForm.addEventListener("submit", sendEmail);
