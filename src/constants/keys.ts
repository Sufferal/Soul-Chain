import type { Letter } from "@/types/keys";

export const KEYS: { [K in Letter]: string } = Object.fromEntries(
  Array.from({ length: 26 }, (_, i) => {
    const char = String.fromCharCode(65 + i) as Letter;
    return [char, char.toLowerCase()];
  })
) as { [K in Letter]: string };

export const KEY_DOWN = 'keydown';
export const BLOCKED_TAGS = ['INPUT', 'TEXTAREA', 'SELECT'];