<script>
  import { Alert } from 'flowbite-svelte';

  /** @type {any} */
   export let form
</script>

{#if form?.error}
    <Alert border color="red">
      <span class="font-bold">Info alert!</span>
      <span class="block sm:inline">{form.error}</span>
    </Alert>
{/if}

{#if form?.success}
  <Alert border color="green">
    <strong class="font-bold">Success!</strong>
    <span class="block sm:inline">{form.success}</span>
  </Alert>
{/if}
