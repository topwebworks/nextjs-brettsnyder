"use client";

/**
 * Console Error Filter
 * 
 * Filters out common development warnings that don't affect functionality
 * but clutter the console during development.
 */
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const originalError = console.error;
  const originalWarn = console.warn;
  const originalLog = console.log;
  const originalInfo = console.info;

  // Helper to detect if a stack trace is from React DOM internals
  const isReactDOMInternalTrace = (trace: string): boolean => {
    return trace.includes('react-dom') && 
           (trace.includes('recursivelyTraverse') || 
            trace.includes('commitLayoutEffect') || 
            trace.includes('performWork') ||
            trace.includes('renderRoot'));
  };

  console.error = function(...args) {
    const message = args[0];
    
    if (typeof message === 'string') {
      // Filter out known non-critical errors - BROWSER EXTENSIONS ONLY
      const ignoredErrors = [
        // Browser extensions (safe to filter)
        'data-new-gr-c-s-check-loaded',
        'data-gr-ext-installed',
        // Browser interventions (beneficial optimizations)
        'Images loaded lazily and replaced with placeholders',
        '[Intervention] Images loaded lazily and replaced with placeholders',
        'Load events are deferred',
        'go.microsoft.com/fwlink',
      ];

      if (ignoredErrors.some(error => message.includes(error))) {
        // Show a cleaner message for filtered errors
        console.log('🧹 Development noise filtered (browser extension/optimization)');
        return;
      }
    }

    // Filter out React DOM development stack traces that are too verbose
    if (args.length > 1 && typeof args[1] === 'object' && args[1]?.stack?.includes('react-dom')) {
      const cleanedArgs = [args[0]]; // Keep only the main message
      originalError.apply(console, cleanedArgs);
      return;
    }

    // Show all other errors normally
    originalError.apply(console, args);
  };

  console.warn = function(...args) {
    const message = args[0];
    
    if (typeof message === 'string') {
      // Filter out known non-critical warnings - BROWSER INTERVENTIONS ONLY
      const ignoredWarnings = [
        // Browser interventions (beneficial optimizations)
        'Images loaded lazily',
        '[Intervention] Images loaded lazily and replaced with placeholders',
        'Load events are deferred',
        'go.microsoft.com/fwlink',
        // Performance warnings (handled by priority props)
        'was detected as the Largest Contentful Paint (LCP)',
        'Please add the "priority" property if this image is above the fold',
        // CSS positioning warnings (fixed at source)
        'Provided "static" should be one of absolute,fixed,relative',
        'has "fill" and parent element with invalid "position"',
        // Termly development noise (expected behavior)
        '[Termly] Termly ResourceBlocker is not the first script on the page',
        '[Termly] A script from \'www.googletagmanager.com\' might not be categorized correctly',
        'Termly ResourceBlocker is not the first script on the page',
        'A script from \'www.googletagmanager.com\' might not be categorized correctly'

      ];

      if (ignoredWarnings.some(warning => message.includes(warning))) {
        return; // Silently ignore these warnings
      }
    }

    // Filter out React DOM internal stack traces in warnings
    const hasReactStackTrace = args.some(arg => 
      typeof arg === 'string' && 
      isReactDOMInternalTrace(arg)
    );

    if (hasReactStackTrace) {
      // Show only the main warning message without the massive stack trace
      const mainMessage = args.find(arg => typeof arg === 'string' && !isReactDOMInternalTrace(arg));
      if (mainMessage) {
        originalWarn(mainMessage);
      }
      return;
    }

    // Show all other warnings normally
    originalWarn.apply(console, args);
  };

  console.info = function(...args) {
    const message = args[0];
    
    if (typeof message === 'string') {
      // Filter out development info messages
      const ignoredInfo = [
        'Server  Discovered project folders:',
        'Server  Discovered blog folders:',
        '🔧 Browser extension attribute handled:',
        'Initializing blog category filter',
        'Initializing category filter',
        // Edge compatibility messages
        '🔧 Edge fixes applied'
      ];

      if (ignoredInfo.some(info => message.includes(info))) {
        return; // Silently ignore these info messages
      }
    }

    // Show all other info normally
    originalInfo.apply(console, args);
  };

  // Also filter console.log to prevent VM script messages
  console.log = function(...args) {
    const message = args[0];
    
    if (typeof message === 'string') {
      // Filter out VM script initialization messages
      const ignoredLogs = [
        'Initializing category filter',
        'Found buttons:',
        'Initializing blog category filter',
        'Server  Discovered project folders:',
        'Server  Discovered blog folders:',
        '🔧 Browser extension attribute handled:',
        'data-new-gr-c-s-check-loaded',
        'data-gr-ext-installed',
        // Edge compatibility messages
        '🔧 Edge fixes applied',
        // Termly AutoBlocker informational messages
        '[Termly] AutoBlocker is enabled for this website',
        '[Termly] Installing AutoBlocker overrides',
        '[Termly] Region \'us\' has consent_mode set to \'opt_in\'',
        '[Termly] A script from \'www.googletagmanager.com\' might not be categorized correctly'
      ];

      if (ignoredLogs.some(log => message.includes(log))) {
        return; // Silently ignore these logs
      }
    }

    // Show all other logs normally
    originalLog.apply(console, args);
  };
}

export {};
