<script>
	// Import components for loading spinner and summary
	import Alert from '../components/alert.svelte';
	import LoadingSpinner from '../components/loading-spinner.svelte';
	import Summary from '../components/summary.svelte';

	/**  @type {string} */
	let link; // This variable will store the YouTube video link.

	/**  @type {string} */
	let error = ''; // This variable will store error messages.

	/**  @type {boolean} */
	let loading = false; // This variable indicates whether the process is loading.

	/**  @type {string} */
	let summarization = ''; // This variable will hold the summarized content.

	// Regular expression to validate the YouTube URL
	const regex = /https:\/\/youtu\.be\/[a-zA-Z0-9_-]+(\?.*)?/;

	const handleSubmit = async () => {
		try {
			error = ''; // Clear any previous errors.
			loading = true; // Set the loading flag to true.
			summarization = ''; // Clear the summary content.

			if (!link) {
				error = 'Please provide a link'; // Display an error if the link is empty.
				return;
			}

			if (!regex.test(link)) {
				error = 'Invalid link'; // Display an error for an invalid link.
				return;
			}

			const res = await fetch('/youtube', {
				method: 'POST',
				body: JSON.stringify({
					link
				})
			});
			const data = await res.json();

			if (data.error) error = data.message; // Display an error message if there's an issue.
			summarization = data.data; // Store the summarized data.
			console.log(data.data); // Log the data to the console.
		} catch (e) {
			error = 'Something went wrong'; // Display a generic error message for exceptions.
			console.log(e); // Log the error to the console.
		} finally {
			loading = false; // Set loading to false after the operation is complete.
		}
	};
</script>

<div class="container">
	<Alert />
	<h2>Get YouTube video summary (only in English)</h2>
	<div class="inputs">
		<input
			bind:value={link}
			class="input-field"
			type="text"
			placeholder="https://youtu.be/VIDEO_ID?si=UNIQUE_STRING"
		/>
		{#if error}
			<small class="error">{error}</small> <!-- Display error messages if there are any. -->
		{/if}
		{#if loading}
			<button class="submit-button">
				<LoadingSpinner />
				<!-- Show a loading spinner when the process is loading. -->
			</button>
		{:else}
			<button on:click={handleSubmit} class="submit-button">Submit</button>
			<!-- Button to submit the request. -->
		{/if}

		{#if summarization.length > 0}
			<Summary summary={summarization} />
			<!-- Display the summary if there is content available. -->
		{/if}
	</div>
</div>

<style>
	h2 {
		color: darkred;
	}
	.container {
		position: relative;
		background-image: linear-gradient(
			58.2deg,
			rgba(40, 91, 212, 0.73) -3%,
			rgba(171, 53, 163, 0.45) 49.3%,
			rgba(255, 204, 112, 0.37) 97.7%
		);

		text-align: center;
		min-height: 100vh;
		min-width: 100vw;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.inputs {
		display: flex;
		flex-direction: column;
		width: 700px;
		justify-content: center;
		align-items: center;
		margin-top: 20px;
	}
	.input-field {
		width: 100%;
		padding: 10px;
		border: none;
		border-radius: 5px;
		margin-bottom: 10px;
	}

	.submit-button {
		background-image: linear-gradient(to right, #ff512f 0%, #dd2476 51%, #ff512f 100%);
		width: 100%;
		height: 40px;
		color: white;
		border: none;
		padding: 10px 20px;
		border-radius: 5px;
		cursor: pointer;
		transition: 0.5s;
		background-size: 200% auto;
		user-select: none;
	}
	.submit-button:hover {
		background-position: right center;
		color: #fff;
		text-decoration: none;
	}

	.error {
		margin-bottom: 10px;
		color: red;
	}

	@media (max-width: 768px) {
		.inputs {
			width: 90% !important;
		}
	}
</style>
