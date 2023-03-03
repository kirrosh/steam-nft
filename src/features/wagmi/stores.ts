import { MetaMaskConnector } from '@wagmi/core/connectors/metaMask';
import { connect, disconnect, watchAccount } from '@wagmi/core';
import { writable } from 'svelte/store';
import { createWagmiClient } from './client';

export const metamaskAccount = writable<`0x${string}` | undefined>();

export const client = createWagmiClient();

const unwatch = watchAccount((account) => metamaskAccount.set(account.address));

export const connectWallet = async () => {
	await connect({
		connector: client.connectors[0]
	});
};

export const disconnectWallet = async () => {
	await disconnect();
	console.log('disconnected');
};
