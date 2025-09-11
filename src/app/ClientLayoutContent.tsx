"use client";

import { useTheme } from "../contexts/ThemeContext";

export default function ClientLayoutContent({ children }: { children: React.ReactNode }) {
  const { mounted } = useTheme();
  
  // Don't render children until theme is ready to prevent flash
  if (!mounted) {
    return null;
  }
  
  return <>{children}</>;
}
