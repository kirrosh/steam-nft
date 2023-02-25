<script>
	import Collapse from '../../features/collapse.svelte';
	import GameCard from '../../features/game-card.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<div class="flex-1 grid place-content-center ">
	<div class="flex gap-4">
		<img src={data.playerInfo.avatarfull} alt="avatar" class="w-40 h-40 " />
		<div class="flex flex-col gap-2">
			<h3 class="font-bold text-3xl text-white ">
				{data.playerInfo.personaname}
			</h3>
		</div>
	</div>
	<div class="flex flex-col gap-4 ">
		<h3 class="font-bold text-lg">Recent games</h3>
		{#each data.games as game}
			<GameCard {game} />
		{/each}
	</div>
</div>
