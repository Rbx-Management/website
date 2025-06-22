document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('fade-in');
});


document.addEventListener('DOMContentLoaded', () => {
    const modalOverlay = document.getElementById('modalOverlay');
    const modalContent = document.getElementById('modalContent');
    const closeModalBtn = document.getElementById('closeModal');

    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#7efefe" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5 },
            "size": { "value": 3 },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#7efefe",
                "opacity": 0.4,
                "width": 1
            },
            "move": { "enable": true, "speed": 2 }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": { "enable": true, "mode": "repulse" },
                "onclick": { "enable": true, "mode": "push" }
            },
            "modes": {
                "repulse": { "distance": 100 },
                "push": { "particles_nb": 4 }
            }
        },
        "retina_detect": true
    });

    function openModal(file) {
        modalOverlay.classList.add('show');
        modalContent.innerHTML = 'Loading...';

        fetch(file)
            .then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.text();
            })
            .then(html => {
                modalContent.innerHTML = html;
                modalContent.scrollTop = 0;
            })
            .catch(() => {
                modalContent.innerHTML = '<p>Error loading content.</p>';
            });
    }

    function closeModal() {
        modalOverlay.classList.remove('show');
        setTimeout(() => {
            modalContent.innerHTML = '';
            history.replaceState(null, '', ' ');
        }, 300);
    }

    closeModalBtn.addEventListener('click', closeModal);

    document.getElementById('openPrivacy').addEventListener('click', e => {
        e.preventDefault();
        openModal('modals/privacy.html');
        history.pushState(null, '', '#privacy');
    });

    document.getElementById('openTOS').addEventListener('click', e => {
        e.preventDefault();
        openModal('modals/terms.html');
        history.pushState(null, '', '#tos');
    });

    if (window.location.hash === '#privacy') {
        openModal('modals/privacy.html');
    } else if (window.location.hash === '#tos') {
        openModal('modals/terms.html');
    }

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('show')) {
            closeModal();
        }
    });
});

const premiumBtn = document.querySelector('.btn.premium');
const premiumCanvas = document.getElementById('premiumParticles');
const ctx = premiumCanvas.getContext('2d');

let premiumParticles = [];
let emissionInterval = null;

function resizePremiumCanvas() {
    premiumCanvas.width = window.innerWidth;
    premiumCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizePremiumCanvas);
resizePremiumCanvas();

function createPremiumParticle(x, y) {
    const fireColors = [
        'rgba(255, 215, 0, 0.7)',
        'rgba(255, 140, 0, 0.7)',
        'rgba(255, 69, 0, 0.7)',
        'rgba(255, 100, 0, 0.7)'
    ];
    const color = fireColors[Math.floor(Math.random() * fireColors.length)];

    const speed = Math.random() * 1 + 0.3;
    const radius = Math.random() * 1.5 + 0.5;

    premiumParticles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -speed,
        radius,
        alpha: 1,
        color
    });
}

function updatePremiumParticles() {
    ctx.clearRect(0, 0, premiumCanvas.width, premiumCanvas.height);
    premiumParticles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.015;
        if (p.alpha <= 0) {
            premiumParticles.splice(i, 1);
        } else {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color.replace('0.7', p.alpha.toFixed(2));
            ctx.fill();
        }
    });
    requestAnimationFrame(updatePremiumParticles);
}
updatePremiumParticles();

function emitFromBehindPremiumBtn() {
    const rect = premiumBtn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const baseY = rect.top + rect.height - 20;
    for (let i = 0; i < 1; i++) {
        createPremiumParticle(centerX + (Math.random() - 0.5) * rect.width * 0.5, baseY);
    }
}

function startPremiumEmitter() {
    if (!emissionInterval) {
        emissionInterval = setInterval(emitFromBehindPremiumBtn, 100); // slower emission
    }
}

function stopPremiumEmitter() {
    clearInterval(emissionInterval);
    emissionInterval = null;
}

premiumBtn.addEventListener('mouseenter', startPremiumEmitter);
premiumBtn.addEventListener('mouseleave', stopPremiumEmitter);

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        stopPremiumEmitter();
    } else if (premiumBtn.matches(':hover')) {
        startPremiumEmitter();
    }
});


document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (
        href &&
        !href.startsWith('#') &&
        !href.startsWith('mailto:') &&
        !link.hasAttribute('target')
    ) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = this.href;
            }, 400); // match transition duration
        });
    }
});




