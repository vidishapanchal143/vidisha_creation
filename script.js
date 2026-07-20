/**
 * Vidisha's Portfolio Main Script
 * Coordinated interactive controls for a premium 3D visual portfolio.
 * 
 * Handled Features:
 * 1. Cinematic Loader
 * 2. Cursor Glow Follower
 * 3. Particle Constellation Canvas
 * 4. Smooth Navigation & Mobile Menu
 * 5. Scroll Reveals (Intersection Observers)
 * 6. 3D Tilt Effect on cards
 * 7. Category Filters (videos, posters, editing)
 * 8. Dual Lightbox Modal (HTML5 Video & Ad Poster Images)
 * 9. India Prefilled WhatsApp CTAs
 * 10. Contact Form Mailto fallbacks
 * 11. Animated Stats Counter
 * 12. Timeline Process Steps
 * 13. Hero Mouse Parallax
 * 14. Magnetic Button Interaction
 */

document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initCursorGlow();
    initParticles();
    initNavigation();
    addRevealClasses();
    initScrollReveal();
    initTiltEffect();
    initPortfolioFilters();
    initVideoModal();
    initVideoPreviews();
    initWhatsApp();
    initContactForm();
    initCounters();
    initProcessAnimation();
    initHeroParallax();
    initMagneticButtons();
});

/**
 * 1. CINEMATIC LOADER
 */
function initLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;
    
    // Listen for window load event to transition away
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('loaded');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 700);
        }, 1500); // Shorter cinematic wait time as requested
    });

    // Fallback: If load event takes too long, hide loader after 5 seconds
    setTimeout(() => {
        if (!loader.classList.contains('loaded')) {
            loader.classList.add('loaded');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 700);
        }
    }, 5000);
}

/**
 * 2. CURSOR GLOW (Desktop Only)
 */
function initCursorGlow() {
    const glow = document.getElementById('cursor-glow');
    if (!glow) return;

    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        glow.style.display = 'none';
        return;
    }

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        glow.classList.add('active');
    });

    document.addEventListener('mouseleave', () => {
        glow.classList.remove('active');
    });

    function animate() {
        // Linear interpolation for smooth lag follow
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;
        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';
        requestAnimationFrame(animate);
    }
    animate();
}

/**
 * 3. PARTICLE CANVAS (High Performance HTML5 Canvas)
 */
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 25 : 55;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.opacity = Math.random() * 0.5 + 0.15;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(124, 58, 237, ${this.opacity})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        // Draw connection webs
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 140) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(124, 58, 237, ${0.08 * (1 - dist / 140)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        animationId = requestAnimationFrame(animate);
    }
    animate();

    // Performance booster: Pause rendering if user switches tabs
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });
}

/**
 * 4. SMOOTH NAVIGATION & MOBILE DRAWER
 */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelectorAll('.nav-links a');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a, .mobile-cta');

    // Scroll adaptation
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveLink();
    });

    // Sticky link highlighter
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id], .hero-section');
        let current = 'home';
        
        sections.forEach(sec => {
            const top = sec.offsetTop - 120;
            if (window.scrollY >= top) {
                current = sec.getAttribute('id') || 'home';
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    // Toggle menu
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !expanded);
            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = !expanded ? 'hidden' : '';
        });
    }

    // Collapse on links click
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Page anchor click handler
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 75;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * 5. SCROLL REVEAL ANIMATIONS
 */
function addRevealClasses() {
    document.querySelectorAll('.section-header').forEach(el => el.classList.add('reveal'));
    
    const cardGroups = ['.strength-card', '.service-card', '.project-card', '.why-card', '.testimonial-card', '.certificate-card'];
    cardGroups.forEach(selector => {
        document.querySelectorAll(selector).forEach((card, i) => {
            card.classList.add('reveal');
            if (i < 4) card.classList.add('reveal-delay-' + (i + 1));
        });
    });

    document.querySelectorAll('.about-image-wrapper').forEach(el => el.classList.add('reveal-left'));
    document.querySelectorAll('.about-details').forEach(el => el.classList.add('reveal-right'));
    document.querySelectorAll('.featured-project').forEach(el => el.classList.add('reveal'));
    document.querySelectorAll('.cta-content').forEach(el => el.classList.add('reveal'));
    document.querySelectorAll('.contact-info').forEach(el => el.classList.add('reveal-left'));
    document.querySelectorAll('.contact-form-wrapper').forEach(el => el.classList.add('reveal-right'));
    document.querySelectorAll('.process-step').forEach(el => el.classList.add('reveal'));
    
    // Creative Statement text reveal
    document.querySelectorAll('.statement-text').forEach(el => el.classList.add('reveal'));
}

