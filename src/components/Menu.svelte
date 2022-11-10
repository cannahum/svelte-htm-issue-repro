<script>
  import Radio from "./Radio.svelte";
  import { cookiesAndCream, chocChipMint, raspberry } from "../lib/MenuItems";

  export let selectedOption = cookiesAndCream;
  export let onSelectionChange;

  $: {
    console.log(selectedOption);
    onSelectionChange(selectedOption);
  };
</script>

<fieldset>
  <legend>Choose your rate</legend>
  <Radio
    id="cookies_n_cream"
    name="rate-option"
    value={cookiesAndCream}
    bind:currentSelection={selectedOption}
  >
    <p class="option-name">{cookiesAndCream}</p>
  </Radio>
  <Radio
    id="choc_chip_mint"
    name="rate-option"
    value={chocChipMint}
    bind:currentSelection={selectedOption}
  >
    <p class="option-name">{chocChipMint}</p>
  </Radio>
  <Radio
    id="raspberry"
    name="rate-option"
    value={raspberry}
    bind:currentSelection={selectedOption}
  >
    <p class="option-name">{raspberry}</p>
  </Radio>
</fieldset>

<style>
  fieldset {
    margin: 0 24px;
    padding: 0;
    border: none;
  }
  legend {
    margin: 0;
    font-size: 20px;
    margin-bottom: 24px;
    font-weight: 700;
  }
  .option-name {
    margin: 4px 0 16px;
  }
</style>
