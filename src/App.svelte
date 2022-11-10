<script>
  import Menu from "./components/Menu.svelte";
  import TextInput from "./components/TextInput.svelte";

  let customInputValue = "initial";
  let menuItemValue = "Mint choc chip";
</script>

<main>
  <h1>Issue repro: svelte-htm</h1>

  <div class="custom-input">
    <TextInput id="custom-input" bind:value={customInputValue}>
      <label slot="input-label" for="custom-input">Custom input</label>
    </TextInput>
    <p>Current value of custom input: <b>{customInputValue}</b></p>
  </div>

  <div class="ice-cream-menu">
    <Menu
      selectedOption={menuItemValue}
      onSelectionChange={(s) => {
        menuItemValue = s;
      }}
    />
    <p>Current value of menu item: <b>{menuItemValue}</b></p>
  </div>
</main>
