<span class="loader" />

<style>
	.loader {
		width: 24px;
		height: 24px;
		border-width: 2px;
		border-style: dashed solid solid dotted;
		border-color: #ffffff #fafafa transparent #ffffff;
		border-radius: 50%;
		display: inline-block;
		position: relative;
		box-sizing: border-box;
		animation: rotation 1s linear infinite;
	}

	.loader::after {
		content: '';
		box-sizing: border-box;
		position: absolute;
		left: 10px;
		top: 15px;
		border: 5px solid transparent;
		border-right-color: #ffffff;
		transform: rotate(-40deg);
	}

	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
