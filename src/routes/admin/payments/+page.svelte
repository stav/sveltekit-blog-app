<script>
  import FormMessage from "$lib/form-message.svelte"

  import Form from "./form.svelte"
  import List from "./list.svelte"

  export let data

  /** @type {any} */
  let formItem = null

  /** @type {import('./$types').ActionData} */
  export let form

  if (form?.error) {
    formItem = form.form
  }
</script>

<FormMessage {form} />

{#if formItem}
  <Form {formItem} jobs={data.jobs} />
{:else}
  <List bind:formItem={formItem} payments={data.payments} />
{/if}
