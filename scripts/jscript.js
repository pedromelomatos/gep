const infosVideos = [
    { src: "imagens/video1.mp4", label: "Ambiente de Estudos" },
    { src: "imagens/video2.mp4", label: "Ambiente de Trabalho" },
];

const FOCUSABLE =
    'a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex^="-"])';

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.getElementById("menu-principal");
const navLinks = document.querySelectorAll(".nav-link");
const fadeElements = document.querySelectorAll(".fadeIn");
const topBtn = document.getElementById("topBtn");
const carousel = document.querySelector(".carrosselVideos");
const nextBtn = document.querySelector(".btnProx");
const prevBtn = document.querySelector(".btnAnt");
const slides = [];
let currentSlide = 0;

if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
        const isOpen = navToggle.getAttribute("aria-expanded") === "true";
        navToggle.setAttribute("aria-expanded", String(!isOpen));
        navMenu.classList.toggle("is-open", !isOpen);
        document.body.classList.toggle("nav-open", !isOpen);
    });
}

for (const link of navLinks) {
    link.addEventListener("click", function (event) {
        const href = this.getAttribute("href") || "";

        if (href.startsWith("#")) {
            event.preventDefault();
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: "smooth" });
        }

        if (navToggle && navMenu) {
            navToggle.setAttribute("aria-expanded", "false");
            navMenu.classList.remove("is-open");
            document.body.classList.remove("nav-open");
        }
    });
}

window.addEventListener("scroll", () => {
    if (topBtn) topBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

if (topBtn) {
    topBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) entry.target.classList.add("visible");
        }
    });

    for (const element of fadeElements) observer.observe(element);
} else {
    for (const element of fadeElements) element.classList.add("visible");
}

function loadCarousel() {
    if (!carousel) return;

    for (let i = 0; i < infosVideos.length; i++) {
        const info = infosVideos[i];
        const slide = document.createElement("div");
        slide.classList.add("slide");
        if (i === 0) slide.classList.add("ativo");

        const video = document.createElement("video");
        video.setAttribute("src", info.src);
        video.muted = true;
        video.loop = true;
        video.autoplay = true;
        video.playsInline = true;
        video.setAttribute("muted", "");
        video.setAttribute("autoplay", "");
        video.setAttribute("loop", "");
        video.setAttribute("playsinline", "");
        video.setAttribute("preload", "auto");

        if (i === 0) {
            video.addEventListener("canplay", () => video.play().catch(() => {}), { once: true });
        }

        const caption = document.createElement("p");
        caption.innerText = info.label;

        slide.appendChild(video);
        slide.appendChild(caption);
        carousel.appendChild(slide);
        slides.push(slide);
    }
}

function showSlide(index) {
    for (let i = 0; i < slides.length; i++) {
        const slide = slides[i];
        const video = slide.querySelector("video");
        if (video) video.pause();

        slide.classList.toggle("ativo", i === index);
        slide.style.zIndex = i === index ? 1 : 0;
        slide.style.opacity = i === index ? 1 : 0;

        if (i === index && video) {
            video.currentTime = 0;
            video.play().catch(() => {});
        }
    }
}

if (carousel && nextBtn && prevBtn) {
    loadCarousel();
    nextBtn.addEventListener("click", () => {
        currentSlide = (currentSlide + 1) % infosVideos.length;
        showSlide(currentSlide);
    });
    prevBtn.addEventListener("click", () => {
        currentSlide = (currentSlide - 1 + infosVideos.length) % infosVideos.length;
        showSlide(currentSlide);
    });
}

function openModal(modalId, openerBtn) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.dataset.opener = openerBtn ? openerBtn.id || "" : "";
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.documentElement.classList.add("modal-open");
    document.body.classList.add("modal-open");

    const focusable = Array.from(modal.querySelectorAll(FOCUSABLE));
    if (focusable[0]) focusable[0].focus();
    modal.addEventListener("keydown", trapTabKey);
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.documentElement.classList.remove("modal-open");
    document.body.classList.remove("modal-open");
    modal.removeEventListener("keydown", trapTabKey);

    const openerId = modal.dataset.opener;
    if (openerId) {
        const opener = document.getElementById(openerId);
        if (opener) opener.focus();
    }
}

function trapTabKey(event) {
    if (event.key !== "Tab") return;

    const modal = event.currentTarget;
    const focusable = Array.from(modal.querySelectorAll(FOCUSABLE));
    if (focusable.length === 0) {
        event.preventDefault();
        return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
    }
}

window.openModal = function (id, button) {
    if (button && !button.id) {
        button.id = "opener-" + Math.random().toString(36).slice(2, 9);
    }
    openModal(id, button);
};

window.closeModal = closeModal;

document.addEventListener("click", (event) => {
    if (event.target.getAttribute("data-action") === "close") {
        const modal = event.target.closest(".modal");
        if (modal) closeModal(modal.id);
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" || event.key === "Esc") {
        const openModalElement = document.querySelector(".modal.open");
        if (openModalElement) closeModal(openModalElement.id);
    }
});