'use client';

import { useEffect } from 'react';
import { initCategoryFilter } from '@/utils/categoryFilter';
import { initPagination } from '@/utils/pagination';
import { PAGINATION_CONFIGS } from '@/utils/paginationConfig';

export default function ProjectScripts() {
  useEffect(() => {
    // Initialize both scripts when component mounts
    initCategoryFilter();
    initPagination(PAGINATION_CONFIGS.projects, '.project-card');
  }, []);

  return null; // This component doesn't render anything
}
