<script>
  import { current_component } from "svelte/internal";
  import { getEventsAction } from "../lib/utils/onEvents";

  export let value = "";
  // description prop for a11y in case there is no dedicated label for this input instance
  export let description = "";

  const events = getEventsAction(current_component);
</script>

<!-- classes `error` and  `disabled` will only be set if there are errors or is disabled-->
<div class="input-wrapper" class:disabled={$$restProps.disabled}>
  <slot name="input-label">
    <!-- Default label component (for a11y) in case none was supplied -->
    <label class="default-input-label" for={$$restProps.id}>{description}</label
    >
  </slot>
  <input type="text" use:events {...$$restProps} bind:value />
</div>
