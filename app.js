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

document.getElementById('openPrivacy').addEventListener('click', () => {
    openModal('privacy.html');
});
document.getElementById('openTOS').addEventListener('click', () => {
    openModal('terms.html');
});
document.getElementById('closeModal').addEventListener('click', closeModal);

function openModal(file) {
    fetch(file)
        .then(res => res.text())
        .then(html => {
            document.getElementById('modalContent').innerHTML = html;
            document.getElementById('modalOverlay').style.display = 'flex';
            document.getElementById('modalContainer').scrollTop = 0;
        })
        .catch(err => {
            document.getElementById('modalContent').innerHTML = 'Error loading content.';
            console.error(err);
        });
}

function closeModal() {
    document.getElementById('modalOverlay').style.display = 'none';
    document.getElementById('modalContent').innerHTML = '';
}
window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash;
    if (hash === '#privacy') {
        openModal('privacy.html');
    } else if (hash === '#tos') {
        openModal('tos.html');
    }
});

