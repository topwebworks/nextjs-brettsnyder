// Pagination Utility
import { PaginationConfig } from './paginationConfig';

export function initPagination(config: PaginationConfig, itemSelector: string = '.pagination-item') {
  // Look for the button inside the show-more-projects div (or blog equivalent)
  const showMoreDiv = document.getElementById('show-more-projects') || document.getElementById('show-more-blogs');
  const showMoreBtn = showMoreDiv?.querySelector('button') as HTMLButtonElement;
  const paginationItems = document.querySelectorAll(itemSelector);
  
  if (!showMoreBtn || !showMoreDiv) {
    return;
  }
  
  let currentlyVisible = config.initialCount;
  
  // Function to get currently visible (non-filtered) items
  function getVisibleItems() {
    return Array.from(paginationItems).filter(item => {
      const htmlItem = item as HTMLElement;
      return htmlItem.style.display !== 'none' && !htmlItem.classList.contains('filtered-out');
    });
  }
  
  // Function to update pagination display
  function updatePagination() {
    const visibleItems = getVisibleItems();
    const totalVisible = visibleItems.length;
    

    
    // Hide items beyond currentlyVisible count
    visibleItems.forEach((item, index) => {
      const htmlItem = item as HTMLElement;
      if (index >= currentlyVisible) {
        htmlItem.classList.add('hidden');
      } else {
        htmlItem.classList.remove('hidden');
      }
    });
    
    // Show/hide the button based on remaining items
    // Only show button if there are genuinely more items to show
    const shouldShowButton = totalVisible > currentlyVisible;
    if (showMoreDiv) {
      showMoreDiv.style.display = shouldShowButton ? 'flex' : 'none';
    }
    

  }
  
  // Initialize pagination on page load
  updatePagination();
  
  // Show More button click handler
  showMoreBtn.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('Show more button clicked');
    
    const visibleItems = getVisibleItems();
    const remainingItems = visibleItems.length - currentlyVisible;
    
    if (remainingItems <= 0) {
      console.log('No more items to show');
      return;
    }
    
    // Add loading state without changing text content (preserve icon)
    showMoreBtn.disabled = true;
    showMoreBtn.classList.add('loading');
    
    // Brief loading state for UX
    setTimeout(function() {
      const prevVisible = currentlyVisible;
      currentlyVisible += config.loadMoreCount;
      console.log('Increased visible count from', prevVisible, 'to', currentlyVisible);
      console.log('Remaining items after increase:', Math.max(0, visibleItems.length - currentlyVisible));
      
      updatePagination();
      
      // Remove loading state
      showMoreBtn.disabled = false;
      showMoreBtn.classList.remove('loading');
    }, 150);
  });
  
  // Listen for filter changes and reset pagination
  const filterButtons = document.querySelectorAll('.category-filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function(this: HTMLElement) {
      console.log('Filter changed, resetting pagination');
      currentlyVisible = config.initialCount; // Reset to initial count
      
      // For "All" filter, we need to reset display states first
      const filterCategory = this.textContent?.trim() || '';
      if (filterCategory === 'All') {
        console.log('All filter clicked - resetting display states');
        const allItems = document.querySelectorAll(itemSelector);
        allItems.forEach(item => {
          const htmlItem = item as HTMLElement;
          // Reset display for all items, let pagination handle visibility
          htmlItem.style.display = 'flex';
        });
      }
      
      setTimeout(() => {
        console.log('Applying pagination after filter change');
        updatePagination(); // Update pagination after filter has been applied
      }, 200); // Wait for filter animation to complete
    });
  });
}
