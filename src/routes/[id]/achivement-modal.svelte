<script>
	import Modal from '../../features/modal.svelte';
	import { achivementModal } from './stores';

	/** @type {import('./stores').IAchivementModalInfo} */
	let ach;

	achivementModal.subscribe((value) => {
		ach = value;
		console.log(value);
	});
	function test() {
		fetch('/api/pinata', {
			method: 'POST'
		});
	}
</script>

<Modal showModal={achivementModal} on:click>
	<div class="flex gap-2 items-center w-full px-2">
		<img src={ach?.icon} alt={ach?.displayName} class="w-10 h-10" />
		<div class="flex-1">
			<p class="font-bold">{ach?.displayName}</p>
			<p>{ach?.description}</p>
			<p>{new Date(ach?.unlocktime * 1000).toLocaleString()}</p>
			<button on:click={test} class="text-white">Test Pinata</button>
		</div>
	</div>
</Modal>
