<script>
  import { t } from "$lib/tailwind.js"

  import AdminForm from "$lib/admin/form.svelte"
  import DateField from "$lib/date-field.svelte"
  import FormField from "$lib/form-field.svelte"

  /**
   * @type {any}
   */
  export let clients

  /** @type {JobFormItem | undefined} */
  export let formItem
</script>

<AdminForm currentJobId={formItem?.id} name="Job">
  <FormField label="Client" name="client">
    <select name="client" class={t.input}>
      {#each clients as client}
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
      value={formItem?.title}
      class={t.input}
    />
  </FormField>

  <FormField label="Beginning Date" name="beg_date">
    <DateField name="beg_date" value={formItem?.beg_date ?? ''} />
  </FormField>

  <!-- Uncaught (in promise) TypeError: selectedDates is undefined -->
  <!-- <FormField label="Ending Date" name="end_date">
    <DateField name="end_date" value={formItem?.end_date ?? ''} />
  </FormField> -->

</AdminForm>
