import { Client, Job, e } from "$lib/server/database.js"

export const load = async ({ locals }) => {

  /**
   * @param {ClientModel} client
   */
  function clientSelection (client) {
    return {
      full_name: true,
      filter: e.op(client.user.email, '=', locals.user?.email || ''),
    }
  }
  /**
   * @param {JobModel} job
   */
  function jobSelection (job) {
    return {
      title: true,
      filter: e.op(job.client.user.email, '=', locals.user?.email || ''),
    }}

  return {
    user: locals.user, // get `locals.user` and pass it to the `page` store
    jobs: Job.select(jobSelection),
    clients: Client.select(clientSelection),
  }
}
