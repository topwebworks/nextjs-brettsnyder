import { Metadata } from 'next';
import ToolsPage from './ToolsPageClient';

export const metadata: Metadata = {
  title: 'Tools',
  description:
    'The software, hardware, and workflow tools Brett Snyder uses for development, design, and productivity.',
  openGraph: {
    title: 'Tools | Brett Snyder',
    description:
      'The software, hardware, and workflow tools Brett Snyder uses for development, design, and productivity.',
    type: 'website',
  },
};

export default function Page() {
  return <ToolsPage />;
}
