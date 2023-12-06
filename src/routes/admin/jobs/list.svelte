<script>
  import { t } from "$lib/tailwind.js"
  import SvgIcon from "$lib/SvgIcons.svelte"

  import AdminPage from "$lib/admin/page.svelte"
  import AdminActs from "$lib/admin/actions.svelte"

  /**
   * @type {any}
   */
  export let jobs

  /** @type {JobFormItem | undefined} */
  export let formItem

  const emptyForm = () => formItem = {
    title: "",
    client: null,
    beg_date: "",
    end_date: "",
  }
</script>

<AdminPage title="Jobs" description="Manage jobs">
  <button
    on:click={emptyForm}
    slot="add_button"
    type="button"
    class={t.blue_button}
    >
      <SvgIcon icon="plus" htmlClass="mr-1 h-6 w-6 text-white" />
      New Job
  </button>
  <thead class="bg-gray-100" slot="thead">
    <tr>
      <th class={t.first_header_column}>Title</th>
      <th class={t.header_column}>Client</th>
      <th class={t.header_column}>Beginning Date</th>
      <th class={t.header_column}>End Date</th>
      <th class={t.header_column} />
    </tr>
  </thead>
  <tbody class="bg-white" slot="tbody">
    {#each jobs as job, i}
      <tr class={i % 2 == 0 ? "" : "bg-gray-50"}>
        <td class={t.first_tbody_column}>{job.title}</td>
        <td class={t.first_tbody_column}>{job.client.full_name}</td>
        <td class={t.tbody_column}>{job.beg_date || ""}</td>
        <td class={t.tbody_column}>{job.end_date || ""}</td>
        <td class={t.tbody_action_column}>
          <AdminActs bind:form={formItem} item={job} />
        </td>
      </tr>
    {/each}
  </tbody>
</AdminPage>
