'use client';

import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

/**
 * A utility for dynamically importing components
 * @param importFn The import function that returns the component
 * @param options Optional configuration
 * @returns Dynamically imported component
 */
export function createDynamicComponent<T>(
  importFn: () => Promise<{ default: ComponentType<T> }>,
  options?: {
    ssr?: boolean;
  }
) {
  return dynamic(importFn, {
    loading: () => null,
    ssr: options?.ssr ?? false,
  });
} 