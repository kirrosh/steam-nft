<script>
	import { connectWallet, metamaskAccount, disconnectWallet } from 'src/features/wagmi/stores';
	console.log(metamaskAccount);

	/** @type {`0x${string}`| undefined }*/
	let address;
	metamaskAccount.subscribe((value) => {
		address = value;
	});
</script>

<button
	class="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
	on:click={() => {
		connectWallet();
	}}>Connect</button
>
<p class="text-white">{address}</p>
<button
	class="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
	on:click={() => {
		disconnectWallet();
	}}>Disconnect</button
>
