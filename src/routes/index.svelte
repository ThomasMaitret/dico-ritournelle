<script lang="typescript">
	import { onMount } from 'svelte';

	let value: string;
	let loading = false;
	let input: HTMLInputElement;
	let searchResult: WordResponse;

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

<svelte:head>
	<title>Ritournelle dico</title>
</svelte:head>

<div class="container">
	<h1>Ritournelle dico 📔</h1>

	<form on:submit|preventDefault={handleSubmit}>
		<input bind:value bind:this={input} type="search" placeholder="Entrer un mot..." />
		<button type="submit">🔍</button>
	</form>

	{#if loading || searchResult}
		<div class="response">
			{#if !loading && searchResult}
				{#if searchResult.definition}
					{#if searchResult.catgram}
						<div class="badge badge-catgram text-capitalize">{searchResult.catgram}</div>
					{/if}

					<div class="sources">
						{#each searchResult.sources as source}
							<a href={source.url} target="_blank" rel="noopener" class="source-link">
								<div class="badge badge-source text-capitalize">{source.name}</div>
							</a>
						{/each}
					</div>

					{#if searchResult.boutade}
						<p class="boutade">"{searchResult.boutade}"</p>
					{/if}

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

	:global(a:not(.source-link)) {
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
		background: #282e40;
		padding: 1.5rem;
		border-radius: var(--border-radius);
		margin-top: 1rem;
		box-shadow: var(--shadow);
	}

	.text-capitalize::first-letter {
		text-transform: capitalize;
	}

	.response .sources {
		display: flex;
		gap: 1rem;
		margin-top: 1.25rem;
		overflow-x: auto;
	}

	.definition {
		margin-top: 1.5rem;
		line-height: 1.75rem;
		max-height: 500px;
		overflow-y: auto;
	}

	.boutade {
		color: #fff79c;
		font-weight: 500;
	}

	.badge {
		padding: 0.25rem 0.75rem;
		border-radius: var(--border-radius);
		width: fit-content;
		font-size: 14px;
		font-weight: 700;
	}

	.badge-catgram {
		display: block;
		background-color: #fff;
		color: #313a54;
		width: max-content;
	}

	.badge-source {
		background-color: #0b62bd;
		color: #fff;
	}

	.badge-source:hover {
		background-color: #1a76d8;
	}

	.source-link {
		text-decoration: none;
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
