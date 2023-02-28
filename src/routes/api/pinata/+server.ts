import type { RequestHandler } from '@sveltejs/kit';
import { pinata } from '../../../features/pinata';
import { json } from '@sveltejs/kit';

export const POST = (async () => {
	const body = {
		title: 'Weapon of Fate',
		description: 'Clear an escape attempt with a hidden Weapon Aspect',
		image:
			'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/1145360/06ae59ceaedac2b66b2d7ed8da68d64838c4bb82.jpg'
		// unlocktime:
		// platform: 'Steam',
		// steamId: '76561198000000000',
	};
	const options = {
		pinataMetadata: {
			name: 'SteamTest',
			keyvalues: {
				customKey: 'customValue',
				customKey2: 'customValue2'
			}
		},
		pinataOptions: {
			cidVersion: 0
		}
	};

	const res = await pinata.pinJSONToIPFS(body, options as any);

	return json(res);
	// do something
}) satisfies RequestHandler;
