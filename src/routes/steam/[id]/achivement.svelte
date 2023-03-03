<script>
	import { ofetch } from 'ofetch';
	import DaisyModal from 'src/features/daisy-modal.svelte';
	import { safeMint } from 'src/features/wagmi/game-achievement-api';
	import { metamaskAccount } from 'src/features/wagmi/stores';

	export const GATEAWAY_URL = 'https://gateway.pinata.cloud/ipfs/';

	/** @type {import('./types').IAchivementModalInfo} */
	export let ach;

	/** @type {`0x${string}` | undefined} */
	let address;

	metamaskAccount.subscribe((value) => {
		address = value;
	});

	const mint = async () => {
		const res = await ofetch('/api/pinata', {
			method: 'POST',
			body: {
				name: ach.displayName,
				description: ach.description,
				image: ach.icon,
				attributes: [
					{
						display_type: 'date',
						trait_type: 'Unlock time',
						value: ach.unlocktime
					}
				]
			}
		});

		if (address) {
			const mintRes = await safeMint({
				address,
				URI: `${GATEAWAY_URL}/${res.IpfsHash}`
			});
			console.log(mintRes);
		}
	};
</script>

<div class="card card-side bg-base-100 shadow-xl">
	<figure><img src={ach.icon} alt={ach.displayName} class="w-36 h-36" /></figure>
	<div class="card-body">
		<h2 class="card-title">{ach.displayName}</h2>
		<p>{ach.description}</p>
		<p>{new Date(ach.unlocktime * 1000).toLocaleString()}</p>
		<button on:click={mint} class="btn">Mint</button>
	</div>
</div>
