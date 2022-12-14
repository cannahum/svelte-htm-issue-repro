import { fireEvent, render, screen } from '@testing-library/svelte';
import html from 'svelte-htm';
import userEvent from '@testing-library/user-event';
import Menu from './Menu.svelte';
import { cookiesAndCream, chocChipMint, raspberry } from "../lib/MenuItems";

describe('Menu tests', () => {
    const user = userEvent.setup();

    test('changing options invokes callback - FAILS if you click once', async () => {
        const mockChangeHandler = vi.fn();
        render(html`
            <${Menu} 
                selectedOption=${chocChipMint} 
                onSelectionChange=${mockChangeHandler} 
            />
        `);
        const cncInput = document.querySelector('#cookies_n_cream');
        expect(cncInput).not.toBeChecked();
        const ccmInput = document.querySelector('#choc_chip_mint');
        expect(ccmInput).toBeChecked();
        const rInput = document.querySelector('#raspberry');
        expect(rInput).not.toBeChecked();
        mockChangeHandler.mockReset();
        await user.click(rInput);
        expect(mockChangeHandler).toBeCalledWith(raspberry);
    });

    test('changing options invokes callback - FAILS if you click once, UNLESS you choose the first item', async () => {
        const mockChangeHandler = vi.fn();
        render(html`
            <${Menu} 
                selectedOption=${chocChipMint} 
                onSelectionChange=${mockChangeHandler} 
            />
        `);
        const cncInput = document.querySelector('#cookies_n_cream');
        expect(cncInput).not.toBeChecked();
        const ccmInput = document.querySelector('#choc_chip_mint');
        expect(ccmInput).toBeChecked();
        const rInput = document.querySelector('#raspberry');
        expect(rInput).not.toBeChecked();
        // The following works because cookies and cream are the first element on the menu.
        await fireEvent.click(cncInput);
        expect(mockChangeHandler).toBeCalledWith(cookiesAndCream);

        // Once the first item works, then the rest work too...
        // Reset mock, and select the non-first item on the menu
        mockChangeHandler.mockReset();
        await fireEvent.click(rInput);
        expect(mockChangeHandler).toBeCalledWith(raspberry);

        mockChangeHandler.mockReset();
        await fireEvent.click(ccmInput);
        expect(mockChangeHandler).toBeCalledWith(chocChipMint);
    });

    test('changing options invokes callback - SUCCEEDS if you click twice', async () => {
        const mockChangeHandler = vi.fn();
        render(html`
            <${Menu} 
                selectedOption=${chocChipMint} 
                onSelectionChange=${mockChangeHandler} 
            />
        `);
        const cncInput = document.querySelector('#cookies_n_cream');
        expect(cncInput).not.toBeChecked();
        const ccmInput = document.querySelector('#choc_chip_mint');
        expect(ccmInput).toBeChecked();
        const rInput = document.querySelector('#raspberry');
        expect(rInput).not.toBeChecked();
        // NOTICE - I'm firing this action twice
        await user.click(rInput);
        await user.click(rInput);
        expect(mockChangeHandler).toBeCalledWith(raspberry);
        mockChangeHandler.mockReset();
    });
});
