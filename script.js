// Error wrapper for safe execution
function safeExecute(fn, context = 'unknown') {
  try {
    fn();
  } catch (error) {
    console.warn(`[${context}] Script error:`, error.message);
  }
}

// Smooth parallax scroll effect
safeExecute(() => {
  const bgLayer = document.querySelector('.bg-layer');
  
  if (!bgLayer) return;
  
  let ticking = false;
  let scrollY = 0;
  
  function updateParallax() {
    bgLayer.style.transform = `translateY(${scrollY * 0.5}px)`;
    ticking = false;
  }
  
  window.addEventListener('scroll', function() {
    scrollY = window.scrollY;
    
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
}, 'Parallax Effect');

// Intersection Observer for scroll-triggered animations
safeExecute(() => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.animation = 'slideInUp 0.8s ease-out forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all cards for scroll animation
  document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
  });
}, 'Scroll Animations');

// Smooth hover effects for interactive elements
safeExecute(() => {
  document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s ease';
    }, { passive: true });
  });
}, 'Hover Effects');

// Add scroll speed indicator (optional - shows scroll progress)
safeExecute(() => {
  window.addEventListener('scroll', function() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    
    document.documentElement.style.setProperty('--scroll-percent', scrollPercent + '%');
  }, { passive: true });
}, 'Scroll Progress');

// Prevent layout shift on images with proper loading
safeExecute(() => {
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
      this.style.opacity = '0.5';
      this.title = 'Image failed to load';
      console.warn(`Failed to load image: ${this.src}`);
    });
    
    // Add loading attribute for performance
    if (!this.hasAttribute('loading')) {
      this.setAttribute('loading', 'lazy');
    }
  });
}, 'Image Loading');

// Performance monitoring (optional)
if (window.performance && window.performance.timing) {
  window.addEventListener('load', function() {
    setTimeout(() => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log(`Page load time: ${pageLoadTime}ms`);
    }, 0);
  });
}

