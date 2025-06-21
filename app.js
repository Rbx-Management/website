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

document.addEventListener('DOMContentLoaded', () => {
    const modalOverlay = document.getElementById('modalOverlay');
    const modalContent = document.getElementById('modalContent');
    const closeModalBtn = document.getElementById('closeModal');

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
        openModal('privacy.html');
        history.pushState(null, '', '#privacy');
    });

    document.getElementById('openTOS').addEventListener('click', e => {
        e.preventDefault();
        openModal('terms.html');
        history.pushState(null, '', '#tos');
    });

    if (window.location.hash === '#privacy') {
        openModal('privacy.html');
    } else if (window.location.hash === '#tos') {
        openModal('terms.html');
    }

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('show')) {
            closeModal();
        }
    });
});