function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        revealElements.forEach(el => el.classList.add('revealed'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => observer.observe(el));
}

/**
 * 6. 3D TILT CARDS
 */
function initTiltEffect() {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const tiltElements = document.querySelectorAll('[data-tilt]');
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * -6;
            const rotateY = (x - centerX) / centerX * 6;
            
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
            el.style.transition = 'transform 0.08s ease';
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            el.style.transition = 'transform 0.4s ease';
        });
    });
}

/**
 * 7. PORTFOLIO FILTERS
 */
function initPortfolioFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.classList.add('visible');
                } else {
                    card.classList.remove('visible');
                    card.classList.add('hidden');
                }
            });
        });
    });

    projectCards.forEach(card => card.classList.add('visible'));
}

/**
 * 8. DUAL LIGHTBOX MODAL (Videos & Images)
 */
function initVideoModal() {
    const modal = document.getElementById('media-modal') || document.getElementById('video-modal');
    if (!modal) return;

    const modalVideo = document.getElementById('modal-video');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalCategory = document.getElementById('modal-category');
    const modalDescription = document.getElementById('modal-description');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');

    // Clean leading slash for local paths to ensure compatibility with GitHub Pages
    function cleanPath(path) {
        if (!path) return '';
        // If it starts with '/' and not '//' (which represents external links)
        if (path.startsWith('/') && !path.startsWith('//')) {
            return '.' + path;
        }
        return path;
    }

    // Helper to extract Google Drive File ID and build preview embed URL
    function getGoogleDriveEmbedUrl(url) {
        let fileId = '';
        if (url.includes('/file/d/')) {
            fileId = url.split('/file/d/')[1].split('/')[0];
        } else if (url.includes('id=')) {
            fileId = url.split('id=')[1].split('&')[0];
        }
        if (fileId) {
            return `https://drive.google.com/file/d/${fileId}/preview`;
        }
        return url;
    }

    // Create image tag if missing from HTML layout dynamically
    let imgContainer = modalImg;
    if (!imgContainer && modalVideo) {
        imgContainer = document.createElement('img');
        imgContainer.id = 'modal-img';
        imgContainer.style.display = 'none';
        imgContainer.style.maxWidth = '100%';
        imgContainer.style.maxHeight = '75vh';
        imgContainer.style.objectFit = 'contain';
        imgContainer.style.borderRadius = 'var(--radius-md)';
        modalVideo.parentNode.insertBefore(imgContainer, modalVideo);
    }

    // Create iframe tag for Google Drive videos dynamically
    let iframeContainer = document.getElementById('modal-iframe');
    if (!iframeContainer && modalVideo) {
        iframeContainer = document.createElement('iframe');
        iframeContainer.id = 'modal-iframe';
        iframeContainer.style.display = 'none';
        iframeContainer.style.width = '100%';
        iframeContainer.style.height = '450px';
        iframeContainer.style.border = 'none';
        iframeContainer.style.borderRadius = 'var(--radius-md)';
        iframeContainer.setAttribute('allow', 'autoplay; fullscreen');
        modalVideo.parentNode.insertBefore(iframeContainer, modalVideo);
    }

    function openModal(btn) {
        let type = btn.getAttribute('data-type');
        let videoSrc = btn.getAttribute('data-video');
        let imgSrc = btn.getAttribute('data-image');
        
        if (!type) {
            type = videoSrc ? 'video' : 'image';
        }

        // Clean local asset paths
        videoSrc = cleanPath(videoSrc);
        imgSrc = cleanPath(imgSrc);

        // Pause all background video previews
        document.querySelectorAll('.project-preview-video').forEach(v => v.pause());
        if (typeof muteAllInlineVideos === 'function') {
            muteAllInlineVideos();
        }

        // Write details
        if (modalTitle) modalTitle.textContent = btn.getAttribute('data-title') || '';
        if (modalCategory) modalCategory.textContent = btn.getAttribute('data-category') || '';
        if (modalDescription) modalDescription.textContent = btn.getAttribute('data-description') || '';

        // Media Routing
        if (type === 'video' && videoSrc) {
            if (imgContainer) imgContainer.style.display = 'none';

            // Check if it is a Google Drive URL
            const isGoogleDrive = videoSrc.includes('drive.google.com') || videoSrc.includes('docs.google.com');

            if (isGoogleDrive) {
                // Pause and hide HTML5 video player
                if (modalVideo) {
                    modalVideo.pause();
                    modalVideo.style.display = 'none';
                    modalVideo.src = '';
                }
                // Show iframe with Google Drive Embed
                if (iframeContainer) {
                    iframeContainer.style.display = 'block';
                    iframeContainer.src = getGoogleDriveEmbedUrl(videoSrc);
                }
            } else {
                // Hide Google Drive iframe
                if (iframeContainer) {
                    iframeContainer.style.display = 'none';
                    iframeContainer.src = '';
                }
                // Play local video using HTML5 controls
                if (modalVideo) {
                    modalVideo.style.display = 'block';
                    modalVideo.src = videoSrc;
                    modalVideo.muted = false; // Make sure audio is enabled
                    modalVideo.volume = 1.0;
                    modalVideo.load(); // Reload video with the new source
                    modalVideo.play().catch(e => {
                        console.warn('Autoplay with sound prevented, user interaction required:', e);
                    });
                }
            }
        } else if ((type === 'image' || type === 'poster') && imgSrc) {
            if (modalVideo) {
                modalVideo.pause();
                modalVideo.style.display = 'none';
                modalVideo.src = '';
            }
            if (iframeContainer) {
                iframeContainer.style.display = 'none';
                iframeContainer.src = '';
            }
            if (imgContainer) {
                imgContainer.style.display = 'block';
                imgContainer.src = imgSrc;
            }
        }

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        setTimeout(() => { if (modalClose) modalClose.focus(); }, 100);
    }

    function closeModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        
        if (modalVideo) {
            modalVideo.pause();
            modalVideo.src = '';
        }
        if (iframeContainer) {
            iframeContainer.src = '';
            iframeContainer.style.display = 'none';
        }
        if (imgContainer) {
            imgContainer.removeAttribute('src');
        }

        // Resume visible background video previews by triggering observer scroll logic
        window.dispatchEvent(new Event('scroll'));
    }

    // Click listener on triggers directly (buttons, links, etc.)
    const directTriggers = document.querySelectorAll('.open-modal, .play-btn, .modal-trigger');
    directTriggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openModal(btn);
        });
    });

    // Mute all inline grid videos, remove active classes, and reset indicators
    const inlineVideos = document.querySelectorAll('.portfolio-section .project-preview-video');
    function muteAllInlineVideos() {
        inlineVideos.forEach(v => {
            v.muted = true;
            v.removeAttribute('controls');
            const card = v.closest('.project-card');
            if (card) {
                card.classList.remove('active-inline');
            }
            const indicator = v.parentNode.querySelector('.muted-indicator');
            if (indicator) {
                indicator.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`;
            }
        });
    }

    // Set up click handlers for video cards inline (My Creative Work)
    const videoCards = document.querySelectorAll('.project-card[data-category="video"], .project-card[data-category="editing"]');
    videoCards.forEach(card => {
        const video = card.querySelector('.project-preview-video');
        const indicator = card.querySelector('.muted-indicator');

        if (!video) return;

        card.style.cursor = 'pointer';

        // Speaker icon click toggles mute/unmute
        if (indicator) {
            indicator.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                if (video.muted) {
                    muteAllInlineVideos();
                    video.muted = false;
                    video.volume = 1.0;
                    video.setAttribute('controls', '');
                    card.classList.add('active-inline');
                    indicator.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;
                    video.play().catch(err => console.log('Inline play error:', err));
                } else {
                    video.muted = true;
                    video.removeAttribute('controls');
                    card.classList.remove('active-inline');
                    indicator.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`;
                }
            });
        }

        // Clicking the main card/video area (excluding fullscreen button) unmutes/plays inline
        card.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-trigger') || e.target.closest('.modal-trigger')) {
                return; // Let the modal trigger handle watch fullscreen clicks
            }
            if (e.target.tagName === 'A') return;

            e.preventDefault();
            e.stopPropagation();

            if (video.muted) {
                muteAllInlineVideos();
                video.muted = false;
                video.volume = 1.0;
                video.setAttribute('controls', '');
                card.classList.add('active-inline');
                if (indicator) {
                    indicator.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;
                }
                video.play().catch(err => console.log('Inline play error:', err));
            } else {
                if (video.paused) {
                    video.play().catch(() => {});
                } else {
                    video.pause();
                }
            }
        });
    });

    // Make non-video project cards, certificate boxes, and featured cards clickable to open modal
    const nonVideoCardWrappers = document.querySelectorAll('.featured-project, .certificate-media, .project-card[data-category="poster"]');
    nonVideoCardWrappers.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
            const trigger = card.querySelector('.modal-trigger, .play-btn, [data-video], [data-image]');
            
            if (e.target.tagName === 'A' && !e.target.classList.contains('modal-trigger')) {
                return;
            }
            if (e.target.classList.contains('modal-trigger') || e.target.classList.contains('play-btn')) {
                return;
            }

            if (trigger) {
                e.preventDefault();
                e.stopPropagation();
                openModal(trigger);
            }
        });
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

