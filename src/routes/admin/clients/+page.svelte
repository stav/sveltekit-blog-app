<script>
  // @ts-nocheck
  import FormMessage from "$lib/form-message.svelte"
  import { t } from "$lib/tailwind.js"

  import AdminPage from "$lib/admin/page.svelte"
  import FormField from "$lib/form-field.svelte"
  import AdminForm from "$lib/admin/form.svelte"

  export let data
  let dbData = data.items
  let formItem = null

  /** @type {import('./$types').ActionData} */
  export let form

  if (form?.error) {
    formItem = form.form
  }
</script>

<FormMessage {form} />

{#if formItem}
  <AdminForm {formItem} name="Client">
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
        <option value="active"Active={formItem.role == "active"}>Active</option>
        <option value="archived" selected={formItem.role == "archived"}>Archived</option>
      </select>
    </FormField>
  </AdminForm>
{/if}

<AdminPage title="Clients" description="Manage clients">
  <button
    on:click={() =>
      (formItem = {
        id: null,
        company_name: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        zip: "",
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
      <th class={t.header_column} />
    </tr>
  </thead>
  <tbody class="bg-white" slot="tbody">
    {#each dbData as item, i}
      <tr class={i % 2 == 0 ? "" : "bg-gray-50"}>
        <td class={t.tbody_column}>{item.first_name || ""}</td>
        <td class={t.tbody_column}>{item.last_name || ""}</td>
        <td class={t.tbody_column}>{item.phone}</td>
        <td class={t.tbody_action_column}>
          <a on:click={() => (formItem = item)} href="#" class={t.blue_button}
            >Edit</a
          >
          <form action="?/delete" method="POST" class="inline">
            <input type="hidden" name="id" value={item.id} />
            <input type="submit" class={t.danger_button} value="Delete" />
          </form>
        </td>
      </tr>
    {/each}
  </tbody>
</AdminPage>
