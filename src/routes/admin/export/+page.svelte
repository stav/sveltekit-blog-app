<script>
  import { onMount } from 'svelte'
  import { Button, Heading } from 'flowbite-svelte'
  import { DownloadOutline } from 'flowbite-svelte-icons'

  export let data

  let blob

  /** @type {string} */
  let url

	onMount(() => {
    blob = new Blob([data.clients.csv], { type: 'text/csv;charset=utf-8' })
    url = URL.createObjectURL(blob)
	});
</script>

<Heading tag="h3" class="mb-8"> Export </Heading>

<a href="{url}" download="export.csv">
  <Button>
    <DownloadOutline class="w-3.5 h-3.5 me-2" />
    {data.clients.length}
    Clients
  </Button>
</a>
