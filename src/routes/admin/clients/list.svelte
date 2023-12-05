<script>
  import { t } from "$lib/tailwind.js"

  import AdminPage from "$lib/admin/page.svelte"
  import AdminActs from "$lib/admin/actions.svelte"

  /** @type LoadedClientData */
  export let data

  /** @type {ClientFormItem | undefined} */
  export let formItem
</script>

<AdminPage title="Clients" description="Manage clients">
  <button
    on:click={() =>
      (formItem = {
        id: undefined,
        company_name: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        status: "active",
      })}
    slot="add_button"
    type="button"
    class={t.blue_button}>New Client</button
  >
  <thead class="bg-gray-100" slot="thead">
    <tr>
      <th class={t.header_column}>First Name</th>
      <th class={t.header_column}>Last Name</th>
      <th class={t.header_column}>Phone</th>
      <th class={t.header_column}>Jobs</th>
      <th class={t.header_column} />
    </tr>
  </thead>
  <tbody class="bg-white" slot="tbody">
    {#each data.clients as client, i}
      <tr class={i % 2 == 0 ? "" : "bg-gray-50"}>
        <td class={t.tbody_column}>{client.first_name || ""}</td>
        <td class={t.tbody_column}>{client.last_name || ""}</td>
        <td class={t.tbody_column}>{client.phone}</td>
        <td class={t.tbody_column}>{client.jobs.length}</td>
        <td class={t.tbody_action_column}>
          <AdminActs bind:form={formItem} item={client} />
        </td>
      </tr>
    {/each}
  </tbody>
</AdminPage>
