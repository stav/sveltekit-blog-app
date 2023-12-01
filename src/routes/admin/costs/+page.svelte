<script>
  import { t } from "$lib/tailwind.js"

  import SvgIcon from "$lib/SvgIcons.svelte"
  import AdminPage from "$lib/admin/page.svelte"
  import FormField from "$lib/form-field.svelte"
  import AdminForm from "$lib/admin/form.svelte"
  import FormMessage from "$lib/form-message.svelte"

  export let data

  /** * @type {any} */
  let formItem = null

  /** @type {import('./$types').ActionData} */
  export let form

  if (form?.error) {
    formItem = form.form
  }

  /**
   * @param {any} cost
   * @returns string
   */
  function desc(cost) {
    const maxDisplayLength = 30
    let d = cost.description || ''
    if (d.length > maxDisplayLength) {
      d = d.slice(0, maxDisplayLength) + "..."
    }
    return d
  }

  let selected = "bg-sky-600 text-white"
  let unselected = "bg-sky-200 text-sky-900"
</script>

<FormMessage {form} />

{#if formItem}
  <AdminForm {formItem} name="Cost">
    <FormField label="Job" name="job">
      <select name="job" class={t.input}>
        {#each data.jobs as job}
          <option selected={formItem?.job?.id == job.id} value={job.id}
            >{job.title}</option
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

    <FormField label="Job Date" name="job_date">
      <input
        type="text"
        name="job_date"
        value={formItem.job_date}
        class={t.input}
      />
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

<AdminPage title="Costs" description="Manage costs">
  <div class="text-center" slot="center-stock">
    <div class="mx-auto max-w-3xl">
      <div class="space-y-5 sm:space-y-4">
        <a href={"?"}
          class="m-1 inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium {
            data.job == null ? selected : unselected}">All</a>
        {#each data.jobs as job}
          <a href={"?job=" + encodeURIComponent(job.id)}
            class="m-1 inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium {
              data.job == job.id ? selected : unselected}">{job.title}</a>
        {/each}
      </div>
    </div>
  </div>
  <button
    on:click={() =>
      (formItem = {
        id: null,
        job: "",
        job_date: "",
        description: "",
        amount: null,
      })}
    slot="add_button"
    type="button"
    class={t.blue_button}>New Cost</button
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
    {#each data.costs as cost, i}
      <tr class={i % 2 == 0 ? "" : "bg-gray-50"}>
        <td class={t.first_tbody_column} title="{cost.description}">{desc(cost)}</td>
        <td class={t.tbody_column}>{cost.job.title || ""}</td>
        <td class={t.tbody_column}>{cost.job_date || ""}</td>
        <td class={t.tbody_column}>{cost.amount}</td>
        <td class={t.tbody_action_column}>
          <button on:click={() => (formItem = cost)} class={t.blue_button} title="Edit {cost.description}">
            <SvgIcon icon="pencil" htmlClass="h-6 w-6 text-white" />
          </button>
          <form action="?/delete" method="POST" class="inline">
            <input type="hidden" name="id" value={cost.id} />
            <button class="{t.danger_button}" type="submit" title="Delete {cost.description}">
              <SvgIcon icon="trash" htmlClass="h-6 w-6 text-white" />
            </button>
          </form>
        </td>
      </tr>
    {/each}
  </tbody>
</AdminPage>
