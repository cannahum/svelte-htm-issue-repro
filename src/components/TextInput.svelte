<script>
  import { current_component } from "svelte/internal";
  import { getEventsAction } from "../lib/utils/onEvents";

  export let value = "";
  export let description = "";

  const events = getEventsAction(current_component);
</script>

<div class="input-wrapper" class:disabled={$$restProps.disabled}>
  <slot name="input-label">
    <label class="default-input-label" for={$$restProps.id}>{description}</label
    >
  </slot>
  <input type="text" use:events {...$$restProps} bind:value />
</div>
