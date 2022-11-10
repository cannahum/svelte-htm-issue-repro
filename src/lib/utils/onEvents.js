import { bubble, listen } from 'svelte/internal';

// This functions takes the event passed on as props (like `on:click`, `on:keypress`, etc.. )
// to a component that may receive different actions when used in different places.
export function getEventsAction(component) {
	return (node) => {
		const events = Object.keys(component.$$.callbacks);
		const listeners = [];
		events.forEach((event) => listeners.push(listen(node, event, (e) => bubble(component, e))));
		return {
			destroy: () => {
				listeners.forEach((listener) => listener());
			},
		};
	};
}
