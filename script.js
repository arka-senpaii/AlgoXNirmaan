
/* Updated script.js for line of control section and enhancements */

/* Updated music player controls for nav audio to loop and mute/unmute toggle */

const navAudio = document.getElementById('nav-audio');
const playPauseBtn = document.getElementById('play-pause-btn');

// Ensure audio loops continuously
navAudio.loop = true;

// Set audio volume to 70%
navAudio.volume = 0.7;

window.addEventListener('load', () => {
    // Try to play audio, handle autoplay restrictions
    function tryPlayAudio() {
        navAudio.play().catch(() => {
            // Autoplay might be blocked, so mute and play
            navAudio.muted = true;
            navAudio.play().catch(() => {
                // Still failed, do nothing
            });
            playPauseBtn.textContent = '🔇'; // Muted icon
        });
    }
    tryPlayAudio();

    // Delay hiding loading page by 2 seconds after load
    const loadingPage = document.getElementById('loading-page');
    if (loadingPage) {
        setTimeout(() => {
            loadingPage.style.display = 'none';
        }, 2000);
    }

    // Retry playing audio on user interaction if muted
    document.body.addEventListener('click', () => {
        if (navAudio.muted) {
            navAudio.muted = false;
            tryPlayAudio();
            playPauseBtn.textContent = '🔊'; // Unmuted icon
        }
    }, { once: true });
});

// Additional fix: add event listener to unmute on user interaction for autoplay policies
document.body.addEventListener('click', () => {
    if (navAudio.muted) {
        navAudio.muted = false;
        navAudio.play();
        playPauseBtn.textContent = '🔊'; // Unmuted icon
    }
}, { once: true });

// Initialize button text as unmuted state
playPauseBtn.textContent = '🔊';

playPauseBtn.addEventListener('click', () => {
    if (navAudio.muted) {
        // Fade in audio
        fadeAudio(navAudio, 0, 0.7, 500);
        navAudio.muted = false;
        playPauseBtn.textContent = '🔊'; // Unmuted icon
    } else {
        // Fade out audio
        fadeAudio(navAudio, navAudio.volume, 0, 500, () => {
            navAudio.muted = true;
        });
        playPauseBtn.textContent = '🔇'; // Muted icon
    }
});

// Helper function to fade audio volume
function fadeAudio(audio, fromVolume, toVolume, duration, callback) {
    const stepTime = 50;
    const steps = duration / stepTime;
    const volumeStep = (toVolume - fromVolume) / steps;
    let currentStep = 0;
    audio.volume = fromVolume;

    const fadeInterval = setInterval(() => {
        currentStep++;
        let newVolume = audio.volume + volumeStep;
        newVolume = Math.min(Math.max(newVolume, 0), 1);
        audio.volume = newVolume;

        if (currentStep >= steps) {
            clearInterval(fadeInterval);
            if (callback) callback();
        }
    }, stepTime);
}


document.addEventListener('DOMContentLoaded', function() {
    initParticles();
    initThreeJS();
    initAnimations();
    initEventListeners();
    initCountdown();
    initOrganizer();

    // Mobile navigation toggle functionality
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileNavToggle && navMenu) {
        mobileNavToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
        });

        // Optional: Allow toggle via keyboard (Enter or Space)
        mobileNavToggle.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navMenu.classList.toggle('active');
            }
        });
    }
});

