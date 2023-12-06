<script>
  import { page } from '$app/stores';

  import SvgIcon from "$lib/SvgIcons.svelte"
  import { t } from "$lib/tailwind.js"

  export let form

  /** @type {{ id: string; }} */
  export let item

  /** @type {string | null} */
  export let href = null

  /** @type {URL} */
  $: url = $page.url;

  /** @type {string | null} */
  $: selectedJobId = url.searchParams.get('job')

  /**
   * @type {string}
   */
  let query
  $: query = selectedJobId ? `&job=${selectedJobId}` : ''
</script>

{#if href}
  <a href="{href}{query}" class={t.blue_button} title="New Job">
    <SvgIcon icon="plus" htmlClass="h-6 w-6 text-white" />
  </a>
{/if}

<button on:click={() => (form = item)} class={t.blue_button} title="Edit">
  <SvgIcon icon="pencil" htmlClass="h-6 w-6 text-white" />
</button>

<form action="?/delete{query}" method="POST" class="inline">
  <input type="hidden" name="id" value={item.id} />
  <button class="{t.danger_button}" type="submit" title="Delete">
    <SvgIcon icon="trash" htmlClass="h-6 w-6 text-white" />
  </button>
</form>
