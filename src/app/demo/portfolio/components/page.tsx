import type { Metadata } from 'next';
import ButtonDemo from './ButtonDemo';

export const metadata: Metadata = {
  title: 'Portfolio Button Components',
  robots: { index: false, follow: false },
};

export default function ComponentDemoPage() {
  return <ButtonDemo />;
}