// Countdown Timer
function initCountdown() {
    const targetDate = new Date('2025-09-06T00:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance < 0) {
            // Event has started or ended
            document.querySelector('.countdown-title').textContent = 'MISSION ACTIVE';
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update display with leading zeros
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        // Add pulse effect on seconds change
        if (seconds !== updateCountdown.lastSecond) {
            const secondsEl = document.getElementById('seconds');
            secondsEl.style.transform = 'scale(1.1)';
            setTimeout(() => {
                secondsEl.style.transform = 'scale(1)';
            }, 200);
            updateCountdown.lastSecond = seconds;
        }
    }
    
    // Update immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Particle System
function initParticles() {
    const container = document.getElementById('particles-container');
    const particleCount = 150;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: #00ff41;
        border-radius: 50%;
        pointer-events: none;
        opacity: ${Math.random() * 0.8 + 0.2};
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float ${Math.random() * 10 + 10}s linear infinite;
        box-shadow: 0 0 6px #00ff41;
    `;
    
    container.appendChild(particle);
    
    // Animate particle
    animateParticle(particle);
}

function animateParticle(particle) {
    const duration = Math.random() * 20000 + 10000;
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    const endX = Math.random() * window.innerWidth;
    const endY = Math.random() * window.innerHeight;
    
    particle.style.left = startX + 'px';
    particle.style.top = startY + 'px';
    
    anime({
        targets: particle,
        left: endX,
        top: endY,
        opacity: [0.2, 0.8, 0.2],
        duration: duration,
        easing: 'linear',
        complete: () => animateParticle(particle)
    });
}

// Three.js 3D Scene
function initThreeJS() {
    const container = document.getElementById('three-container');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    // Create military-style geometric shapes
    const geometries = [];
    const materials = [];
    const meshes = [];
    
    // Main centerpiece - rotating military emblem
    const ringGeometry = new THREE.TorusGeometry(2, 0.1, 8, 20);
    const ringMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x00ff41,
        wireframe: true
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    scene.add(ring);
    meshes.push(ring);
    
    // Floating cubes around the ring
    for (let i = 0; i < 12; i++) {
        const cubeGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
        const cubeMaterial = new THREE.MeshBasicMaterial({ 
            color: Math.random() > 0.5 ? 0x00ff41 : 0xffd700,
            wireframe: true
        });
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        
        const angle = (i / 12) * Math.PI * 2;
        cube.position.x = Math.cos(angle) * 4;
        cube.position.y = Math.sin(angle) * 2;
        cube.position.z = Math.sin(angle) * 2;
        
        scene.add(cube);
        meshes.push(cube);
    }
    
    // Add some triangular elements
    for (let i = 0; i < 8; i++) {
        const triGeometry = new THREE.ConeGeometry(0.2, 0.8, 3);
        const triMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xff0040,
            wireframe: true
        });
        const triangle = new THREE.Mesh(triGeometry, triMaterial);
        
        triangle.position.x = (Math.random() - 0.5) * 8;
        triangle.position.y = (Math.random() - 0.5) * 4;
        triangle.position.z = (Math.random() - 0.5) * 4;
        
        scene.add(triangle);
        meshes.push(triangle);
    }
    
    camera.position.z = 8;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate main ring
        ring.rotation.x += 0.01;
        ring.rotation.y += 0.02;
        
        // Animate cubes
        meshes.forEach((mesh, index) => {
            if (index > 0 && index <= 12) {
                mesh.rotation.x += 0.02;
                mesh.rotation.y += 0.015;
                mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
            } else if (index > 12) {
                mesh.rotation.z += 0.03;
                mesh.position.x += Math.sin(Date.now() * 0.002 + index) * 0.005;
            }
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.offsetWidth, container.offsetHeight);
    });
}

// Anime.js Animations
function initAnimations() {
    // Hero text animations
    anime.timeline()
        .add({
            targets: '.title-line1',
            translateX: [-100, 0],
            opacity: [0, 1],
            duration: 800,
            easing: 'easeOutExpo'
        })
        .add({
            targets: '.title-line2',
            translateX: [100, 0],
            opacity: [0, 1],
            duration: 800,
            easing: 'easeOutExpo'
        }, '-=400')
        .add({
            targets: '.hero-subtitle',
            translateY: [30, 0],
            opacity: [0, 1],
            duration: 600,
            easing: 'easeOutExpo'
        }, '-=200')
        .add({
            targets: '.hero-date',
            scale: [0.8, 1],
            opacity: [0, 1],
            duration: 500,
            easing: 'easeOutElastic(1, .8)'
        }, '-=100')
        .add({
            targets: '.cta-btn',
            translateY: [40, 0],
            opacity: [0, 1],
            duration: 400,
            delay: anime.stagger(100),
            easing: 'easeOutExpo'
        }, '-=200');
    
    // Scroll-triggered animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                if (target.classList.contains('about-card')) {
                    anime({
                        targets: target,
                        translateY: [50, 0],
                        opacity: [0, 1],
                        duration: 600,
                        easing: 'easeOutExpo'
                    });
                }
                
                if (target.classList.contains('detail-item')) {
                    anime({
                        targets: target,
                        scale: [0.8, 1],
                        opacity: [0, 1],
                        duration: 500,
                        easing: 'easeOutElastic(1, .8)'
                    });
                }
                
                if (target.classList.contains('section-title')) {
                    anime({
                        targets: target,
                        translateY: [-30, 0],
                        opacity: [0, 1],
                        duration: 700,
                        easing: 'easeOutExpo'
                    });
                }
            }
        });
    }, { threshold: 0.3 });
    
    // Observe elements
    document.querySelectorAll('.about-card, .detail-item, .section-title').forEach(el => {
        observer.observe(el);
    });
}

// Event Listeners
function initEventListeners() {
    // Smooth scrolling for navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Sponsor button events
    document.querySelectorAll('.sponsor-btn-nav, .sponsor-btn-main').forEach(btn => {
        btn.addEventListener('click', () => {
            // Create glitch effect
            btn.style.animation = 'glitch 0.3s ease-in-out';
            
            // Show sponsor alert with military theme
            setTimeout(() => {
                showSponsorDialog();
                btn.style.animation = '';
            }, 300);
        });
    });
    
    // CTA Button events
    document.querySelectorAll('.cta-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.textContent.includes('ENLIST')) {
                showEnlistDialog();
            } else if (btn.textContent.includes('BRIEFING')) {
                showBriefingDialog();
            }
        });
    });
    
    // Add glitch keyframes to document
    const style = document.createElement('style');
    style.textContent = `
        @keyframes glitch {
            0% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
            100% { transform: translate(0); }
        }
        
        .dialog-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        }
        
        .dialog-overlay.active {
            opacity: 1;
            pointer-events: all;
        }
        
        .dialog-box {
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
            border: 2px solid #00ff41;
            border-radius: 12px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            text-align: center;
            box-shadow: 0 0 30px rgba(0, 255, 65, 0.3);
            transform: scale(0.8);
            transition: transform 0.3s ease;
        }
        
        .dialog-overlay.active .dialog-box {
            transform: scale(1);
        }
        
        .dialog-title {
            font-family: 'Orbitron', monospace;
            font-size: 1.5rem;
            color: #00ff41;
            margin-bottom: 1rem;
            text-shadow: 0 0 10px #00ff41;
        }
        
        .dialog-text {
            color: #e0e0e0;
            margin-bottom: 1.5rem;
            line-height: 1.6;
        }
        
        .dialog-btn {
            background: linear-gradient(45deg, #00ff41, #008f11);
            color: #0a0a0a;
            border: none;
            padding: 0.8rem 1.5rem;
            border-radius: 6px;
            font-weight: 700;
            text-transform: uppercase;
            cursor: pointer;
            margin: 0 0.5rem;
            transition: all 0.3s ease;
            font-family: 'Rajdhani', sans-serif;
        }
        
        .dialog-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 255, 65, 0.4);
        }
        
        .dialog-btn.secondary {
            background: transparent;
            color: #e0e0e0;
            border: 1px solid #e0e0e0;
        }
        
        .dialog-btn.secondary:hover {
            background: #e0e0e0;
            color: #0a0a0a;
        }
    `;
    document.head.appendChild(style);
}

// Dialog Functions
function showSponsorDialog() {
    const overlay = createDialog(
        'SPONSOR PARTNERSHIP',
        'Join forces with Algo X Nirman and support the next generation of elite developers. Partner with us to showcase your brand to brilliant minds and innovative thinkers.',
        [
            { text: 'CONTACT SPONSORS', action: () => window.open('mailto:vectorixcom@gmail.com?subject=Sponsorship Inquiry') },
            { text: 'CLOSE', action: closeDialog, secondary: true }
        ]
    );
    document.body.appendChild(overlay);
    setTimeout(() => overlay.classList.add('active'), 10);
}

function showEnlistDialog() {
    const overlay = createDialog(
        'ENLISTMENT CONFIRMED',
        'Prepare for battle, soldier! Registration opens soon. Follow our social channels and check your email for deployment instructions.',
        [
            { text: 'ROGER THAT', action: closeDialog }
        ]
    );
    document.body.appendChild(overlay);
    setTimeout(() => overlay.classList.add('active'), 10);
}

function showBriefingDialog() {
    const overlay = createDialog(
        'MISSION BRIEFING',
        'CLASSIFIED: 48-hour intensive coding operation. Teams of 2-4 operatives. Multiple combat zones: AI/ML, Web Dev, Mobile, Blockchain. Intel packets distributed at 0600 hours on deployment day.',
        [
            { text: 'UNDERSTOOD', action: closeDialog }
        ]
    );
    document.body.appendChild(overlay);
    setTimeout(() => overlay.classList.add('active'), 10);
}

function createDialog(title, text, buttons) {
    const overlay = document.createElement('div');
    overlay.className = 'dialog-overlay';
    
    const dialog = document.createElement('div');
    dialog.className = 'dialog-box';
    
    const titleEl = document.createElement('h3');
    titleEl.className = 'dialog-title';
    titleEl.textContent = title;
    
    const textEl = document.createElement('p');
    textEl.className = 'dialog-text';
    textEl.textContent = text;
    
    const buttonContainer = document.createElement('div');
    
    buttons.forEach(btn => {
        const button = document.createElement('button');
        button.className = btn.secondary ? 'dialog-btn secondary' : 'dialog-btn';
        button.textContent = btn.text;
        button.onclick = btn.action;
        buttonContainer.appendChild(button);
    });
    
    dialog.appendChild(titleEl);
    dialog.appendChild(textEl);
    dialog.appendChild(buttonContainer);
    overlay.appendChild(dialog);
    
    // Close on overlay click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeDialog();
        }
    });
    
    return overlay;
}

function closeDialog() {
    const overlay = document.querySelector('.dialog-overlay.active');
    if (overlay) {
        overlay.classList.remove('active');
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 300);
    }
}

document.addEventListener('mousemove', (e) => {
    mouseTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
    
    // Keep only recent trail points
    mouseTrail = mouseTrail.filter(point => Date.now() - point.time < 500);
    
    // Create trail particle occasionally
    if (Math.random() < 0.1) {
        createTrailParticle(e.clientX, e.clientY);
    }
});

function createTrailParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 4px;
        height: 4px;
        background: #00ff41;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        box-shadow: 0 0 8px #00ff41;
    `;
    
    document.body.appendChild(particle);
    
    anime({
        targets: particle,
        scale: [1, 0],
        opacity: [0.8, 0],
        duration: 800,
        easing: 'easeOutExpo',
        complete: () => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }
    });
}

