<script>
	/** @type {import('svelte/store').Writable<any | undefined>} */
	export let showModal; // Writable<any | undefined>
	/** @type {HTMLDialogElement} */
	let dialog; // HTMLDialogElement

	/** @type {Boolean}*/
	let isShown;
	showModal.subscribe((value) => {
		isShown = !!value;
	});

	$: if (dialog && isShown) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => showModal.update(() => undefined)}
	on:click|self={() => dialog.close()}
>
	<div on:click|stopPropagation>
		<header class="flex justify-between">
			<slot name="title" />
			<button on:click={() => dialog.close()}>X</button>
		</header>
		<hr />
		<slot />
		<hr />
		<!-- svelte-ignore a11y-autofocus -->
		<!-- <button autofocus on:click={() => dialog.close()}>close modal</button> -->
	</div>
</dialog>

<style>
	dialog {
		max-width: 32em;
		border-radius: 0.2em;
		border: none;
		padding: 0;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	}
</style>
