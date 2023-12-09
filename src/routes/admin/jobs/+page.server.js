import { Client, Job, e } from "$lib/server/database.js"

export function load({ locals }) {
  /**
   * @param {{ client: { full_name: string; user: { email: string } }; }} job
   */
  function jobSelection (job) {
    return {
      id: true,
      client: { id: true, full_name: true, user: { email: true } },
      title: true,
      tags: true,
      beg_date: true,
      end_date: true,
      order_by: job.client.full_name,
      filter: e.op(job.client.user.email, '=', locals.user.email),
    }
  }

  /**
   * @param {ClientModel} client
   */
  function clientsSelection (client) {
    return {
      id: true,
      full_name: true,
      order_by: client.full_name,
      filter: e.op(client.user.email, '=', locals.user.email),
    }
  }

  return {
    jobs: Job.select(jobSelection),
    clients: Client.select(clientsSelection),
  }
}

let getForm = (/** @type {FormData} */ data) => {
  return {
    title: data.get("title"),
    client: data.get("client"),
    beg_date: data.get("beg_date"),
    end_date: data.get("end_date"),
  }
}

let getJob = (/** @type {FormData} */ data) => {
  let f = getForm(data)
  return {
    title: f.title,
    beg_date: f.beg_date,
    end_date: f.end_date,
    client: Client.select_query({
      filter_single: { id: f.client },
    }),
  }
}

export const actions = {
  create: async ({ request }) => {
    const data = await request.formData()
    try {
      await Job.insert(getJob(data))
    } catch (/** @type {any} */ error) {
      return { error: error.message, form: getForm(data) }
    }
  },
  update: async ({ request }) => {
    const data = await request.formData()
    const id = data.get("id")
    try {
      await Job.update(() => ({
        filter_single: { id },
        set: getJob(data),
      }))
    } catch (/** @type {any} */ error) {
      let form = getForm(data)
      // @ts-ignore
      form.id = data.get("id")
      return { error: error.message, form: form }
    }
  },
  delete: async ({ request }) => {
    const data = await request.formData()
    const id = data.get("id")
    console.info('jobs (delete):', {id, data, bodyUsed: request.bodyUsed});
    let result
    try {
      result = await Job.delete({ filter_single: { id } })
    } catch (/** @type {any} */ error) {
      return { error: error.message }
    }
    console.info('delete', {result})
  },
}