// Typing effect for hero subtitle
function typeWriter(element, text, speed = 50) {
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect
setTimeout(() => {
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const originalText = subtitle.textContent;
        typeWriter(subtitle, originalText, 60);
    }
}, 2000);

// Console easter egg
console.log(`
██████╗ ██████╗  █████╗  ██████╗  █████╗ 
██╔══██╗██╔══██╗██╔══██╗██╔════╝ ██╔══██╗
██████╔╝██████╔╝███████║██║  ███╗███████║
██╔══██╗██╔══██╗██╔══██║██║   ██║██╔══██║
██████╔╝██║  ██║██║  ██║╚██████╔╝██║  ██║
╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝

Welcome to Algo X Nirman - Military Grade Hackathon
Enlist now: info@algoxnirman.com
`);

// Image Carousel Functionality
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function showNextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    function showPrevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    }

    prevBtn.addEventListener('click', showPrevSlide);
    nextBtn.addEventListener('click', showNextSlide);

    // Initialize first slide
    showSlide(currentIndex);
});

// Line of Control Section Initialization
function initOrganizer() {
    const organizerContainer = document.querySelector('.organizer-image-container');
    if (!organizerContainer) return;

    // Example images for organizer profiles
    const organizerProfiles = [
        { src: 'Black Full.png', alt: 'Organizer Profile 1' },
        { src: 'algoXnirman Logo Black.png', alt: 'Organizer Profile 2' },
        { src: 'CS IEEE ORANGE.png', alt: 'Organizer Profile 3' },
        { src: 'IIC LOGO.png', alt: 'Organizer Profile 4' }
    ];

    organizerProfiles.forEach(profile => {
        const img = document.createElement('img');
        img.src = profile.src;
        img.alt = profile.alt;
        img.className = 'organizer-profile-image';
        organizerContainer.appendChild(img);
    });
}

