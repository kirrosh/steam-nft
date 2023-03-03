import { prepareWriteContract, writeContract } from '@wagmi/core';
import { tokenAdress } from 'src/constants/artifacts/tokenAdress';
import { abi } from 'src/constants/artifacts/GameAchievement.json';

export const safeMint = async ({ address, URI }: { address: `0x${string}`; URI: string }) => {
	try {
		const config = await prepareWriteContract({
			address: tokenAdress.GameAchievement,
			abi: abi,
			functionName: 'safeMint',
			args: [address, URI]
		});
		const data = await writeContract(config);
		return data;
	} catch (e) {
		console.error(e);
	}
};
