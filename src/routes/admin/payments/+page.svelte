<script>
  import { t } from "$lib/tailwind.js"

  import AdminForm from "$lib/admin/form.svelte"
  import AdminPage from "$lib/admin/page.svelte"
  import AdminActs from "$lib/admin/actions.svelte"
  import DateField from '$lib/date-field.svelte'
  import FormField from "$lib/form-field.svelte"
  import FormMessage from "$lib/form-message.svelte"

  export let data

  let dbData = data.items

  /** @type {any} */
  let formItem = null

  /** @type {import('./$types').ActionData} */
  export let form

  if (form?.error) {
    formItem = form.form
  }

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

<FormMessage {form} />

{#if formItem}
  <AdminForm {formItem} name="Payment">
    <FormField label="Job" name="job">
      <select name="job" class={t.input}>
        {#each data.jobs as job}
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
{/if}

<AdminPage title="Payments" description="Manage payments">
  <button
    on:click={() =>
      (formItem = {
        id: null,
        description: "",
        job: "",
        job_date: "",
        amount: null,
      })}
    slot="add_button"
    type="button"
    class={t.blue_button}>New Payment</button
  >
  <thead class="bg-gray-100" slot="thead">
    <tr>
      <th class={t.first_header_column}>Description</th>
      <th class={t.header_column}>Job</th>
      <th class={t.header_column}>Job Date</th>
      <th class={t.header_column}>Amount</th>
      <th class={t.header_column} />
    </tr>
  </thead>
  <tbody class="bg-white" slot="tbody">
    {#each dbData as item, i}
      <tr class={i % 2 == 0 ? "" : "bg-gray-50"}>
        <td class={t.first_tbody_column}>{item.description}</td>
        <td class={t.tbody_column}>{@html title(item.job)}</td>
        <td class={t.tbody_column}>{item.job_date || ""}</td>
        <td class={t.tbody_column}>{item.amount}</td>
        <td class={t.tbody_action_column}>
          <AdminActs bind:form={formItem} {item} />
        </td>
      </tr>
    {/each}
  </tbody>
</AdminPage>