// Countdown Timer
function initCountdown() {
    const targetDate = new Date('2025-09-06T00:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance < 0) {
            // Event has started or ended
            document.querySelector('.countdown-title').textContent = 'MISSION ACTIVE';
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update display with leading zeros
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        // Add pulse effect on seconds change
        if (seconds !== updateCountdown.lastSecond) {
            const secondsEl = document.getElementById('seconds');
            secondsEl.style.transform = 'scale(1.1)';
            setTimeout(() => {
                secondsEl.style.transform = 'scale(1)';
            }, 200);
            updateCountdown.lastSecond = seconds;
        }
    }
    
    // Update immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Particle System
function initParticles() {
    const container = document.getElementById('particles-container');
    const particleCount = 150;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: #00ff41;
        border-radius: 50%;
        pointer-events: none;
        opacity: ${Math.random() * 0.8 + 0.2};
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float ${Math.random() * 10 + 10}s linear infinite;
        box-shadow: 0 0 6px #00ff41;
    `;
    
    container.appendChild(particle);
    
    // Animate particle
    animateParticle(particle);
}

function animateParticle(particle) {
    const duration = Math.random() * 20000 + 10000;
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    const endX = Math.random() * window.innerWidth;
    const endY = Math.random() * window.innerHeight;
    
    particle.style.left = startX + 'px';
    particle.style.top = startY + 'px';
    
    anime({
        targets: particle,
        left: endX,
        top: endY,
        opacity: [0.2, 0.8, 0.2],
        duration: duration,
        easing: 'linear',
        complete: () => animateParticle(particle)
    });
}

// Three.js 3D Scene
function initThreeJS() {
    const container = document.getElementById('three-container');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    // Create military-style geometric shapes
    const geometries = [];
    const materials = [];
    const meshes = [];
    
    // Main centerpiece - rotating military emblem
    const ringGeometry = new THREE.TorusGeometry(2, 0.1, 8, 20);
    const ringMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x00ff41,
        wireframe: true
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    scene.add(ring);
    meshes.push(ring);
    
    // Floating cubes around the ring
    for (let i = 0; i < 12; i++) {
        const cubeGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
        const cubeMaterial = new THREE.MeshBasicMaterial({ 
            color: Math.random() > 0.5 ? 0x00ff41 : 0xffd700,
            wireframe: true
        });
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        
        const angle = (i / 12) * Math.PI * 2;
        cube.position.x = Math.cos(angle) * 4;
        cube.position.y = Math.sin(angle) * 2;
        cube.position.z = Math.sin(angle) * 2;
        
        scene.add(cube);
        meshes.push(cube);
    }
    
    // Add some triangular elements
    for (let i = 0; i < 8; i++) {
        const triGeometry = new THREE.ConeGeometry(0.2, 0.8, 3);
        const triMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xff0040,
            wireframe: true
        });
        const triangle = new THREE.Mesh(triGeometry, triMaterial);
        
        triangle.position.x = (Math.random() - 0.5) * 8;
        triangle.position.y = (Math.random() - 0.5) * 4;
        triangle.position.z = (Math.random() - 0.5) * 4;
        
        scene.add(triangle);
        meshes.push(triangle);
    }
    
    camera.position.z = 8;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate main ring
        ring.rotation.x += 0.01;
        ring.rotation.y += 0.02;
        
        // Animate cubes
        meshes.forEach((mesh, index) => {
            if (index > 0 && index <= 12) {
                mesh.rotation.x += 0.02;
                mesh.rotation.y += 0.015;
                mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
            } else if (index > 12) {
                mesh.rotation.z += 0.03;
                mesh.position.x += Math.sin(Date.now() * 0.002 + index) * 0.005;
            }
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.offsetWidth, container.offsetHeight);
    });
}

// Anime.js Animations
function initAnimations() {
    // Hero text animations
    anime.timeline()
        .add({
            targets: '.title-line1',
            translateX: [-100, 0],
            opacity: [0, 1],
            duration: 800,
            easing: 'easeOutExpo'
        })
        .add({
            targets: '.title-line2',
            translateX: [100, 0],
            opacity: [0, 1],
            duration: 800,
            easing: 'easeOutExpo'
        }, '-=400')
        .add({
            targets: '.hero-subtitle',
            translateY: [30, 0],
            opacity: [0, 1],
            duration: 600,
            easing: 'easeOutExpo'
        }, '-=200')
        .add({
            targets: '.hero-date',
            scale: [0.8, 1],
            opacity: [0, 1],
            duration: 500,
            easing: 'easeOutElastic(1, .8)'
        }, '-=100')
        .add({
            targets: '.cta-btn',
            translateY: [40, 0],
            opacity: [0, 1],
            duration: 400,
            delay: anime.stagger(100),
            easing: 'easeOutExpo'
        }, '-=200');
    
    // Scroll-triggered animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                if (target.classList.contains('about-card')) {
                    anime({
                        targets: target,
                        translateY: [50, 0],
                        opacity: [0, 1],
                        duration: 600,
                        easing: 'easeOutExpo'
                    });
                }
                
                if (target.classList.contains('detail-item')) {
                    anime({
                        targets: target,
                        scale: [0.8, 1],
                        opacity: [0, 1],
                        duration: 500,
                        easing: 'easeOutElastic(1, .8)'
                    });
                }
                
                if (target.classList.contains('section-title')) {
                    anime({
                        targets: target,
                        translateY: [-30, 0],
                        opacity: [0, 1],
                        duration: 700,
                        easing: 'easeOutExpo'
                    });
                }
            }
        });
    }, { threshold: 0.3 });
    
    // Observe elements
    document.querySelectorAll('.about-card, .detail-item, .section-title').forEach(el => {
        observer.observe(el);
    });
}

// Event Listeners
function initEventListeners() {
    // Smooth scrolling for navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Sponsor button events
    document.querySelectorAll('.sponsor-btn-nav, .sponsor-btn-main').forEach(btn => {
        btn.addEventListener('click', () => {
            // Create glitch effect
            btn.style.animation = 'glitch 0.3s ease-in-out';
            
            // Show sponsor alert with military theme
            setTimeout(() => {
                showSponsorDialog();
                btn.style.animation = '';
            }, 300);
        });
    });
    
    // CTA Button events
    document.querySelectorAll('.cta-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.textContent.includes('ENLIST')) {
                showEnlistDialog();
            } else if (btn.textContent.includes('BRIEFING')) {
                showBriefingDialog();
            }
        });
    });
    
    // Add glitch keyframes to document
    const style = document.createElement('style');
    style.textContent = `
        @keyframes glitch {
            0% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
            100% { transform: translate(0); }
        }
        
        .dialog-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        }
        
        .dialog-overlay.active {
            opacity: 1;
            pointer-events: all;
        }
        
        .dialog-box {
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
            border: 2px solid #00ff41;
            border-radius: 12px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            text-align: center;
            box-shadow: 0 0 30px rgba(0, 255, 65, 0.3);
            transform: scale(0.8);
            transition: transform 0.3s ease;
        }
        
        .dialog-overlay.active .dialog-box {
            transform: scale(1);
        }
        
        .dialog-title {
            font-family: 'Orbitron', monospace;
            font-size: 1.5rem;
            color: #00ff41;
            margin-bottom: 1rem;
            text-shadow: 0 0 10px #00ff41;
        }
        
        .dialog-text {
            color: #e0e0e0;
            margin-bottom: 1.5rem;
            line-height: 1.6;
        }
        
        .dialog-btn {
            background: linear-gradient(45deg, #00ff41, #008f11);
            color: #0a0a0a;
            border: none;
            padding: 0.8rem 1.5rem;
            border-radius: 6px;
            font-weight: 700;
            text-transform: uppercase;
            cursor: pointer;
            margin: 0 0.5rem;
            transition: all 0.3s ease;
            font-family: 'Rajdhani', sans-serif;
        }
        
        .dialog-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 255, 65, 0.4);
        }
        
        .dialog-btn.secondary {
            background: transparent;
            color: #e0e0e0;
            border: 1px solid #e0e0e0;
        }
        
        .dialog-btn.secondary:hover {
            background: #e0e0e0;
            color: #0a0a0a;
        }
    `;
    document.head.appendChild(style);
}

// Dialog Functions
function showSponsorDialog() {
    const overlay = createDialog(
        'SPONSOR PARTNERSHIP',
        'Join forces with Algo X Nirman and support the next generation of elite developers. Partner with us to showcase your brand to brilliant minds and innovative thinkers.',
        [
            { text: 'CONTACT SPONSORS', action: () => window.open('mailto:vectorixcom@gmail.com?subject=Sponsorship Inquiry') },
            { text: 'CLOSE', action: closeDialog, secondary: true }
        ]
    );
    document.body.appendChild(overlay);
    setTimeout(() => overlay.classList.add('active'), 10);
}

function showEnlistDialog() {
    const overlay = createDialog(
        'ENLISTMENT CONFIRMED',
        'Prepare for battle, soldier! Registration opens soon. Follow our social channels and check your email for deployment instructions.',
        [
            { text: 'ROGER THAT', action: closeDialog }
        ]
    );
    document.body.appendChild(overlay);
    setTimeout(() => overlay.classList.add('active'), 10);
}

function showBriefingDialog() {
    const overlay = createDialog(
        'MISSION BRIEFING',
        'CLASSIFIED: 48-hour intensive coding operation. Teams of 2-4 operatives. Multiple combat zones: AI/ML, Web Dev, Mobile, Blockchain. Intel packets distributed at 0600 hours on deployment day.',
        [
            { text: 'UNDERSTOOD', action: closeDialog }
        ]
    );
    document.body.appendChild(overlay);
    setTimeout(() => overlay.classList.add('active'), 10);
}

function createDialog(title, text, buttons) {
    const overlay = document.createElement('div');
    overlay.className = 'dialog-overlay';
    
    const dialog = document.createElement('div');
    dialog.className = 'dialog-box';
    
    const titleEl = document.createElement('h3');
    titleEl.className = 'dialog-title';
    titleEl.textContent = title;
    
    const textEl = document.createElement('p');
    textEl.className = 'dialog-text';
    textEl.textContent = text;
    
    const buttonContainer = document.createElement('div');
    
    buttons.forEach(btn => {
        const button = document.createElement('button');
        button.className = btn.secondary ? 'dialog-btn secondary' : 'dialog-btn';
        button.textContent = btn.text;
        button.onclick = btn.action;
        buttonContainer.appendChild(button);
    });
    
    dialog.appendChild(titleEl);
    dialog.appendChild(textEl);
    dialog.appendChild(buttonContainer);
    overlay.appendChild(dialog);
    
    // Close on overlay click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeDialog();
        }
    });
    
    return overlay;
}

function closeDialog() {
    const overlay = document.querySelector('.dialog-overlay.active');
    if (overlay) {
        overlay.classList.remove('active');
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 300);
    }
}

// Mouse trail effect
let mouseTrail = [];
document.addEventListener('mousemove', (e) => {
    mouseTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
    
    // Keep only recent trail points
    mouseTrail = mouseTrail.filter(point => Date.now() - point.time < 500);
    
    // Create trail particle occasionally
    if (Math.random() < 0.1) {
        createTrailParticle(e.clientX, e.clientY);
    }
});

function createTrailParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 4px;
        height: 4px;
        background: #00ff41;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        box-shadow: 0 0 8px #00ff41;
    `;
    
    document.body.appendChild(particle);
    
    anime({
        targets: particle,
        scale: [1, 0],
        opacity: [0.8, 0],
        duration: 800,
        easing: 'easeOutExpo',
        complete: () => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }
    });
}

// Typing effect for hero subtitle
function typeWriter(element, text, speed = 50) {
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect
setTimeout(() => {
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const originalText = subtitle.textContent;
        typeWriter(subtitle, originalText, 60);
    }
}, 2000);

// Console easter egg
console.log(`
██████╗ ██████╗  █████╗  ██████╗  █████╗ 
██╔══██╗██╔══██╗██╔══██╗██╔════╝ ██╔══██╗
██████╔╝██████╔╝███████║██║  ███╗███████║
██╔══██╗██╔══██╗██╔══██║██║   ██║██╔══██║
██████╔╝██║  ██║██║  ██║╚██████╔╝██║  ██║
╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝

Welcome to Algo X Nirman - Military Grade Hackathon
Enlist now: info@algoxnirman.com
`);