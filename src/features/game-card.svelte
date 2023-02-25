<script>
	import Collapse from './collapse.svelte';

	/** @type {import('../interfaces/IOwnedGame').IOwnedGame} */
	export let game;

	const achivements = new Set(game.playesStats?.achievements?.map((item) => item.name));
	console.log(achivements);
</script>

<div
	class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
>
	<Collapse>
		<button slot="header" let:onToggle={toggle} on:click={toggle}>
			<img class="rounded-t-lg w-[600px]" src={game.header_image} alt="" />
			<div class="p-5">
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					{game.schema?.gameName}
				</h5>
			</div>
		</button>
		<div slot="content" class="grid gap-2 grid-cols-9 place-items-center pb-2">
			{#each game?.schema?.availableGameStats.achievements || [] as item}
				<img
					src={achivements.has(item.name) ? item.icon : item.icongray}
					alt={item.displayName}
					class="w-10 h-10"
				/>
			{/each}
		</div>
	</Collapse>
</div>
