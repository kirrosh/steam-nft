import type { RequestHandler } from '@sveltejs/kit';
import { pinata } from 'src/features/pinata';
import { json } from '@sveltejs/kit';
import type { PinataPinResponse } from '@pinata/sdk';

export type PinataPostBody = {
	name: string;
	description: string;
	image: string;
	aattributes?: {
		trait_type: string;
		value: string;
	}[];
};

export const POST = (async ({ request }) => {
	const body: PinataPostBody = await request.json();
	const options = {
		pinataMetadata: {
			name: body.name,
			keyvalues: {
				customKey: 'customValue',
				customKey2: 'customValue2'
			}
		},
		pinataOptions: {
			cidVersion: 0
		}
	};

	const res: PinataPinResponse = await pinata.pinJSONToIPFS(body, options as any);

	return json(res);
	// do something
}) satisfies RequestHandler;
