<script>
	import { ofetch } from 'ofetch';
	import Modal from 'src/features/modal.svelte';
	// import { GATEAWAY_URL } from 'src/features/pinata';
	import { safeMint } from 'src/features/wagmi/game-achievement-api';
	import { metamaskAccount } from 'src/features/wagmi/stores';
	import { achivementModal } from './stores';

	export const GATEAWAY_URL = 'https://gateway.pinata.cloud/ipfs/';

	/** @type {import('./stores').IAchivementModalInfo} */
	let ach;
	/** @type {`0x${string}` | undefined} */
	let address;

	metamaskAccount.subscribe((value) => {
		address = value;
	});

	achivementModal.subscribe((value) => {
		ach = value;
	});
	const test = async () => {
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

<Modal showModal={achivementModal} on:click>
	<p slot="title">{ach?.displayName}</p>
	<div class="flex gap-2 items-center w-full px-2">
		<img src={ach?.icon} alt={ach?.displayName} class="w-10 h-10" />
		<div class="flex-1">
			<p class="font-bold">{ach?.displayName}</p>
			<p>{ach?.description}</p>
			<p>{new Date(ach?.unlocktime * 1000).toLocaleString()}</p>
			<button on:click={test}>Mint</button>
		</div>
	</div>
</Modal>
