<script>
	import Collapse from 'src/features/collapse.svelte';
	import { achivementModal } from './stores';

	/** @type {import('src/interfaces/IOwnedGame').IOwnedGame} */
	export let game;

	const achivementsData = new Map(
		game.schema?.availableGameStats?.achievements?.map((item) => [item.name, item])
	);

	const lastAchivements = game.achivements
		?.filter((item) => item.unlocktime > 0)
		.sort((a, b) => b.unlocktime - a.unlocktime);

	const lastAchivementsSet = new Set(lastAchivements?.map((item) => item.apiname));

	const otherAchivements = game.achivements
		?.filter((item) => !lastAchivementsSet.has(item.apiname))
		.sort((a, b) => b.unlocktime - a.unlocktime);

	// @ts-ignore
	const onAchivementClick = (item) => {
		const ach = achivementsData.get(item.apiname);
		if (!ach) {
			return;
		}
		achivementModal.set({
			unlocktime: item.unlocktime,
			description: ach.description,
			name: ach.name,
			displayName: ach.displayName,
			icon: ach.icon
		});
	};
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
		<div slot="content" class="flex flex-col gap-2 pb-2 text-white">
			{#each lastAchivements || [] as item}
				<button
					on:click={() => onAchivementClick(item)}
					class="flex gap-2 items-center w-full px-2"
				>
					<img
						src={achivementsData.get(item.apiname)?.icon}
						alt={achivementsData.get(item.apiname)?.displayName}
						class="w-10 h-10"
					/>
					<div class="flex-1">
						<div class="flex justify-between">
							<p class="font-bold">{achivementsData.get(item.apiname)?.displayName}</p>
							<p>{new Date(item.unlocktime * 1000).toLocaleString()}</p>
						</div>
						<p>{achivementsData.get(item.apiname)?.description}</p>
					</div>
				</button>
			{/each}
			{#each otherAchivements || [] as item}
				<div class="flex gap-2 px-2">
					<img
						src={achivementsData.get(item.apiname)?.icongray}
						alt={achivementsData.get(item.apiname)?.displayName}
						class="w-10 h-10"
					/>
					<div>
						<p class="font-bold">{achivementsData.get(item.apiname)?.displayName}</p>
						<p>{achivementsData.get(item.apiname)?.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</Collapse>
</div>
