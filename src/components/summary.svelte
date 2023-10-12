<script>
	/** @type {Array<string>} */
	export let points;
</script>

<div class="summary-container" />
<div class="summary" style="--accent-color:#41516C">
	<div class="date">Summary</div>
	<ul class="descr">
		{#each points as point}
			<li class="point">
				<p>{point}</p>
			</li>
		{/each}
	</ul>
</div>

<style>
	.summary-container {
		width: 80%;
		margin-top: 30px;
	}

	.summary {
		grid-column: 2;
		--inlineP: 1.5rem;
		margin-inline: var(--inlineP);
		grid-row: span 2;
		display: grid;
		grid-template-rows: min-content min-content min-content;
	}

	.summary .date {
		--dateH: 3rem;
		height: var(--dateH);
		margin-inline: calc(var(--inlineP) * -1);

		text-align: center;
		background: #c0392b; /* fallback for old browsers */
		background: -webkit-linear-gradient(
			to right,
			#c0392b,
			#8e44ad
		); /* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(
			to right,
			#c0392b,
			#8e44ad
		); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

		color: white;
		font-size: 1.25rem;
		font-weight: 700;

		display: grid;
		place-content: center;
		position: relative;

		border-radius: calc(var(--dateH) / 2) 0 0 calc(var(--dateH) / 2);
	}

	.summary .date::before {
		content: '';
		width: var(--inlineP);
		aspect-ratio: 1;
		background: var(--accent-color);
		background-image: linear-gradient(rgba(0, 0, 0, 0.2) 100%, transparent);
		position: absolute;
		top: 100%;

		clip-path: polygon(0 0, 100% 0, 0 100%);
		right: 0;
	}

	.summary .descr {
		padding: 40px;
		font-weight: 300;
		background-color: aliceblue;
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
		font-size: 20px;
	}

	.point {
		margin: 5px;
		text-align: start;
	}
</style>
