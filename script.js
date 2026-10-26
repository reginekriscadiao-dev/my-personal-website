const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!open));
  nav.classList.toggle("open", !open);
});
navLinks.forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

// Reveal elements when they enter the viewport.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => revealObserver.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("is-visible"));
}

// Update active navigation based on the visible section.
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.toggle(
          "active", link.getAttribute("href") === `#${entry.target.id}`
        ));
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  document.querySelectorAll("main section[id]").forEach(section => sectionObserver.observe(section));
}

// Certificate click-to-zoom preview.
const modal = document.querySelector(".image-modal");
const modalImage = modal.querySelector("img");
const closeModal = modal.querySelector(".modal-close");
document.querySelectorAll(".certificate-image").forEach(button => {
  button.addEventListener("click", () => {
    const image = button.querySelector("img");
    modalImage.src = image.src;
    modalImage.alt = image.alt;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    closeModal.focus();
  });
});
function hideModal() {
  modal.hidden = true;
  modalImage.src = "";
  document.body.style.overflow = "";
}
closeModal.addEventListener("click", hideModal);
modal.addEventListener("click", event => { if (event.target === modal) hideModal(); });
document.addEventListener("keydown", event => { if (event.key === "Escape" && !modal.hidden) hideModal(); });

document.getElementById("year").textContent = new Date().getFullYear();
