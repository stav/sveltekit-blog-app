import { Client, e } from "$lib/server/database.js"

/** @returns LoadedClientData */
export async function load({ locals }) {
  /**
   * @param {ClientModel} client
   */
  function clientSelection (client) {
    return {
      first_name: true,
      last_name: true,
      company_name: true,
      street: true,
      city: true,
      state: true,
      zip: true,
      email: true,
      phone: true,
      status: true,
      user: { email: true, first_name: true, last_name: true, password_hash: true },
      jobs: true,
      order_by: client.full_name,
      filter: locals.user.role == 'admin' ? null : e.op(client.user.email, '=', locals.user.email),
    }
  }

  const clients = await Client.select(clientSelection)

  return {
    clients: {
      length: clients.length,
      json: await Client.query('select default::Client {*, jobs: {**}}'),
    },
  }
}

export const actions = {
  upload: async ({ request }) => {
    const data = await request.formData()
    const file = data?.get('file')
    console.log({data, file})
    return { success: true }
  },
}
