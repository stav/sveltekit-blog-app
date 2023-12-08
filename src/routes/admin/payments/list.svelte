<script>
  import { t } from "$lib/tailwind.js"
  import SvgIcon from "$lib/SvgIcons.svelte"

  import AdminPage from "$lib/admin/page.svelte"
  import AdminActs from "$lib/admin/actions.svelte"

  /** @type {any[]} */
  export let payments

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

  const emptyForm = () => formItem = {
    id: null,
    description: "",
    job: "",
    job_date: "",
    amount: null,
  }
</script>

<AdminPage title="Payments" description="Manage payments">
  <button
    on:click={emptyForm}
    slot="add_button"
    type="button"
    class={t.blue_button}
    >
      <SvgIcon icon="plus" htmlClass="mr-1 h-6 w-6 text-white" />
      New Payment
  </button>
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
    {#each payments as payment, i}
      <tr class={i % 2 == 0 ? "" : "bg-gray-50"}>
        <td class={t.first_tbody_column}>{payment.description}</td>
        <td class={t.tbody_column}>{@html title(payment.job)}</td>
        <td class={t.tbody_column}>{payment.date || ""}</td>
        <td class={t.tbody_column}>{payment.amount}</td>
        <td class={t.tbody_action_column}>
          <AdminActs bind:form={formItem} item={payment} />
        </td>
      </tr>
    {/each}
  </tbody>
</AdminPage>
