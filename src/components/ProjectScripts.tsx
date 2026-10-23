'use client';

import { useEffect } from 'react';
import { initCategoryFilter } from '@/utils/categoryFilter';
import { initPagination } from '@/utils/pagination';
import { PAGINATION_CONFIGS } from '@/utils/paginationConfig';

export default function ProjectScripts() {
  useEffect(() => {
    let cleanupFilter: (() => void) | undefined;

    // Same delay as BlogScripts; also keeps dev Strict Mode from initializing twice
    const timer = setTimeout(() => {
      cleanupFilter = initCategoryFilter();
      initPagination(PAGINATION_CONFIGS.projects, '.project-card');
    }, 100);

    return () => {
      clearTimeout(timer);
      cleanupFilter?.();
    };
  }, []);

  return null; // This component doesn't render anything
}
