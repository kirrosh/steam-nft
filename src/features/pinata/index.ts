import pinataSDK from '@pinata/sdk';

export const pinata = new pinataSDK(
	import.meta.env.VITE_PINATA_API_KEY,
	import.meta.env.VITE_PINATA_SECRET_API
);
