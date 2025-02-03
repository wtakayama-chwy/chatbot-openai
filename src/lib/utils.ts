import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isLocalhost(req: Request) {
  return req.headers.get('host')?.startsWith('localhost');
}
