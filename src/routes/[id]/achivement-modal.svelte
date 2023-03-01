<script>
	import { ofetch } from 'ofetch';
	import Modal from '../../features/modal.svelte';
	import { achivementModal } from './stores';

	/** @type {import('./stores').IAchivementModalInfo} */
	let ach;

	achivementModal.subscribe((value) => {
		ach = value;
		console.log(value);
	});
	function test() {
		ofetch('/api/pinata', {
			method: 'POST',
			body: {
				name: ach.displayName,
				description: ach.description,
				image: ach.icon,
				attributes: [
					{
						trait_type: 'Unlock time',
						value: new Date(ach.unlocktime * 1000).toLocaleString()
					}
				]
			}
		});
	}
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
