import { writable } from 'svelte/store';

export type IAchivementModalInfo = {
	name: string;
	displayName: string;
	description: string;
	icon: string;
	unlocktime: number;
};

export const achivementModal = writable<IAchivementModalInfo>();
