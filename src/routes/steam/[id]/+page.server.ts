import { ofetch } from 'ofetch';
import {
	STEAM_URL_GetPlayerAchievements,
	STEAM_URL_GetPlayerSummaries,
	STEAM_URL_GetRecentlyPlayedGames,
	STEAM_URL_GetSchemaForGame,
	STEAM_URL_GetUserStatsForGame
} from 'src/constants/url';
import type { IGameSchema } from 'src/interfaces/IGameSchema';
import type { IOwnedGame } from 'src/interfaces/IOwnedGame';
import type { IPlayerInfo } from 'src/interfaces/IPlayerInfo';
import type { IPlayerStats } from 'src/interfaces/IPlayerStats';

export async function load({ params }: { params: { id: string } }) {
	const data = await ofetch(STEAM_URL_GetPlayerSummaries, {
		params: {
			key: import.meta.env.VITE_STEAM_API_KEY,
			steamids: params.id
		}
	});

	const recentGames = await ofetch(STEAM_URL_GetRecentlyPlayedGames, {
		params: {
			key: import.meta.env.VITE_STEAM_API_KEY,
			steamid: params.id,
			count: 10
		}
	});

	const games: IOwnedGame[] = recentGames.response.games;

	for (const game of games) {
		let gameData: { playerstats?: IPlayerStats } = {};
		let schemaForGame: { game?: IGameSchema } = {};
		let achivements: { playerstats?: { achievements: any[] } } = {};
		try {
			gameData = await ofetch(STEAM_URL_GetUserStatsForGame, {
				params: {
					key: import.meta.env.VITE_STEAM_API_KEY,
					steamid: params.id,
					appid: game.appid
				}
			});
			schemaForGame = await ofetch(STEAM_URL_GetSchemaForGame, {
				params: {
					key: import.meta.env.VITE_STEAM_API_KEY,
					steamid: params.id,
					appid: game.appid
				}
			});
			achivements = await ofetch(STEAM_URL_GetPlayerAchievements, {
				params: {
					key: import.meta.env.VITE_STEAM_API_KEY,
					steamid: params.id,
					appid: game.appid
				}
			});
		} catch (e) {
			console.log(e);
		}

		// get achivemens srom steam api with time and date of achivement was unlocked

		game.playesStats = gameData.playerstats as IPlayerStats;
		game.schema = schemaForGame.game as IGameSchema;
		game.achivements = achivements.playerstats?.achievements;
		game.card_image = `https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/library_600x900.jpg`;
		game.hero_image = `https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/library_hero.jpg`;
		game.header_image = `https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/header.jpg`;
	}

	const playerInfo: IPlayerInfo = data.response.players[0];
	return {
		playerInfo,
		games
	};
}
