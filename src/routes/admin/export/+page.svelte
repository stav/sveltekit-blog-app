<script>
  import { onMount } from "svelte"
  import { Badge, Button, Fileupload, Heading, Label, Alert } from "flowbite-svelte"
  import { DownloadOutline, FileExportOutline, FileImportOutline } from "flowbite-svelte-icons"

  export let data

  export let form

  /** @type {string} */
  let url

  /** @type {FileList} */
  let files

  let message = ''

  let jsonContents = ''

  onMount(() => {
    const blob = new Blob([data.clients.json], {
      type: "application/jsoncharset=utf-8",
    })
    url = URL.createObjectURL(blob)
  })

  /**
   * @this {any}
   */
  function parseFileContents () {
    if (this.files) { // this.files is the same as arg event.target.files
      /** @type {File} */
      const file = this.files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        form = null
        message = ''
        try {
          // Show file contents
          jsonContents = file.size + ' ' + file.type + '\n'
          let fileContents = e.target?.result?.toString() ?? ''
          jsonContents += fileContents

          // Format content as JSON
          const obj = JSON.parse(fileContents)
          fileContents = JSON.stringify(obj, null, '    ')
          jsonContents = file.size + ' ' + file.type + '\n' + fileContents.substring(0, 1024)
        }
        catch (/** @type any */ error) {
          message = error.message
        }
      }
      reader.readAsBinaryString(file)
    }
  }
</script>

<Heading tag="h3" class="mb-4">
  <Badge class="m-2 p-2"><DownloadOutline /></Badge>
  Import / Export
</Heading>

<div class="container mb-4 p-2 border-2 rounded-lg">
  <Badge class="mb-2">JSON</Badge> Export <br />
  <a href={url} download="coster-export-clients.json">
    <Button>
      <FileExportOutline class="w-3.5 h-3.5 me-2" />
      Export {data.clients.length} Clients
    </Button>
    Download client data to local machine.
  </a>
</div>

<div class="container mb-4 p-2 border-2 rounded-lg">
  <Badge class="mb-1">JSON</Badge> Import <br />

  <form method="POST" action="?/upload" enctype="multipart/form-data">
    <Label class="space-y-2 mb-2">
      <span>Upload client data to server and import into database.</span>
      <Fileupload name="file" bind:files accept=".json" on:change={parseFileContents} />
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

  <pre class="mt-2">{jsonContents}</pre>
</div>
