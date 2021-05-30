<script lang="typescript">
	import { onMount } from 'svelte';

	let value: string;
	let searchResult: SearchResult;
	let loading = false;

	let input: HTMLInputElement;

	onMount(function () {
		input.focus();
	});

	async function handleSubmit() {
		if (value.trim()) {
			loading = true;
			const url = `/word?word=${value}`;
			const res = await fetch(url);
			const { response } = await res.json();
			searchResult = response;
			loading = false;
		}
	}
</script>

<div class="container">
	<h1>Ritournelle dico</h1>

	<form on:submit|preventDefault={handleSubmit}>
		<input bind:value bind:this={input} disabled={loading} />
	</form>

	{#if loading}
		<p>Je cherche...</p>
	{/if}

	{#if !loading && searchResult}
		{#if searchResult.definition}
			<div>
				<p class="text-capitalize">{searchResult.catgram}</p>
				<p><b>Définition:</b> {searchResult.definition}</p>
				<p><b>Source:</b> {searchResult.source}</p>
			</div>
		{:else}
			<p>Ce mot n'existe pas... coup dur</p>
		{/if}
	{/if}
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
		display: flex;
		justify-content: center;
		height: 100vh;
		font-size: 19px;
		box-sizing: border-box;
	}

	form {
		display: flex;
	}

	input {
		border-radius: 4px;
		border: 3px solid #000;
		width: 100%;
		padding: 5px;
	}

	.text-capitalize::first-letter {
		text-transform: capitalize;
	}

	.container {
		width: 30vw;
		padding: 2rem;
	}

	@media (max-width: 1250px) {
		.container {
			width: 85vw;
		}
	}
</style>
