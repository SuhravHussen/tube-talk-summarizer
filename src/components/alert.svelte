<script>
	import Icon from '@iconify/svelte';

	const handleClose = () => {
		const alertElement = document.getElementById('alert');
		if (alertElement) {
			alertElement.style.display = 'none';
		}
	};
</script>

<p class="alert" id="alert">
	⚠️ Please note: The site might not work correctly with all videos. <button on:click={handleClose}>
		<Icon
			icon="charm:cross"
			style="display: flex ; justify-content:center ; align-items:center ; margin-top:5px; font-size:30px"
		/>
	</button>
</p>

<style>
	.alert {
		display: flex;
		align-items: center;
		position: fixed;
		background: linear-gradient(135deg, #ff8c00, #ff0000);
		color: white;
		padding: 10px;
		border-radius: 5px;
		text-align: center;

		top: 0;
		margin-top: 10px;
		right: 0;
		margin-right: 10px;
	}

	.alert button {
		background: transparent;
		border: none;
		color: white;
		cursor: pointer;
	}

	@media (max-width: 500px) {
		.alert {
			margin-right: 0px;
			width: 90%;
			left: auto;
			right: auto;
		}
	}
</style>
