import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isLocalhost(req: Request) {
  return req.headers.get('host')?.startsWith('localhost');
}

export function isClientLocalhost() {
  return (
    window.location.hostname === 'localhost' && typeof window !== 'undefined'
  );
}
