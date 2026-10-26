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
if ("IntersectionObserver" in window && !document.body.classList.contains("contact-page")) {
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
if (modal) {
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

}

document.getElementById("year").textContent = new Date().getFullYear();

// A thin reading indicator updates at most once per animation frame.
const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
const progressBar = document.createElement("div");
progressBar.className = "scroll-progress";
progressBar.setAttribute("aria-hidden", "true");
document.body.append(progressBar);
let progressPending = false;
function updateProgress() {
  const range = document.documentElement.scrollHeight - window.innerHeight;
  const progress = range > 0 ? Math.min(1, Math.max(0, window.scrollY / range)) : 0;
  progressBar.style.transform = `scaleX(${progress})`;
  progressPending = false;
}
function scheduleProgress() {
  if (progressPending) return;
  progressPending = true;
  requestAnimationFrame(updateProgress);
}
window.addEventListener("scroll", scheduleProgress, { passive: true });
window.addEventListener("resize", scheduleProgress);
window.addEventListener("load", scheduleProgress);
updateProgress();

// Stagger neighboring cards without slowing down long sections.
document.querySelectorAll(".about-grid, .certificate-grid, .contact-grid").forEach(group => {
  Array.from(group.children).forEach((item, index) => {
    item.style.setProperty("--reveal-delay", `${Math.min(index, 3) * 100}ms`);
  });
});

// Count each statistic once when it first becomes visible.
const counterFrames = new Map();
const counterLabels = new Map();
function finishCounters() {
  counterFrames.forEach(frame => cancelAnimationFrame(frame));
  counterFrames.clear();
  counterLabels.forEach((label, element) => { element.textContent = label; });
}
if ("IntersectionObserver" in window) {
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      counterObserver.unobserve(entry.target);
      if (motionPreference.matches) return;
      const label = entry.target.textContent.trim();
      const match = label.match(/^(\d+)(\+?)$/);
      if (!match || Number(match[1]) === 0) return;
      const total = Number(match[1]);
      const started = performance.now();
      counterLabels.set(entry.target, label);
      // Keep the original statistic available to assistive technology.
      entry.target.setAttribute("aria-label", label);
      function tick(now) {
        const fraction = Math.min(1, (now - started) / 900);
        entry.target.textContent = `${Math.round(total * (1 - (1 - fraction) ** 3))}${match[2]}`;
        if (fraction < 1) counterFrames.set(entry.target, requestAnimationFrame(tick));
        else counterFrames.delete(entry.target);
      }
      counterFrames.set(entry.target, requestAnimationFrame(tick));
    });
  }, { threshold: 0.6 });
  document.querySelectorAll(".stats strong").forEach(stat => counterObserver.observe(stat));
}
motionPreference.addEventListener("change", () => {
  if (motionPreference.matches) finishCounters();
});

// Follow the pointer with a soft highlight on project previews.
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
document.querySelectorAll(".work-image").forEach(image => {
  image.addEventListener("pointermove", event => {
    if (!finePointer.matches || motionPreference.matches) return;
    const bounds = image.getBoundingClientRect();
    image.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
    image.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
  });
});
