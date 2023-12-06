<script>
  import { goto } from '$app/navigation';
  import { page } from '$app/stores'

  import FormMessage from "$lib/form-message.svelte"

  import Form from "./form.svelte"
  import List from "./list.svelte"

  /** @type LoadedJobData */
  export let data

  /** @type {import('./$types').ActionData} */
  export let form

  const clientId = $page.url.searchParams.get('client')

  /** @type JobFormItem | undefined */
  let jobItem = undefined

  if (clientId) {
    jobItem = {
      title: "",
      client: { id: clientId },
      beg_date: "",
      end_date: "",
    }
    $page.url.searchParams.set('client', '')
    goto(`?${$page.url.searchParams.toString()}`);
  }

  /** @type {JobFormItem | undefined} */
  let formItem = form?.error
    ? form.form
    : jobItem
</script>

<FormMessage {form} />

{#if formItem}
  <Form {formItem} clients={data.clients} />
{:else}
  <List jobs={data.jobs} bind:formItem={formItem} />
{/if}
