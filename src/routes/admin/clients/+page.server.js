import { Client, User, e } from "$lib/server/database.js"

/** @returns LoadedClientData */
export function load({ locals }) {
  /**
   * @param {{
   *   full_name: string;
   *   user: { email: string; };
   * }} client
   */
  function clientSelection (client) {
    return {
      id: true,
      email: true,
      phone: true,
      last_name: true,
      first_name: true,
      company_name: true,
      full_name: true,
      status: true,
      jobs: true,
      user: { email: true },
      order_by: client.full_name,
      filter: e.op(client.user.email, '=', locals.user.email),
    }
  }

  return {
    clients: Client.select(clientSelection),
  }
}

/**
 * @param {FormData} data
 */
function getForm (data) {
  return {
    company_name: data.get("company_name"),
    first_name: data.get("first_name"),
    last_name: data.get("last_name"),
    email: data.get("email"),
    phone: data.get("phone"),
    status: data.get("status"),
  }
}

/**
 * Assign the client object to the current user.
 *
 * @param {FormData} data
 * @param {string} id
 */
function readyClient (data, id) {
  return {
    ...getForm(data),
    user: User.select_query({ filter_single: { id } })
  }
}

/** @type {import('./$types').Actions} */
export const actions = {
  create: async ({ request, locals }) => {
    const data = await request.formData()
    try {
      // @ts-ignore
      const clientData = readyClient(data, locals.user.id)
      await Client.insert(clientData)
    } catch (/** @type {any} */ error) {
      return { error: error.message, form: getForm(data) }
    }
  },
  update: async ({ request }) => {
    const data = await request.formData()
    const id = data.get("id")
    try {
      await Client.update(() => ({
        filter_single: { id },
        set: getForm(data),
      }))
    } catch (/** @type {any} */ error) {
      let form = { id: data.get('id'), ...getForm(data) }
      return { error: error.message, form }
    }
  },
  delete: async ({ request }) => {
    const data = await request.formData()
    const id = data.get("id")
    console.info('clients (delete):', {id, data, bodyUsed: request.bodyUsed});
    let result
    try {
      result = await Client.delete({ filter_single: { id } })
    } catch (/** @type {any} */ error) {
      return { error: error.message }
    }
    console.info('delete', {result})
  },
}
