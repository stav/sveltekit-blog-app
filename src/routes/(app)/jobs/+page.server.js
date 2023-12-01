import { Job } from "$lib/server/database.js"

export function load({ url }) {
  // @ts-ignore
  const jobSelection = (job) => {
    return {
      id: true,
      title: true,
      beg_date: true,
      client: { full_name: true },
      costs: { amount: true },
      payments: { amount: true },
      total_cost: true,
      total_earn: true,
      tags: { name: true },
      order_by: job.client.full_name,
    }
  }

  return {
    jobs: Job.select(jobSelection),
  }
}
