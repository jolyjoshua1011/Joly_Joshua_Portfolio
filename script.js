document.addEventListener("DOMContentLoaded", () => {

    // ================= HERO ANIMATION =================

    const heroText = document.querySelector(".hero-text");
    const heroImageContainer = document.querySelector(".hero-image");

    if (heroText && heroImageContainer) {

        heroText.style.opacity = "0";
        heroText.style.transform = "translateX(-50px)";

        heroImageContainer.style.opacity = "0";
        heroImageContainer.style.transform = "translateX(50px)";

        setTimeout(() => {
            heroText.style.transition = "1s ease";
            heroText.style.opacity = "1";
            heroText.style.transform = "translateX(0)";
        }, 200);

        setTimeout(() => {
            heroImageContainer.style.transition = "1s ease";
            heroImageContainer.style.opacity = "1";
            heroImageContainer.style.transform = "translateX(0)";
        }, 400);
    }

    // ================= PROJECT REVEAL =================

    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(50px)";
    });

    const revealCards = () => {

        projectCards.forEach(card => {

            const cardTop = card.getBoundingClientRect().top;
            const trigger = window.innerHeight - 100;

            if (cardTop < trigger) {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
                card.style.transition = "0.8s ease";
            }
        });
    };

    window.addEventListener("scroll", revealCards);
    revealCards();

    // ================= VIDEO MODAL (FIXED) =================

    const modal = document.getElementById("videoModal");
    const modalVideo = document.getElementById("modalVideo");
    const closeVideo = document.getElementById("closeVideo");

    projectCards.forEach(card => {

        card.addEventListener("click", (e) => {

            const videoSrc = card.getAttribute("data-video");

            // 👉 IMPORTANT : si pas de vidéo, on laisse comportement normal
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
        modalVideo.src = "";
    }

    if (closeVideo) {
        closeVideo.addEventListener("click", closeModal);
    }

    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
	
	

    // ================= HEADER EFFECT =================

    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {
            header.style.background = "rgba(0,0,0,0.95)";
            header.style.boxShadow = "0 5px 25px rgba(0,0,0,0.5)";
        } else {
            header.style.background = "rgba(0,0,0,0.8)";
            header.style.boxShadow = "none";
        }
    });

    // ================= HERO PARALLAX =================

    const heroImage = document.querySelector(".hero-image img");

    if (heroImage) {

        window.addEventListener("mousemove", (e) => {

            const x = (window.innerWidth / 2 - e.clientX) / 40;
            const y = (window.innerHeight / 2 - e.clientY) / 40;

            heroImage.style.transform = `translate(${x}px, ${y}px) scale(1.03)`;
        });
    }

    // ================= BUTTON EFFECT =================

    document.querySelectorAll(".btn").forEach(button => {

        button.addEventListener("mouseenter", () => {
            button.style.transform = "translateY(-4px)";
        });

        button.addEventListener("mouseleave", () => {
            button.style.transform = "translateY(0)";
        });
    });


    // ================= SKILLS =================

    const skillBars = document.querySelectorAll(".bar span");

    const skillsObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const bar = entry.target;
                const finalWidth = bar.style.width;

                bar.style.width = "0";

                setTimeout(() => {
                    bar.style.transition = "1.5s ease";
                    bar.style.width = finalWidth;
                }, 200);

                observer.unobserve(bar);
            }
        });

    }, { threshold: 0.3 });

    skillBars.forEach(bar => skillsObserver.observe(bar));

    // ================= ACTIVE MENU =================

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("nav a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 150;

            if (window.scrollY >= sectionTop) {
                current = section.id;
            }
        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }
        });
    });

});