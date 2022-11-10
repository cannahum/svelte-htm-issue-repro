<script>
  import TextInput from "./components/TextInput.svelte";

  let customInputValue = "initial";
</script>

<main>
  <h1>Issue repro: svelte-htm</h1>

  <div class="custom-input">
    <TextInput id="custom-input" bind:value={customInputValue}>
      <label slot="input-label" for="custom-input">Custom input</label>
    </TextInput>
    <p>Current value of custom input: <b>{customInputValue}</b></p>
  </div>
</main>