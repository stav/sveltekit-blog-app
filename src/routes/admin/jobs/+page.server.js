// @ts-nocheck
import { Client, Job, Tag } from "$lib/server/database.js"
import { getBody } from '$lib/server/request.js'

export function load({ cookies }) {
  return {
    items: Job.select((job) => ({
      id: true,
      client: true,
      title: true,
      tags: true,
      beg_date: true,
      end_date: true,
      order_by: job.client.full_name,
    })),
    clients: Client.select((client) => ({
      id: true,
      full_name: true,
      order_by: client.full_name,
    })),
    tags: Tag.select((tag) => ({
      id: true,
      name: true,
      order_by: tag.name,
    })),
  }
}

let getForm = (data) => {
  return {
    title: data.get("title"),
    client: data.get("client"),
    beg_date: data.get("beg_date"),
    end_date: data.get("end_date"),
  }
}

let getClient = (data) => {
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
    const data = await getBody(request)
    try {
      await Job.insert(getClient(data))
    } catch (error) {
      return { error: error.message, form: getForm(data) }
    }
  },
  update: async ({ request }) => {
    const data = await getBody(request)
    const id = data.get("id")
    try {
      await Job.update((job) => ({
        filter_single: { id },
        set: getClient(data),
      }))
    } catch (error) {
      let form = getForm(data)
      form.id = data.get("id")
      return { error: error.message, form: form }
    }
  },
  delete: async ({ request }) => {
    const data = await getBody(request)
    const id = data.get("id")
    console.info('jobs (delete):', {id, data, bodyUsed: request.bodyUsed});
    let result
    try {
      result = await Job.delete({ filter_single: { id } })
    } catch (error) {
      return { error: error.message }
    }
    console.info('delete', {result})
  },
}
