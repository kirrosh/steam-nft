import { createClient, configureChains, InjectedConnector } from '@wagmi/core';
import { polygonMumbai } from '@wagmi/core/chains';
import { publicProvider } from '@wagmi/core/providers/public';
import { MetaMaskConnector } from '@wagmi/core/connectors/metaMask';

const { chains, provider, webSocketProvider } = configureChains(
	[polygonMumbai],
	[publicProvider()]
);

export const createWagmiClient = () => {
	return createClient({
		autoConnect: true,
		provider,
		webSocketProvider,
		connectors: [
			new MetaMaskConnector({
				chains
			})
		]
	});
};
