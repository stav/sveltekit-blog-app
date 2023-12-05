<script>
  import FormMessage from "$lib/form-message.svelte"

  import Form from "./form.svelte"
  import List from "./list.svelte"

  /** @type LoadedClientData */
  export let data

  /** @type {import('./$types').ActionData} */
  export let form

  /** @type {ClientFormItem | undefined} */
  let formItem = form?.error ? form.form : undefined
</script>

<FormMessage {form} />

{#if formItem}
  <Form {formItem} />
{:else}
  <List {data} bind:formItem={formItem} />
{/if}
