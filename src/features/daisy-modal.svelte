<script>
	/** @type {string} */
	export let id;
</script>

<label for={id}><slot name="trigger" /></label>
<input type="checkbox" {id} class="modal-toggle" />
<label for={id} class="modal cursor-pointer">
	<label class="modal-box relative" for="">
		<h3 class="text-lg font-bold"><slot name="title" /></h3>
		<slot />
	</label>
</label>