/**
 * 9. WHATSAPP CUSTOM INTEG (Prefilled Visual Services Prompt)
 */
function initWhatsApp() {
    const waBtns = document.querySelectorAll('.whatsapp-float, .whatsapp-btn, a[href*="wa.me"]');
    const msg = "Hi Vidisha! I visited your portfolio and I'm interested in your creative services. I would like to discuss a project with you.";
    const encMsg = encodeURIComponent(msg);

    waBtns.forEach(btn => {
        const currentHref = btn.getAttribute('href');
        if (currentHref && currentHref.includes('wa.me')) {
            const base = currentHref.split('?')[0];
            btn.setAttribute('href', `${base}?text=${encMsg}`);
        }
    });
}

/**
 * 10. CONTACT FORM MAILTO FALLBACK
 */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = form.querySelector('#name') ? form.querySelector('#name').value.trim() : '';
        const email = form.querySelector('#email') ? form.querySelector('#email').value.trim() : '';
        const phone = form.querySelector('#phone') ? form.querySelector('#phone').value.trim() : '';
        const company = form.querySelector('#company') ? form.querySelector('#company').value.trim() : '';
        const videoType = form.querySelector('#video-type') ? form.querySelector('#video-type').value : '';
        const details = form.querySelector('#details') ? form.querySelector('#details').value.trim() : '';
        const budget = form.querySelector('#budget') ? form.querySelector('#budget').value : '';

        if (!name || !email || !details) {
            alert('Please fill out all required fields (Name, Email, and Project Details).');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Build formatted mail message
        let body = `New Creative Visual Inquiry%0D%0A%0D%0A`;
        body += `Name: ${encodeURIComponent(name)}%0D%0A`;
        body += `Email: ${encodeURIComponent(email)}%0D%0A`;
        if (phone) body += `Phone/WhatsApp: ${encodeURIComponent(phone)}%0D%0A`;
        if (company) body += `Company/Brand: ${encodeURIComponent(company)}%0D%0A`;
        if (videoType) body += `Service Requested: ${encodeURIComponent(videoType)}%0D%0A`;
        body += `%0D%0AProject Description:%0D%0A${encodeURIComponent(details)}%0D%0A`;
        if (budget) body += `%0D%0ABudget Range: ${encodeURIComponent(budget)}%0D%0A`;

        const subject = encodeURIComponent(`New Inquiry: ${videoType || 'Creative Services'}`);
        const mailtoLink = `mailto:vdsa5044@gmail.com?subject=${subject}&body=${body}`;

        window.location.href = mailtoLink;
        alert('Your email software will launch with your request details prefilled. Please review and click Send!');
    });
}

