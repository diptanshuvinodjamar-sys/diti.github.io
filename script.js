document.addEventListener("DOMContentLoaded", () => {
    // 0. Calculate Progress and Apply Theme
    const currentPage = window.location.pathname.split('/').pop();
    let progress = 0; // 0 to 1

    if (currentPage === 'index.html' || currentPage === '') {
        progress = 0;
    } else if (currentPage === 'request.html' || currentPage === 'gallery.html') {
        progress = 1;
    } else if (currentPage === 'apology.html') {
        const urlParams = new URLSearchParams(window.location.search);
        const pageNum = parseInt(urlParams.get('p')) || 1;
        progress = pageNum / 100;
    }

    // Color sets: [R, G, B]
    const themes = {
        bgDark: { start: [20, 25, 35], end: [15, 12, 27] }, 
        lavenderLight: { start: [190, 195, 205], end: [230, 230, 250] },
        lavenderMid: { start: [130, 140, 160], end: [203, 179, 232] },
        lavenderDark: { start: [50, 60, 80], end: [107, 76, 154] },
        accent: { start: [100, 120, 150], end: [179, 136, 235] },
        textMain: { start: [200, 210, 220], end: [245, 240, 251] }
    };

    const interpolate = (c1, c2, factor) => c1.map((val, i) => Math.round(val + factor * (c2[i] - val)));

    const applyThemeColors = () => {
        const root = document.documentElement;
        
        for (const [key, value] of Object.entries(themes)) {
            const interpolated = interpolate(value.start, value.end, progress);
            const cssVarName = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
            root.style.setProperty(cssVarName, `rgb(${interpolated[0]}, ${interpolated[1]}, ${interpolated[2]})`);
        }

        // Glow color
        const glowColor = interpolate(themes.accent.start, themes.accent.end, progress);
        root.style.setProperty('--glow-color', `rgba(${glowColor[0]}, ${glowColor[1]}, ${glowColor[2]}, 0.15)`);
    };
    
    applyThemeColors();

    // 1. Particle System (Evolving based on progress)
    const particleContainer = document.getElementById('particle-container');
    // Number of particles increases from 15 to 40
    const particleCount = Math.floor(15 + (progress * 25)); 

    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // At high progress, some particles become tiny hearts or sparkles
        const isMagical = progress > 0.7 && Math.random() < (progress - 0.7) * 2;
        if (isMagical) {
            particle.innerHTML = ['✨', '🤍', '🌸'][Math.floor(Math.random() * 3)];
            particle.style.background = 'none';
            particle.style.fontSize = `${Math.random() * 10 + 10}px`;
            particle.style.display = 'flex';
            particle.style.alignItems = 'center';
            particle.style.justifyContent = 'center';
        } else {
            // Randomize properties based on progress
            const size = Math.random() * 10 + 5 + (progress * 5); // 5px to 20px
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Colors shift from gray/blue to lavender/pink
            const colorStart = [150, 160, 180];
            const colorEnd = [179, 136, 235];
            const c = interpolate(colorStart, colorEnd, progress);
            
            const opacity = 0.3 + (Math.random() * 0.3) + (progress * 0.2); // 0.3 to 0.8
            particle.style.background = `radial-gradient(circle, rgba(${c[0]}, ${c[1]}, ${c[2]}, ${opacity}) 0%, transparent 70%)`;
        }

        const left = Math.random() * 100; // 0vw to 100vw
        // Duration gets slightly faster
        const animationDuration = Math.random() * 15 + 15 - (progress * 5); // 10s to 30s
        const animationDelay = Math.random() * 10; // 0s to 10s

        particle.style.left = `${left}vw`;
        particle.style.animationDuration = `${animationDuration}s`;
        particle.style.animationDelay = `-${animationDelay}s`;

        particleContainer.appendChild(particle);
    }

    // 2. Authentication
    window.checkLogin = function() {
        const idInput = document.getElementById('loginId');
        const passInput = document.getElementById('loginPass');
        const errorMsg = document.getElementById('loginError');

        if (!idInput || !passInput) return;

        const id = idInput.value.trim().toLowerCase();
        const pass = passInput.value.trim();

        if (id === 'diti' && pass === '05/02/2007') {
            if (errorMsg) errorMsg.style.display = 'none';
            window.nextStep(1);
        } else {
            if (errorMsg) errorMsg.style.display = 'block';
        }
    };

    // 3. Next Step Navigation
    window.nextStep = function(stepIndex) {
        // Hide all steps
        document.querySelectorAll('.step-section').forEach(section => {
            section.classList.add('hidden');
            section.classList.remove('active');
            const glass = section.querySelector('.glass-container');
            if(glass) glass.classList.remove('visible');
        });
        
        // Show the target step
        const targetStep = document.getElementById(`step-${stepIndex}`);
        if (targetStep) {
            targetStep.classList.remove('hidden');
            targetStep.classList.add('active');
            
            // Add visible class after a tiny delay for transition
            setTimeout(() => {
                const glass = targetStep.querySelector('.glass-container');
                if(glass) glass.classList.add('visible');
            }, 50);
        }
    };

    // Populate 99 sorries
    const sorriesList = document.getElementById('sorries-list');
    if (sorriesList) {
        for (let i = 1; i <= 99; i++) {
            let p = document.createElement('p');
            p.className = 'sorry-item';
            p.innerText = `${i}. I'm sorry`;
            sorriesList.appendChild(p);
        }
    }

    // Force the first element to be visible immediately after a tiny delay
    setTimeout(() => {
        const firstGlass = document.querySelector('.glass-container');
        if(firstGlass) firstGlass.classList.add('visible');
    }, 100);

    // 3. Interactive Ending
    const forgiveBtn = document.getElementById('forgiveBtn');
    const endingOverlay = document.getElementById('ending-overlay');

    if (forgiveBtn && endingOverlay) {
        forgiveBtn.addEventListener('click', () => {
            endingOverlay.classList.remove('hidden');
            // Allow a small delay to trigger CSS transition
            setTimeout(() => {
                endingOverlay.classList.add('show');
                createFallingHearts();
            }, 50);
        });
    }

    function createFallingHearts() {
        const container = document.getElementById('hearts-container');
        if (!container) return;
        
        // Add CSS keyframes for falling animation if not exists
        if (!document.getElementById('heart-keyframes')) {
            const style = document.createElement('style');
            style.id = 'heart-keyframes';
            style.innerHTML = `
                @keyframes fallHeart {
                    to {
                        transform: translateY(105vh) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        // Spawn hearts continuously
        let count = 0;
        const interval = setInterval(() => {
            if (count > 150) {
                clearInterval(interval); // Stop after 150 hearts
                return;
            }
            count++;
            const heart = document.createElement('div');
            heart.innerHTML = ['💜', '💖', '✨', '🤍', '🌸'][Math.floor(Math.random() * 5)];
            heart.style.position = 'absolute';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = '-5vh';
            heart.style.fontSize = (Math.random() * 40 + 35) + 'px';
            heart.style.opacity = Math.random() * 0.7 + 0.3;
            heart.style.animation = `fallHeart ${Math.random() * 3 + 3}s linear forwards`;
            
            container.appendChild(heart);
            
            // Remove element after animation
            setTimeout(() => {
                heart.remove();
            }, 6000);
        }, 100);
    }

    // 4. Keyboard Navigation
    document.addEventListener('keydown', (event) => {
        if (event.key === "Enter") {
            const activeStep0 = document.querySelector('.step-section.active#step-0');
            if (activeStep0) {
                window.checkLogin();
                return;
            }
        }

        if (event.key === "ArrowRight") {
            // Check index.html active section next button
            const activeNextBtn = document.querySelector('.step-section.active .next-step-btn');
            if (activeNextBtn) {
                activeNextBtn.click();
                return;
            }
            
            // Check index.html step-4 "Read my apologies" button
            const activeStep4 = document.querySelector('.step-section.active#step-4');
            if (activeStep4) {
                const readApologiesBtn = Array.from(activeStep4.querySelectorAll('a')).find(a => a.textContent.trim() === 'Read my apologies');
                if (readApologiesBtn) {
                    readApologiesBtn.click();
                    return;
                }
            }

            // Check pageX.html next links
            const nextLinks = Array.from(document.querySelectorAll('a.nav-btn')).filter(a => a.textContent.trim() === 'Next');
            if (nextLinks.length > 0) {
                nextLinks[0].click();
                return;
            }

            // Check request.html forgiveBtn
            const forgiveBtn = document.getElementById('forgiveBtn');
            const endingOverlay = document.getElementById('ending-overlay');
            if (forgiveBtn && endingOverlay && !endingOverlay.classList.contains('show')) {
                forgiveBtn.click();
                return;
            }
        }
    });
});
