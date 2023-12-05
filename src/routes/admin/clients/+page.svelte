<script>
  import { t } from "$lib/tailwind.js"

  import AdminForm from "$lib/admin/form.svelte"
  import AdminPage from "$lib/admin/page.svelte"
  import AdminActs from "$lib/admin/actions.svelte"
  import FormField from "$lib/form-field.svelte"
  import FormMessage from "$lib/form-message.svelte"

  /** @type LoadedClientData */
  export let data

  /** @type {import('./$types').ActionData} */
  export let form

  /** @type {ClientFormItem | undefined} */
  let formItem = form?.error ? form.form : undefined
</script>

<FormMessage {form} />

{#if formItem}
  <AdminForm currentJobId={formItem.id} name="Client">
    <FormField label="First Name" name="first_name">
      <input
        type="text"
        name="first_name"
        value={formItem.first_name}
        class={t.input}
      />
    </FormField>

    <FormField label="Last Name" name="last_name">
      <input
        type="text"
        name="last_name"
        value={formItem.last_name}
        class={t.input}
      />
    </FormField>

    <FormField label="Phone" name="phone">
      <input type="text" name="phone" value={formItem.phone} class={t.input} />
    </FormField>

    <FormField label="Status" name="status">
      <select name="status" class={t.input}>
        <option value="active" selected={formItem.status == "active"}>Active</option>
        <option value="archived" selected={formItem.status == "archived"}>Archived</option>
      </select>
    </FormField>
  </AdminForm>
{/if}

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