/**
 * 11. STAT COUNTERS
 */
function initCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const text = el.textContent;
                const match = text.match(/(\d+)/);
                if (match) {
                    const target = parseInt(match[1]);
                    const suffix = text.replace(match[1], '').trim();
                    const prefix = text.substring(0, text.indexOf(match[1]));
                    let current = 0;
                    const steps = 50;
                    const increment = target / steps;
                    let step = 0;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        step++;
                        if (step >= steps) {
                            el.textContent = prefix + target + suffix;
                            clearInterval(timer);
                        } else {
                            el.textContent = prefix + Math.floor(current) + suffix;
                        }
                    }, 20);
                }
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => observer.observe(el));
}

/**
 * 12. TIMELINE HIGHLIGHTER
 */
function initProcessAnimation() {
    const steps = document.querySelectorAll('.process-step');
    if (steps.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.4 });

    steps.forEach(step => observer.observe(step));
}

/**
 * 13. HERO PARALLAX
 */
function initHeroParallax() {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
    const heroImage = document.querySelector('.hero-portrait-wrapper');
    const badges = document.querySelectorAll('.floating-badge');
    const orbs = document.querySelectorAll('.hero-orb');

    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        if (heroImage) {
            heroImage.style.transform = `translate(${x * 8}px, ${y * 8}px)`;
        }
        badges.forEach((badge, i) => {
            const factor = (i + 1) * 6;
            badge.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
        });
        orbs.forEach((orb, i) => {
            const factor = (i + 1) * 12;
            orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
        });
    });
}

