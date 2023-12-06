import { Job, e } from "$lib/server/database.js"

export function load({ locals }) {
  /**
   * @param {JobModel} job
   */
  function jobSelection(job) {
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
      filter: e.op(job.client.user.email, '=', locals.user.email),
    }
  }

  return {
    jobs: Job.select(jobSelection),
  }
}
