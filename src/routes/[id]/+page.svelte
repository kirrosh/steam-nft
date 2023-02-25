<script>
	import Collapse from '../../features/collapse.svelte';

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
							<img src={item.icon} alt={item.displayName} class="w-10 h-10" />
						{/each}
					</div>
				</Collapse>
			</div>
		{/each}
	</div>
</div>
