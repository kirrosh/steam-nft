<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<div class="h-screen w-screen grid place-content-center">
	<h1>Welcome to SvelteKit</h1>
	<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
	<p>Data from the server: {data}</p>
</div>
