document.addEventListener("DOMContentLoaded", () => {

    // ================= VIDEO MODAL =================

    const modal = document.getElementById("videoModal");
    const modalVideo = document.getElementById("modalVideo");
    const closeVideo = document.getElementById("closeVideo");

    document.querySelectorAll(".project-card").forEach(card => {

        card.addEventListener("click", (e) => {

            const videoSrc = card.dataset.video;

            if (!videoSrc) return;

            e.preventDefault();

            modalVideo.src = videoSrc;
            modal.classList.add("active");
            modalVideo.play();
        });

    });

    function closeModal() {

        modal.classList.remove("active");

        modalVideo.pause();
        modalVideo.removeAttribute("src");
        modalVideo.load();
    }

    closeVideo?.addEventListener("click", closeModal);

    modal?.addEventListener("click", (e) => {

        if (e.target === modal) {
            closeModal();
        }

    });

    // ================= PROJECTS REVEAL =================

    const projectCards = document.querySelectorAll(".project-card");

    const projectObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

            observer.unobserve(entry.target);

        });

    }, {
        threshold: 0.15
    });

    projectCards.forEach(card => {

        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.transition = "0.6s ease";

        projectObserver.observe(card);

    });

    // ================= SKILLS =================

    const skillBars = document.querySelectorAll(".bar span");

    const skillsObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const bar = entry.target;
            const width = bar.style.width;

            bar.style.width = "0";

            requestAnimationFrame(() => {

                bar.style.transition = "1.2s ease";
                bar.style.width = width;

            });

            observer.unobserve(bar);

        });

    }, {
        threshold: 0.3
    });

    skillBars.forEach(bar => skillsObserver.observe(bar));

    // ================= MENU ACTIF =================

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("nav a");

    const sectionObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const currentId = entry.target.id;

            navLinks.forEach(link => {

                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === `#${currentId}`
                );

            });

        });

    }, {
        threshold: 0.5
    });

    sections.forEach(section => sectionObserver.observe(section));

});