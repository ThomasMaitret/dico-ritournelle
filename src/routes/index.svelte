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

<svelte:head>
	<title>Ritournelle dico</title>
</svelte:head>

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
					<div class="header">
						{#if searchResult.catgram}
							<div class="badge badge-catgram text-capitalize">{searchResult.catgram}</div>
						{/if}
						<div class="badge badge-source text-capitalize">{searchResult.source}</div>
					</div>
					<p class="definition">{@html searchResult.definition}</p>
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
	:root {
		--border-radius: 3px;
		--shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
	}

	:global(body) {
		margin: 0;
		padding: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
		display: flex;
		justify-content: center;
		height: 100vh;
		font-size: 17px;
		box-sizing: border-box;
		background: #667db6;
		background: linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6);
		color: white;
	}

	h1 {
		margin-top: 0;
	}

	form {
		display: flex;
	}

	:global(a) {
		pointer-events: none !important;
		cursor: text !important;
		text-decoration: none;
		color: #fff;
	}

	input {
		border: none;
		width: 100%;
		padding: 5px 10px;
		box-shadow: var(--shadow);
		line-height: 25px;
		border-radius: var(--border-radius);
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}

	button {
		padding: 10px;
		border: none;
		box-shadow: var(--shadow);
		border-left: 1px solid rgba(0, 0, 0, 0.4);
		border-radius: var(--border-radius);
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		cursor: pointer;
	}

	.response {
		background: #313a54;
		padding: 2rem;
		border-radius: var(--border-radius);
		margin-top: 1rem;
		box-shadow: var(--shadow);
	}

	.text-capitalize::first-letter {
		text-transform: capitalize;
	}

	.response .header {
		display: flex;
		gap: 1.25rem;
	}

	.definition {
		margin-top: 2rem;
		line-height: 1.75rem;
		max-height: 500px;
		overflow-y: auto;
	}

	.badge {
		background-color: #fff;
		color: #313a54;
		padding: 0.5rem 1rem;
		border-radius: var(--border-radius);
		width: fit-content;
		font-size: 15px;
		font-weight: 700;
	}

	.container {
		width: 30vw;
		padding: 2rem;
	}

	@media (max-width: 1250px) {
		.container {
			width: 90vw;
			padding: 1rem;
		}
		.response {
			padding: 1.25rem;
			font-size: 16px;
		}
		.response .header {
			display: flex;
			flex-direction: column;
		}
		.response .header .badge {
			width: auto;
			text-align: center;
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
