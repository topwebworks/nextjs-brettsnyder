// Category Filter Utility with Horizontal Overflow Controls
export function initCategoryFilter() {
  console.log('Initializing enhanced category filter...');
  
  // Find the filter container and wrap it with controls
  const filterContainer = document.querySelector('.category-filters-container');
  if (!filterContainer) {
    console.warn('Category filters container not found');
    return;
  }
  
  // Create the enhanced filter wrapper
  const wrapper = document.createElement('div');
  wrapper.className = 'category-filter-wrapper';
  wrapper.style.cssText = `
    position: relative;
    display: flex;
    align-items: center;
    gap: 1rem;
    max-width: 100%;
  `;
  
  // Create left arrow
  const leftArrow = document.createElement('button');
  leftArrow.className = 'category-scroll-arrow category-scroll-left';
  leftArrow.innerHTML = '‹';
  leftArrow.style.cssText = `
    background: var(--glass-bg-medium);
    border: 1px solid var(--glass-border-primary);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    color: var(--text-primary);
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
    display: none;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    z-index: 10;
    flex-shrink: 0;
  `;
  
  // Create scrollable container
  const scrollContainer = document.createElement('div');
  scrollContainer.className = 'category-scroll-container';
  scrollContainer.style.cssText = `
    flex: 1;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-behavior: smooth;
    scrollbar-width: none;
    -ms-overflow-style: none;
  `;
  
  // Hide scrollbar for webkit browsers
  const style = document.createElement('style');
  style.textContent = `
    .category-scroll-container::-webkit-scrollbar {
      display: none;
    }
  `;
  document.head.appendChild(style);
  
  // Create right arrow
  const rightArrow = document.createElement('button');
  rightArrow.className = 'category-scroll-arrow category-scroll-right';
  rightArrow.innerHTML = '›';
  rightArrow.style.cssText = leftArrow.style.cssText; // Same styling
  
  // Move the existing filter buttons container into the scroll container
  const existingFilters = filterContainer.querySelector('.category-buttons-row');
  if (existingFilters) {
    // Update the existing row to not wrap and have proper spacing
    (existingFilters as HTMLElement).style.cssText = `
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: nowrap;
      min-width: max-content;
      padding: 0.5rem 0;
    `;
    scrollContainer.appendChild(existingFilters);
  }
  
  // Assemble the wrapper
  wrapper.appendChild(leftArrow);
  wrapper.appendChild(scrollContainer);
  wrapper.appendChild(rightArrow);
  
  // Replace the original container
  filterContainer.parentNode?.insertBefore(wrapper, filterContainer);
  filterContainer.remove();
  
  // Scroll functionality
  const scrollAmount = 200;
  
  leftArrow.addEventListener('click', () => {
    scrollContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });
  
  rightArrow.addEventListener('click', () => {
    scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
  
  // Function to update arrow visibility
  function updateArrows() {
    const canScrollLeft = scrollContainer.scrollLeft > 0;
    const canScrollRight = scrollContainer.scrollLeft < (scrollContainer.scrollWidth - scrollContainer.clientWidth);
    const hasOverflow = scrollContainer.scrollWidth > scrollContainer.clientWidth;
    
    leftArrow.style.display = hasOverflow && canScrollLeft ? 'flex' : 'none';
    rightArrow.style.display = hasOverflow && canScrollRight ? 'flex' : 'none';
  }
  
  // Update arrows on scroll and resize
  scrollContainer.addEventListener('scroll', updateArrows);
  window.addEventListener('resize', updateArrows);
  
  // Touch support for mobile scrolling
  let isDown = false;
  let startX = 0;
  let scrollStart = 0;
  
  scrollContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - scrollContainer.offsetLeft;
    scrollStart = scrollContainer.scrollLeft;
  });
  
  scrollContainer.addEventListener('mouseleave', () => {
    isDown = false;
  });
  
  scrollContainer.addEventListener('mouseup', () => {
    isDown = false;
  });
  
  scrollContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollContainer.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainer.scrollLeft = scrollStart - walk;
  });
  
  // Initial arrow state
  setTimeout(updateArrows, 100);
  
  // Now initialize the original filter functionality
  const buttons = document.querySelectorAll('.category-filter-btn');
  console.log('Found filter buttons:', buttons.length);
  
  buttons.forEach(function(btn) {
    btn.addEventListener('click', function(this: HTMLElement) {
      console.log('Filter button clicked:', this.textContent);
      const filterCategory = this.textContent?.trim() || '';
      
      // Update button styles
      buttons.forEach(function(b) {
        const isActive = b === btn;
        (b as HTMLElement).style.background = isActive ? 'var(--glass-bg-medium)' : 'var(--glass-bg-subtle)';
        (b as HTMLElement).style.borderColor = isActive ? 'var(--glass-border-primary)' : 'var(--glass-border-subtle)';
        (b as HTMLElement).style.color = isActive ? 'var(--text-primary)' : 'var(--text-secondary)';
      });
      
      // Filter items based on exact category match
      const cards = document.querySelectorAll('.project-card, .blog-card');
      console.log('Filtering cards for category:', filterCategory);
      console.log('Found cards:', cards.length);
      
      cards.forEach(function(card) {
        const htmlCard = card as HTMLElement;
        if (filterCategory === 'All') {
          // For "All" filter, just remove filtered-out class
          // Don't change display - let pagination system handle visibility
          htmlCard.style.opacity = '1';
          htmlCard.style.transform = 'scale(1)';
          htmlCard.classList.remove('filtered-out');
          // Important: Don't set display here - pagination controls this
          console.log('Showing all cards - pagination will control visibility');
        } else {
          // Get the category from the card's data attribute
          const cardCategory = htmlCard.getAttribute('data-category');
          console.log('Card category:', cardCategory, 'Filter category:', filterCategory);
          
          const hasMatch = cardCategory === filterCategory;
          console.log('Match result:', hasMatch);
          
          if (hasMatch) {
            htmlCard.style.display = 'flex';
            htmlCard.style.opacity = '1';
            htmlCard.style.transform = 'scale(1)';
            htmlCard.classList.remove('filtered-out');
          } else {
            htmlCard.style.opacity = '0';
            htmlCard.style.transform = 'scale(0.9)';
            htmlCard.classList.add('filtered-out');
            setTimeout(() => {
              htmlCard.style.display = 'none';
            }, 150); // Reduced from 300ms to 150ms for faster filtering
          }
        }
      });
      
      // Log final visible cards count
      const visibleCards = document.querySelectorAll('.project-card[style*="flex"], .blog-card[style*="flex"]');
      console.log('Visible cards after filter:', visibleCards.length);
    });
  });
}
