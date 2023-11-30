<script>
  import { t } from "$lib/tailwind.js"
  export let data

    const _USD = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    })

  /**
   * @param {number} val
   */
  function USD (val) {
    return _USD.format(val)
  }

  /**
   * @param {number} val
   */
   function PCT (val) {
    return val.toLocaleString(undefined,{style: 'percent', minimumFractionDigits:0});
  }
</script>

<svelte:head>
  <meta name="description" content="Job Costing reports">
</svelte:head>

<div
  class="relative bg-gray-50 px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28"
>
  <div class="absolute inset-0">
    <div class="h-1/3 bg-gray-50 sm:h-2/3" />
  </div>
  <div class="relative mx-auto max-w-7xl">
    <div class="text-center">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Job Costing Reports
      </h2>
      <p class="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
        How much money did we actually make?
      </p>
    </div>
    <div class="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
      <table>
        <thead class="bg-gray-100">
          <tr>
            <th class={t.header_column}>Date</th>
            <th class={t.header_column}>Client</th>
            <th class={t.header_column}>Title</th>
            <th class={t.header_column}>Earnings</th>
            <th class={t.header_column}>Costs</th>
            <th class={t.header_column}>Profit</th>
            <th class={t.header_column}>Margin</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          {#each data.jobs as job, i}
            <tr class={i % 2 == 0 ? "" : "bg-gray-50"}>
              <td class={t.tbody_column}>{job.beg_date}</td>
              <td class={t.tbody_column}>{job.client.full_name}</td>
              <td class={t.tbody_column}>{job.title}</td>
              <td class={t.tbody_column}>{USD(job.total_earn)} ({job.payments.length})</td>
              <td class={t.tbody_column}>{USD(job.total_cost)} ({job.costs.length})</td>
              <td class={t.tbody_column}>{USD(job.total_earn - job.total_cost)}</td>
              <td class={t.tbody_column}>{PCT((job.total_earn - job.total_cost) / job.total_earn)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>
