<script>
  import { page } from '$app/stores';

  import SvgIcon from "$lib/SvgIcons.svelte"
  import { t } from "$lib/tailwind.js"

  export let form

  /** @type {{ id: string; }} */
   export let item

  /** @type {URL} */
  $: url = $page.url;

  /** @type {string | null} */
  $: selectedJobId = url.searchParams.get('job')

  const action = '?/delete'
  let actionQuery = action
  $: actionQuery = selectedJobId ? `${action}&job=${selectedJobId}` : action
</script>

<button on:click={() => (form = item)} class={t.blue_button} title="Edit">
  <SvgIcon icon="pencil" htmlClass="h-6 w-6 text-white" />
</button>

<form action="{actionQuery}" method="POST" class="inline">
  <input type="hidden" name="id" value={item.id} />
  <button class="{t.danger_button}" type="submit" title="Delete">
    <SvgIcon icon="trash" htmlClass="h-6 w-6 text-white" />
  </button>
</form>
