import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export function initAnimations() {
  // Register GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // --- 1. Smooth Scroll Setup (Lenis) ---
  const lenis = new Lenis({
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Integrate Lenis with GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // --- 1.1 Handle Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        lenis.scrollTo(targetElement, {
          offset: 0,
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      }
    });
  });

  // --- 2. Custom Cursor ---
  const cursor = document.getElementById('custom-cursor');
  if (cursor) {
    const hoverElements = document.querySelectorAll('.cursor-hover, a, button');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let cursorX = mouseX;
    let cursorY = mouseY;

    const setCursorX = gsap.quickSetter(cursor, "x", "px");
    const setCursorY = gsap.quickSetter(cursor, "y", "px");

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    gsap.ticker.add(() => {
      const dt = 1.0 - Math.pow(1.0 - 0.15, gsap.ticker.deltaRatio());
      cursorX += (mouseX - cursorX) * dt;
      cursorY += (mouseY - cursorY) * dt;
      setCursorX(cursorX);
      setCursorY(cursorY);
    });

    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
    });

    if (window.matchMedia("(pointer: coarse)").matches) {
      cursor.style.display = 'none';
      document.body.style.cursor = 'auto';
    }
  }

  // --- 3. Custom Text Splitter Utility ---
  function splitTextIntoSpans(selector, type = 'chars') {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      const text = el.innerText;
      el.innerHTML = '';

      if (type === 'chars') {
        const words = text.split(' ');
        words.forEach((word, wordIndex) => {
          const wordSpan = document.createElement('span');
          wordSpan.className = 'word';
          const chars = word.split('');
          chars.forEach(char => {
            const charSpan = document.createElement('span');
            charSpan.className = 'char';
            charSpan.innerHTML = char === ' ' ? '&nbsp;' : char;
            wordSpan.appendChild(charSpan);
          });
          el.appendChild(wordSpan);
          if (wordIndex < words.length - 1) {
            el.appendChild(document.createTextNode(' '));
          }
        });
      } else if (type === 'lines') {
        const inner = document.createElement('span');
        inner.className = 'line-inner';
        inner.innerHTML = text;
        el.innerHTML = '';
        el.className += ' line-wrapper';
        el.appendChild(inner);
      }
    });
  }

  splitTextIntoSpans('.hero-title', 'chars');
  splitTextIntoSpans('.split-words', 'chars');
  splitTextIntoSpans('.split-words-cta', 'chars');

  document.querySelectorAll('.split-lines p, .split-lines-cta').forEach(p => {
    const text = p.innerHTML;
    p.innerHTML = `<span class="line-wrapper block"><span class="line-inner block">${text}</span></span>`;
  });

  // --- 4. Loading & Hero Animations ---
  const tl = gsap.timeline();

  tl.to('.hero-img', {
    opacity: 1,
    filter: 'blur(0px) brightness(1)',
    scale: 1,
    duration: 2.5,
    ease: 'power3.out'
  })
  .to('.hero-title .char', {
    y: '0%',
    opacity: 1,
    stagger: 0.03,
    duration: 1.5,
    ease: 'power4.out'
  }, "-=1.5")
  .to('.hero-sub', {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: 'power2.out'
  }, "-=1")
  .to('.hero-scroll', {
    opacity: 1,
    duration: 1,
  }, "-=0.5");

  // Hero Parallax
  gsap.to('.hero-img', {
    yPercent: 30,
    ease: "none",
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  // Refresh ScrollTrigger after hero animation or initial load
  ScrollTrigger.refresh();

  // --- 5. ScrollTrigger Animations ---

  // About Section
  const aboutTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#about",
      start: "top 70%",
      once: true
    }
  });

  aboutTl.to('.reveal-mask', {
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    scale: 1,
    duration: 2,
    ease: "power3.inOut"
  })
  .to('#about .char', {
    y: '0%',
    opacity: 1,
    stagger: 0.02,
    duration: 1.2,
    ease: "power3.out"
  }, "-=1.5")
  .to('#about .line-inner', {
    y: '0%',
    opacity: 1,
    stagger: 0.15,
    duration: 1.5,
    ease: "power3.out"
  }, "-=1")
  .to('#about .fade-up', {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power2.out"
  }, "-=1");

  gsap.set('.fade-up', { y: 30, opacity: 0 });
  gsap.set('.service-card', { y: 30, opacity: 0 });

  // Portfolio Section
  gsap.to('#portfolio .char', {
    scrollTrigger: {
      trigger: "#portfolio",
      start: "top 75%",
    },
    y: '0%',
    opacity: 1,
    stagger: 0.03,
    duration: 1,
    ease: "power3.out"
  });

  gsap.to('#portfolio .fade-up', {
    scrollTrigger: {
      trigger: "#portfolio",
      start: "top 75%",
    },
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power2.out"
  });

  const portfolioItems = document.querySelectorAll('.portfolio-item img');
  portfolioItems.forEach((img, i) => {
    gsap.set(img, { filter: 'blur(10px)', scale: 1.1, opacity: 0 });

    gsap.to(img, {
      scrollTrigger: {
        trigger: img.parentElement,
        start: "top 85%",
      },
      filter: 'blur(0px)',
      scale: 1,
      opacity: 1,
      duration: 1.5,
      ease: "power3.out",
      delay: i * 0.2
    });
  });

  // Services Section
  // Services & Pricing Section Titles
  gsap.to('#services .char, #pricing .char', {
    scrollTrigger: {
      trigger: "#services, #pricing",
      start: "top 75%",
    },
    y: '0%',
    opacity: 1,
    stagger: 0.02,
    duration: 1,
    ease: "power3.out"
  });

  gsap.to('#services .fade-up, #pricing .fade-up', {
    scrollTrigger: {
      trigger: "#services, #pricing",
      start: "top 75%",
    },
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power2.out"
  });

  // Service & Pricing Cards Batch Animation
  ScrollTrigger.batch(".service-card, .pricing-card", {
    onEnter: batch => gsap.to(batch, {
      opacity: 1, 
      y: 0, 
      stagger: 0.1, 
      duration: 0.8,
      ease: "power2.out",
      overwrite: true 
    }),
    start: "top 90%",
    once: true
  });

  // Final Refresh to catch everything
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });

  // CTA Section
  const ctaTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#book",
      start: "top 60%",
    }
  });

  ctaTl.to('.split-words-cta .char', {
    y: '0%',
    opacity: 1,
    stagger: 0.03,
    duration: 1.2,
    ease: "power3.out"
  })
  .to('.split-lines-cta .line-inner', {
    y: '0%',
    opacity: 1,
    duration: 1.5,
    ease: "power3.out"
  }, "-=0.8");

  // --- 6. Lightbox Logic ---
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('lightbox-close');
  const portfolioTriggers = document.querySelectorAll('.portfolio-item');

  portfolioTriggers.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-src');
      if (lightboxImg) lightboxImg.src = src;

      if (lightbox) {
        lightbox.style.display = 'flex';
        setTimeout(() => {
          lightbox.classList.add('active');
          lenis.stop();

          gsap.to(lightboxImg, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.2
          });
        }, 10);
      }
    });
  });

  const closeLightbox = () => {
    gsap.to(lightboxImg, {
      opacity: 0,
      scale: 0.95,
      duration: 0.4,
      ease: "power2.in"
    });

    if (lightbox) lightbox.classList.remove('active');
    setTimeout(() => {
      if (lightbox) lightbox.style.display = 'none';
      if (lightboxImg) lightboxImg.src = '';
      lenis.start();
    }, 800);
  };

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (lightbox) lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) closeLightbox();
  });
  // --- 7. Smooth Wave Speed Logic ---
  const waveInners = document.querySelectorAll('.wave-inner');
  waveInners.forEach(inner => {
    const waveAnimation = gsap.to(inner, {
      xPercent: -50,
      duration: 3,
      repeat: -1,
      ease: "none"
    });

    const container = inner.closest('.wave-btn-container');
    if (container) {
      container.addEventListener('mouseenter', () => {
        gsap.to(waveAnimation, { timeScale: 2, duration: 1, ease: "power2.out" });
        gsap.to(inner, { height: '50%', duration: 1, ease: "power2.out" });
      });
      container.addEventListener('mouseleave', () => {
        gsap.to(waveAnimation, { timeScale: 1, duration: 1, ease: "power2.inOut" });
        gsap.to(inner, { height: '40%', duration: 1, ease: "power2.inOut" });
      });
    }
  });
}
