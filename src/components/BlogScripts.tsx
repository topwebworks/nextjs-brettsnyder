'use client';

import { useEffect } from 'react';
import { initCategoryFilter } from '@/utils/categoryFilter';
import { initPagination } from '@/utils/pagination';
import { PAGINATION_CONFIGS } from '@/utils/paginationConfig';

export default function BlogScripts() {
  useEffect(() => {
    // Add a small delay to ensure DOM is fully ready
    const timer = setTimeout(() => {
      // Initialize both scripts when component mounts
      initCategoryFilter();
      initPagination(PAGINATION_CONFIGS.blog, '.blog-card');
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return null;
}
