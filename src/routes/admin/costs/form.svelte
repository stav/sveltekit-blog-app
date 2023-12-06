<script>
  import { page } from '$app/stores'

  import { t } from "$lib/tailwind.js"

  import AdminForm from "$lib/admin/form.svelte"
  import DateField from '$lib/date-field.svelte'
  import FormField from "$lib/form-field.svelte"

  /** @type {any} */
  export let jobs

  /** * @type {any} */
  export let formItem = null

  /** @type {URL} */
  $: url = $page.url;

  /** @type {string | null} */
  $: selectedJobId = url.searchParams.get('job')

  /** @param {{ id: any; }} job */
  function checkJob(job) {
    if (job.id == formItem?.job?.id) return true
    if (job.id == selectedJobId) return true
    return false
  }
</script>

<AdminForm currentJobId={formItem.id} name="Cost">
  <FormField label="Job" name="job">
    <select name="job" class={t.input}>
      {#each jobs as job}
        <option selected={checkJob(job)} value={job.id}
          >{job.client.full_name} | {job.title}</option
        >
      {/each}
    </select>
  </FormField>

  <FormField label="Description" name="description">
    <input
      type="text"
      name="description"
      value={formItem.description}
      class={t.input}
    />
  </FormField>

  <FormField label="Date" name="purchase_date">
    <DateField name="purchase_date" value={formItem.purchase_date} />
  </FormField>

  <FormField label="Amount" name="amount">
    <input
      type="text"
      name="amount"
      value={formItem.amount}
      class={t.input}
    />
  </FormField>
</AdminForm>
