<script>
  import SvgIcon from "$lib/SvgIcons.svelte"
  import { t } from "$lib/tailwind.js"

  export let form

  /** @type {{ description: any; id: any; }} */
   export let item
</script>

<button on:click={() => (form = item)} class={t.blue_button} title="Edit">
  <SvgIcon icon="pencil" htmlClass="h-6 w-6 text-white" />
</button>
<form action="?/delete" method="POST" class="inline">
  <input type="hidden" name="id" value={item.id} />
  <button class="{t.danger_button}" type="submit" title="Delete">
    <SvgIcon icon="trash" htmlClass="h-6 w-6 text-white" />
  </button>
</form>
