/**
 * Performance monitoring utilities
 */

// Web Vitals monitoring
export const measureWebVitals = () => {
  if (typeof window === 'undefined') return;

  // Measure First Contentful Paint
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.name === 'first-contentful-paint') {
        console.log('FCP:', entry.startTime);
      }
    }
  });
  
  try {
    observer.observe({ entryTypes: ['paint'] });
  } catch (e) {
    // Fallback for browsers that don't support this
  }
};

// Bundle size monitoring
export const logBundleSize = () => {
  if (typeof navigator === 'undefined' || !navigator.connection) return;
  
  const connection = navigator.connection;
  console.log('Network:', {
    effectiveType: connection.effectiveType,
    downlink: connection.downlink,
    rtt: connection.rtt
  });
};

// Memory usage monitoring (development only)
export const logMemoryUsage = () => {
  if (process.env.NODE_ENV === 'development' && performance.memory) {
    console.log('Memory:', {
      used: Math.round(performance.memory.usedJSHeapSize / 1048576) + 'MB',
      total: Math.round(performance.memory.totalJSHeapSize / 1048576) + 'MB',
      limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576) + 'MB'
    });
  }
};

// Animation frame monitoring
export const monitorAnimationFrames = () => {
  if (process.env.NODE_ENV === 'development') {
    let frameCount = 0;
    let lastTime = performance.now();
    
    const countFrames = (currentTime) => {
      frameCount++;
      
      if (currentTime - lastTime >= 1000) {
        console.log('FPS:', frameCount);
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(countFrames);
    };
    
    requestAnimationFrame(countFrames);
  }
};

// Initialize all monitoring
export const initPerformanceMonitoring = () => {
  measureWebVitals();
  logBundleSize();
  
  // Log memory usage every 30 seconds in development
  if (process.env.NODE_ENV === 'development') {
    setInterval(logMemoryUsage, 30000);
    monitorAnimationFrames();
  }
}; 