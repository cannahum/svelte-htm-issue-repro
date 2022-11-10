import { fireEvent, render, screen } from '@testing-library/svelte';
import html from 'svelte-htm';
import { writable, get } from 'svelte/store';
import TextInput from './TextInput.svelte';

const textInputProps = {
	description: 'phone number',
	id: 'phone-number',
	placeholder: 'Enter phone number',
	disabled: false,
};

describe('components/FormFields/TextInput tests', () => {
	test('it handles events', async () => {
		const mockFunction = vi.fn();
		render(
			html`<${TextInput}
				description=${textInputProps.description}
				errors="{[]}"
				id=${textInputProps.id}
				on:keydown=${(e) => mockFunction(e.key)}
				on:change=${(e) => mockFunction(e.target.value)}
			/>`,
		);
		expect(document.querySelector(`#${textInputProps.id}`)).toBeInTheDocument();
		const input = document.querySelector('input');
		if (!input) throw new Error('No input found');
		await fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });
		expect(mockFunction).toBeCalledWith('Enter');
		mockFunction.mockReset();
		await fireEvent.change(input, { target: { value: 'hello' } });
		expect(mockFunction).toBeCalledWith('hello');
	});

	test('it communicates value through two-way binding', async () => {
		const textValue = writable('initial');
		render(
			html`<${TextInput}
				errors="{[]}"
				bind:value=${textValue}
				id=${textInputProps.id}
			/>`,
		);
		const input = document.querySelector('input');
		if (!input) throw new Error('No input found');
		expect(input.value).toEqual('initial');
		await fireEvent.change(input, { target: { value: '23' } });
		expect(input.value).toEqual('23');
		expect(get(textValue)).toEqual('23');
	});
});
