<script>
  import { onMount } from 'svelte'
  import { Badge, Button, Heading, Label, Alert } from 'flowbite-svelte'
  import { DownloadOutline, FileExportOutline, FileImportOutline } from 'flowbite-svelte-icons'

  export let data

  export let form

  /** @type {string} */
  let url

	/** @type {FileList} */
	let files

  let message = ''

	onMount(() => {
    const blob = new Blob([data.clients.json], { type: 'application/json;charset=utf-8' })
    url = URL.createObjectURL(blob)
	});
</script>

<Heading tag="h3" class="mb-4">
  <Badge class="m-2 p-2"> <DownloadOutline /> </Badge>
  Import / Export
</Heading>

<div class="container mb-4 p-2 border-2 rounded-lg">
  <Badge class="mb-2">JSON</Badge> Export <br />
  <a href="{url}" download="coster-export-clients.json">
    <Button>
      <FileExportOutline class="w-3.5 h-3.5 me-2" />
      Export {data.clients.length} Clients
    </Button>
    Download client data to local machine.
  </a>
</div>

<div class="container mb-4 p-2 border-2 rounded-lg">
  <Badge class="mb-1">JSON</Badge> Import <br />
  <form method="post" action="?/upload" enctype="multipart/form-data" class="inline">
    <Label class="space-y-2 mb-2">
      <span>Upload client data to server and import into database.</span>
      <!-- Can't use Fileupload component because the binding lags behind the onChange call -->
      <!-- import { Fileupload } from 'flowbite-svelte' -->
      <!-- <Fileupload name="file" bind:files={files} accept=".json" on:change={papa} /> -->
      <input
        type="file" name="file" bind:files accept=".json"
        class="block w-full disabled:cursor-not-allowed disabled:opacity-50 p-2.5 focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:placeholder-gray-400 border-gray-300 dark:border-gray-600 text-sm rounded-lg border !p-0 dark:text-gray-400"
      />
    </Label>
    {#if files && !message}
      <Button type="submit">
        <FileImportOutline class="w-3.5 h-3.5 me-2" />
        Upload
      </Button>
    {/if}
  </form>
  {#if message}
    <Alert border class="mt-2">
      <strong class="font-bold">Warning</strong>
      <span class="block sm:inline">{message}</span>
    </Alert>
  {:else if form?.success}
    <Alert border color="green" class="mt-2">
      <strong class="font-bold">Success!</strong>
      <span class="block sm:inline">Data uploaded and imported into db.</span>
    </Alert>
  {/if}
</div>