/**
 * 14. MAGNETIC BUTTON EFFECTS
 */
function initMagneticButtons() {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
    const buttons = document.querySelectorAll('.btn-primary, .nav-cta, .btn-secondary');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
            btn.style.transition = 'transform 0.05s ease';
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
            btn.style.transition = 'transform 0.3s ease';
        });
    });
}

/**
 * 15. PORTFOLIO VIDEO PREVIEW CONTROLLER (Muted Viewport Previews & Motion Access)
 */
function initVideoPreviews() {
    const previewVideos = document.querySelectorAll('.project-preview-video');
    if (previewVideos.length === 0) return;

    // By default, ensure all previews are muted, loop, and playsinline
    previewVideos.forEach(video => {
        video.muted = true;
        video.loop = true;
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
    });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        // Accessibility check: Keep previews paused
        previewVideos.forEach(video => {
            video.removeAttribute('autoplay');
            video.pause();
        });
        return;
    }

    // Set up IntersectionObserver to only autoplay muted previews that are in the viewport
    let activeObserver;
    if ('IntersectionObserver' in window) {
        activeObserver = new IntersectionObserver((entries) => {
            // Check if the modal is currently active
            const modal = document.getElementById('media-modal') || document.getElementById('video-modal');
            const isModalActive = modal && modal.classList.contains('active');

            entries.forEach(entry => {
                const video = entry.target;
                if (entry.isIntersecting && !isModalActive) {
                    // Play silently in the viewport
                    video.play().catch(err => {
                        // Safe fail if autoplay block occurs
                        console.log('Grid preview autoplay blocked:', err);
                    });
                } else {
                    // Pause preview out of view
                    video.pause();
                }
            });
        }, {
            threshold: 0.2 // Trigger when 20% of the video card is visible
        });

        previewVideos.forEach(video => {
            activeObserver.observe(video);
        });
    }

    // Set up scroll re-trigger listener for when modal closes
    window.addEventListener('scroll', () => {
        if (!activeObserver) return;
        const modal = document.getElementById('media-modal') || document.getElementById('video-modal');
        const isModalActive = modal && modal.classList.contains('active');

        if (!isModalActive) {
            previewVideos.forEach(video => {
                // Let the observer re-check intersection status
                const rect = video.getBoundingClientRect();
                const inView = (
                    rect.top < window.innerHeight &&
                    rect.bottom > 0
                );
                if (inView) {
                    video.play().catch(() => {});
                } else {
                    video.pause();
                }
            });
        }
    });
}
