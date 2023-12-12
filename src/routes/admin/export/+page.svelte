<script>
  import { onMount } from 'svelte'
  import { Badge, Button, Heading, Fileupload, Label, Alert } from 'flowbite-svelte'
  import { DownloadOutline, FileExportOutline, FileImportOutline } from 'flowbite-svelte-icons'

  export let data

  export let form

  /** @type {Blob} */
  let blob

  /** @type {string} */
  let url

	/** @type {FileList} */
	let files

	onMount(() => {
    blob = new Blob([data.clients.csv], { type: 'text/csv;charset=utf-8' })
    url = URL.createObjectURL(blob)
	});
</script>

<Heading tag="h3" class="mb-4">
  <Badge class="m-2 p-2"> <DownloadOutline /> </Badge>
  Transport Clients
</Heading>

<div class="container mb-4 p-2 border-2 rounded-lg">
  <a href="{url}" download="export.csv">
    <Button>
      <FileExportOutline class="w-3.5 h-3.5 me-2" />
      Export {data.clients.length} Clients
    </Button>
    Download client data to local machine.
  </a>
</div>

<div class="container mb-4 p-2 border-2 rounded-lg">
  <form method="post" action="?/upload" enctype="multipart/form-data" class="inline">
    <Label class="space-y-2 mb-2">
      <span>Upload client data to server and import into database.</span>
      <Fileupload name="file" bind:files />
    </Label>
    {#if files}
      <Button type="submit">
        <FileImportOutline class="w-3.5 h-3.5 me-2" />
        Upload
      </Button>
    {/if}
  </form>
  {#if form?.success}
    <Alert border color="green">
      <strong class="font-bold">Success!</strong>
      <span class="block sm:inline">Data uploaded and imported into db.</span>
    </Alert>
  {/if}
</div>
