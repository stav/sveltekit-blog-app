// @ts-nocheck
import { Client } from "$lib/server/database.js"
import { getBody } from '$lib/server/request.js'

export function load({ cookies }) {
  return {
    items: Client.select((client) => ({
      id: true,
      email: true,
      phone: true,
      last_name: true,
      first_name: true,
      company_name: true,
      status: true,
      jobs: true,
      order_by: client.full_name,
    })),
  }
}

let getForm = (data) => {
  return {
    company_name: data.get("company_name"),
    first_name: data.get("first_name"),
    last_name: data.get("last_name"),
    email: data.get("email"),
    phone: data.get("phone"),
    status: data.get("status"),
  }
}

export const actions = {
  create: async ({ request }) => {
    const data = await getBody(request)
    try {
      await Client.insert(getForm(data))
    } catch (error) {
      return { error: error.message, form: getForm(data) }
    }
  },
  update: async ({ request }) => {
    const data = await getBody(request)
    const id = data.get("id")
    try {
      await Client.update((client) => ({
        filter_single: { id },
        set: getForm(data),
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
    console.info('clients (delete):', {id, data, bodyUsed: request.bodyUsed});
    let result
    try {
      result = await Client.delete({ filter_single: { id } })
    } catch (error) {
      return { error: error.message }
    }
    console.info('delete', {result})
  },
}
