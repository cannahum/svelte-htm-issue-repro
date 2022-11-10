<script>
  import Menu from "./components/Menu.svelte";

  let menuItemValue = "Mint choc chip";
</script>

<main>
  <h1>Issue repro: svelte-htm</h1>

  <div class="ice-cream-menu">
    <Menu
      selectedOption={menuItemValue}
      onSelectionChange={(s) => {
        menuItemValue = s;
      }}
    />
    <p>Selected: <b>{menuItemValue}</b></p>
  </div>
</main>
