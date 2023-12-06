<script>
  import { page } from '$app/stores';

  import { t } from "$lib/tailwind.js"
  import SvgIcon from "$lib/SvgIcons.svelte"

  import AdminPage from "$lib/admin/page.svelte"
  import AdminActs from "$lib/admin/actions.svelte"

  /** @type {any[]} */
  export let jobs

  /** @type {any[]} */
  export let costs

  /** * @type {any} */
  export let formItem = null

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

  /**
   * @param {any} cost
   * @returns string
   */
  function jobTitle(cost) {
    const maxDisplayLength = 18
    let title = cost.job.title || ''
    if (title.length > maxDisplayLength) {
      const crop = title.slice(0, maxDisplayLength)
      title = `<span title="${title}">${crop}...</span>`

    }
    return title
  }

  /** @type {URL} */
  $: url = $page.url;

  /** @type {string | null} */
  $: selectedJobId = url.searchParams.get('job')

  let selected = "bg-sky-600 text-white"
  let unselected = "bg-sky-200 text-sky-900"

  const emptyForm = () => formItem = {
    id: null,
    job: "",
    job_date: "",
    description: "",
    amount: null,
  }
</script>

<AdminPage title="Costs" description="Manage costs">
  <div class="text-center" slot="center-stock">
    <div class="mx-auto max-w-3xl">
      <div class="space-y-5 sm:space-y-4">
        <a href={"?"}
          class="m-1 inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium {
            selectedJobId == null ? selected : unselected}">All</a>
        {#each jobs as job}
          <a href={"?job=" + encodeURIComponent(job.id)} on:click={()=>(formItem = null)}
            class="m-1 inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium {
              selectedJobId == job.id ? selected : unselected}">{job.title.slice(0, 12)}</a>
        {/each}
      </div>
    </div>
  </div>
  <button
    on:click={emptyForm}
    slot="add_button"
    type="button"
    class={t.blue_button}
    >
      <SvgIcon icon="plus" htmlClass="mr-1 h-6 w-6 text-white" />
      New Cost
  </button>
  <thead class="bg-gray-100" slot="thead">
    <tr>
      <th class={t.first_header_column}>Description</th>
      <th class={t.header_column}>Client</th>
      <th class={t.header_column}>Job</th>
      <th class={t.header_column}>Date</th>
      <th class={t.header_column}>Amount</th>
      <th class={t.header_column} />
    </tr>
  </thead>
  <tbody class="bg-white" slot="tbody">
    {#each costs as cost, i}
      <tr class={i % 2 == 0 ? "" : "bg-gray-50"}>
        <td class={t.first_tbody_column}>{desc(cost)}</td>
        <td class={t.tbody_column}>{cost.job.client.full_name}</td>
        <td class={t.tbody_column}>{@html jobTitle(cost)}</td>
        <td class={t.tbody_column}>{cost.purchase_date || ""}</td>
        <td class={t.tbody_column}>{cost.amount}</td>
        <td class={t.tbody_action_column}>
          <AdminActs bind:form={formItem} item={cost} />
        </td>
      </tr>
    {/each}
  </tbody>
</AdminPage>
