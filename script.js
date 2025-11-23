// Smooth parallax scroll effect
document.addEventListener('DOMContentLoaded', function() {
  const bgLayer = document.querySelector('.bg-layer');
  
  if (!bgLayer) return;
  
  window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;
    
    // Subtle parallax effect for the animated background layer
    bgLayer.style.transform = `translateY(${scrollY * 0.5}px)`;
  }, { passive: true });
});

// Intersection Observer for scroll-triggered animations
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

// Smooth hover effects for interactive elements
document.querySelectorAll('a, button').forEach(element => {
  element.addEventListener('mouseenter', function() {
    this.style.transition = 'all 0.3s ease';
  });
});

// Add scroll speed indicator (optional - shows scroll progress)
window.addEventListener('scroll', function() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  
  // Can be used for progress bar or other scroll indicators
  document.documentElement.style.setProperty('--scroll-percent', scrollPercent + '%');
}, { passive: true });
