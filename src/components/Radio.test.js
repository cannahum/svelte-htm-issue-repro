import { render, screen, cleanup, fireEvent } from '@testing-library/svelte';
import html from 'svelte-htm';
import { writable } from 'svelte/store';
import Radio from './Radio.svelte';

describe('components/Radio tests', () => {
    const cookiesAndCream = 'Cookies and cream';
    const chocChipMint = 'Mint choc chip';
    const raspberry = 'Raspberry ripple';
    const favorite = writable(chocChipMint);

    beforeEach(() => {
        render(html`
            <${Radio} bind:currentSelection=${favorite} value=${chocChipMint}>
                <p>${chocChipMint}</p>
            </Radio>
			<${Radio} bind:currentSelection=${favorite} value=${cookiesAndCream}>
                <p>${cookiesAndCream}</p>
            </Radio>
			<${Radio} bind:currentSelection=${favorite} value=${raspberry}>
                <p>${raspberry}</p>
            </Radio>
        `);
    });

    afterEach(() => {
        cleanup();
    });

    test('user clicking on another button changes state', async () => {
        // choc chip is checked
        let cookiesAndCreamInput = screen.getByLabelText(cookiesAndCream);
        expect(cookiesAndCreamInput).not.toBeChecked();
        let chocChipMintInput = screen.getByLabelText(chocChipMint);
        expect(chocChipMintInput).toBeChecked();
        let raspberryInput = screen.getByLabelText(raspberry);
        expect(raspberryInput).not.toBeChecked();

        // click cookies n cream, it should be checked, all else is unchecked
        await fireEvent.click(cookiesAndCreamInput);
        cookiesAndCreamInput = screen.getByLabelText(cookiesAndCream);
        expect(cookiesAndCreamInput).toBeChecked();
        chocChipMintInput = screen.getByLabelText(chocChipMint);
        expect(chocChipMintInput).not.toBeChecked();
        raspberryInput = screen.getByLabelText(raspberry);
        expect(raspberryInput).not.toBeChecked();

        // click raspberry, it should be checked, all else is unchecked
        await fireEvent.click(raspberryInput);
        cookiesAndCreamInput = screen.getByLabelText(cookiesAndCream);
        expect(cookiesAndCreamInput).not.toBeChecked();
        chocChipMintInput = screen.getByLabelText(chocChipMint);
        expect(chocChipMintInput).not.toBeChecked();
        raspberryInput = screen.getByLabelText(raspberry);
        expect(raspberryInput).toBeChecked();
    });
});
