import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

/**
 * A utility for dynamically importing components
 * @param componentImportFn The import function that returns the component
 * @param ssr Whether to render the component on the server side
 * @returns Dynamically imported component
 */
export function createDynamicComponent<T>(
  componentImportFn: () => Promise<{ default: ComponentType<T> }>,
  ssr = false
) {
  return dynamic(componentImportFn, {
    ssr,
  });
} 