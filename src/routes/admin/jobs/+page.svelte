<script>
  import { t } from "$lib/tailwind.js"

  import AdminForm from "$lib/admin/form.svelte"
  import AdminPage from "$lib/admin/page.svelte"
  import AdminActs from "$lib/admin/actions.svelte"
  import DateField from "$lib/date-field.svelte"
  import FormField from "$lib/form-field.svelte"
  import FormMessage from "$lib/form-message.svelte"

  export let data

  let dbData = data.items

  /** @type {{ title: string; client: any; beg_date: string; end_date: string; } | null | undefined} */
  let formItem = null

  /** @type {import('./$types').ActionData} */
  export let form

  if (form?.error) {
    formItem = form.form
  }
</script>

<FormMessage {form} />

{#if formItem}
  <AdminForm currentJobId={formItem.id} name="Job">
    <FormField label="Client" name="client">
      <select name="client" class={t.input}>
        {#each data.clients as client}
          <option selected={formItem?.client?.id == client.id} value={client.id}
            >{client.full_name}</option
          >
        {/each}
      </select>
    </FormField>

    <FormField label="Title" name="title">
      <input
        type="text"
        name="title"
        value={formItem.title}
        class={t.input}
      />
    </FormField>

    <FormField label="Beginning Date" name="beg_date">
      <DateField name="beg_date" value={formItem.beg_date} />
    </FormField>

    <FormField label="Ending Date" name="end_date">
      <DateField name="end_date" value={formItem.end_date} />
    </FormField>
  </AdminForm>
{/if}

<AdminPage title="Jobs" description="Manage jobs">
  <button
    on:click={() =>
      (formItem = {
        title: "",
        client: null,
        beg_date: "",
        end_date: "",
      })}
    slot="add_button"
    type="button"
    class={t.blue_button}>New Job</button
  >
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
    {#each dbData as item, i}
      <tr class={i % 2 == 0 ? "" : "bg-gray-50"}>
        <td class={t.first_tbody_column}>{item.title}</td>
        <td class={t.first_tbody_column}>{item.client.full_name}</td>
        <td class={t.tbody_column}>{item.beg_date || ""}</td>
        <td class={t.tbody_column}>{item.end_date || ""}</td>
        <td class={t.tbody_action_column}>
          <AdminActs bind:form={formItem} {item} />
        </td>
      </tr>
    {/each}
  </tbody>
</AdminPage>
