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

			const parsed = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
			const url = `/word?word=${parsed}`;
			const res = await fetch(url);
			const { response } = await res.json();
			searchResult = response;

			loading = false;
		}
	}
</script>

<div class="container">
	<h1>Ritournelle dico 📔</h1>

	<form on:submit|preventDefault={handleSubmit}>
		<input bind:value bind:this={input} placeholder="Entrer un mot..." />
		<button type="submit">🔍</button>
	</form>

	{#if loading || searchResult}
		<div class="response">
			{#if !loading && searchResult}
				{#if searchResult.definition}
					<p class="text-capitalize">{searchResult.catgram}</p>
					<p><b>Définition:</b> {searchResult.definition}</p>
					<p><b>Source:</b> {searchResult.source}</p>
				{:else}
					<p>Ce mot n'existe pas... coup dur</p>
				{/if}
			{:else if loading}
				<div class="spinner-container">
					<div class="spinner" />
				</div>
			{/if}
		</div>
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
		background: #667db6;
		background: linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6);
		color: white;
	}

	form {
		display: flex;
	}

	input {
		border: none;
		width: 100%;
		padding: 5px 10px;
		box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
		line-height: 25px;
		border-radius: 4px;
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}

	button {
		padding: 10px;
		border: none;
		box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
		border-left: 1px solid rgba(0, 0, 0, 0.4);
		border-radius: 4px;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		cursor: pointer;
	}

	.response {
		background: #313a54;
		padding: 1rem 2rem;
		border-radius: 4px;
		margin-top: 1rem;
		box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
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

	.spinner-container {
		display: flex;
		justify-content: center;
		padding: 1rem 0;
	}

	.spinner {
		display: inline-block;
		align-self: center;
		width: 27px;
		height: 27px;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-radius: 50%;
		border-top-color: #fff;
		animation: spin 1s ease-in-out infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
	@-webkit-keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
