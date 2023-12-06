<script>
  import { t } from "$lib/tailwind.js"

  import AdminForm from "$lib/admin/form.svelte"
  import DateField from '$lib/date-field.svelte'
  import FormField from "$lib/form-field.svelte"

  /** @type {any} */
  export let jobs

  /** @type {any} */
  export let formItem

  /**
   * @param {any} job
   * @returns string
   */
   function title(job) {
    const maxDisplayLength = 20
    let title = job.title.trim() || ''
    if (title.length > maxDisplayLength) {
      const crop = title.slice(0, maxDisplayLength)
      title = `<span title="${job.title}">${crop}...</span>`
    }
    return title
  }
</script>

<AdminForm currentJobId={formItem.id} name="Payment">
  <FormField label="Job" name="job">
    <select name="job" class={t.input}>
      {#each jobs as job}
        <option selected={formItem?.job?.id == job.id} value={job.id}
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

  <FormField label="Date" name="date">
    <DateField name="date" value={formItem.date} />
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
