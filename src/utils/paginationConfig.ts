// Pagination Configuration
export interface PaginationConfig {
  initialCount: number;    // How many items to show initially
  loadMoreCount: number;   // How many items to load when "Show More" is clicked
}

// Default configurations for different page types
export const PAGINATION_CONFIGS = {
  projects: {
    initialCount: 6,
    loadMoreCount: 6
  } as PaginationConfig,
  
  blog: {
    initialCount: 6,
    loadMoreCount: 6
  } as PaginationConfig
};

// Get total count of items (visible after filtering)
export function getTotalItemsCount(selector: string): number {
  const items = document.querySelectorAll(selector);
  return Array.from(items).filter(item => {
    const htmlItem = item as HTMLElement;
    return htmlItem.style.display !== 'none' && !htmlItem.classList.contains('filtered-out');
  }).length;
}
