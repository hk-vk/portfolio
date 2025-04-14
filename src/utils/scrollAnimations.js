/**
 * Handles scroll-triggered animations by adding visibility classes
 * to elements with animation classes when they enter the viewport.
 */
export const initScrollAnimations = () => {
  // Elements to animate
  const animatedElements = document.querySelectorAll(
    '.appear-animation, .slide-in-left, .slide-in-right, .scale-in, .stagger-item'
  );
  
  // Options for the Intersection Observer
  const observerOptions = {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.15 // trigger when 15% of the element is visible
  };
  
  // Callback for when elements intersect viewport
  const intersectionCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add visible class to trigger animation
        entry.target.classList.add('is-visible');
        
        // Unobserve after animation is triggered (optional)
        // observer.unobserve(entry.target);
      } else {
        // Optional: Remove the class when element is out of view
        // for repeat animations when scrolling up and down
        // entry.target.classList.remove('is-visible');
      }
    });
  };
  
  // Create the observer
  const observer = new IntersectionObserver(intersectionCallback, observerOptions);
  
  // Observe all elements
  animatedElements.forEach(element => {
    observer.observe(element);
  });
  
  // Return a cleanup function to disconnect observer when needed
  return () => {
    if (observer) {
      observer.disconnect();
    }
  };
};

export default initScrollAnimations; 