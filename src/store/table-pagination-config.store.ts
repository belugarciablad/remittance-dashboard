import { writable } from 'svelte/store';

export const currentPage = writable(1);
export const itemsPerPage = 5;