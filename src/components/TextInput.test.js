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
	test('renders the wrapper <div/>, the input and the default label ', () => {
		render(TextInput, { props: { ...textInputProps } });
		expect(document.querySelector('input')).toBeInTheDocument();
		expect(document.querySelector('.input-wrapper')).toBeInTheDocument();
		expect(screen.getByLabelText(textInputProps.description)).toBeInTheDocument();
	});

	test('sets disabled class and disables the input', () => {
		render(TextInput, { props: { ...textInputProps, disabled: true } });
		expect(document.querySelector('.input-wrapper')).toHaveClass('disabled');
		expect(screen.getByPlaceholderText(textInputProps.placeholder)).toBeDisabled();
	});

	test('it renders slot label correctly', () => {
		render(
			html`<${TextInput} 
        description=${textInputProps.description} 
        errors={[]} 
        id=${textInputProps.id}
        >
          <p slot="input-label">Phone number label</p>
        </TextInput>`,
		);
		expect(screen.getByText('Phone number label')).toBeInTheDocument();
		expect(screen.queryByLabelText(textInputProps.description)).toBeFalsy();
		expect(document.querySelector(`#${textInputProps.id}`)).toBeInTheDocument();
	});

	test('it handles events', async () => {
		const mockFunction = vi.fn();
		render(
			html`<${TextInput}
				description=${textInputProps.description}
				errors="{[]}"
				id=${textInputProps.id}
				on:keydown=${mockFunction}
			/>`,
		);
		expect(document.querySelector(`#${textInputProps.id}`)).toBeInTheDocument();
		const input = document.querySelector('input');
		if (!input) throw new Error('No input found');
		await fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });
		expect(mockFunction).toHaveBeenCalled();
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
