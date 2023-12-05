<script>
  import { t } from "$lib/tailwind.js"

  import AdminForm from "$lib/admin/form.svelte"
  import FormField from "$lib/form-field.svelte"

  /** @type {ClientFormItem | undefined} */
  export let formItem
</script>

<AdminForm currentJobId={formItem?.id} name="Client">
  <FormField label="First Name" name="first_name">
    <input
      type="text"
      name="first_name"
      value={formItem?.first_name}
      class={t.input}
    />
  </FormField>

  <FormField label="Last Name" name="last_name">
    <input
      type="text"
      name="last_name"
      value={formItem?.last_name}
      class={t.input}
    />
  </FormField>

  <FormField label="Phone" name="phone">
    <input type="text" name="phone" value={formItem?.phone} class={t.input} />
  </FormField>

  <FormField label="Status" name="status">
    <select name="status" class={t.input}>
      <option value="active" selected={formItem?.status == "active"}>Active</option>
      <option value="archived" selected={formItem?.status == "archived"}>Archived</option>
    </select>
  </FormField>
</AdminForm>
