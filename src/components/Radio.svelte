<script>
	import { current_component } from 'svelte/internal';
	import { getEventsAction } from '../lib/utils/onEvents';

	export let currentSelection;

	$: checked = currentSelection === $$restProps.value;
	const events = getEventsAction(current_component);
</script>

<label role="radio" aria-checked={checked} class:selected={checked} for={$$restProps.id}>
	<slot />
	<!-- bind:group tutorial here: https://svelte.dev/tutorial/group-inputs -->
	<input
		type="radio"
		use:events
		bind:group={currentSelection}
		value={$$restProps.value}
		{...$$restProps}
	/>
</label>

<style>
	label {
		display: block;
		margin: 16px 0;
		border: 2px solid #dcdce5;
		border-radius: 12px;
		padding: 12px 20px;
		position: relative;
	}
	label.selected {
		border: 2px solid orange;
		border-radius: 12px;
	}
	input[type='radio'] {
		border: 8px solid #dcdce5;
		/* Add if not using autoprefixer */
		-webkit-appearance: none;
		/* Remove most all native input styles */
		appearance: none;
		margin: 0;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		position: absolute;
		right: 12px;
		top: 12px;
	}
	input[type='radio']:checked {
		border: 8px solid orange;
	}
</style>
