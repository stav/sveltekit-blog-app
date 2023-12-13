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

const fields = [
  'id',
  'created_at',
  'email',
  'phone',
  'last_name',
  'first_name',
  'full_name',
  'company_name',
  'status',
  'jobs',
  'user',
]

/**
 * @param {any} element
 * @returns {ClientModel}
 */
function getModel (element) {
  /** @type {TransientModel} */
  const model = {}

  for (const field of fields) {
    model[field] = element[field]
  }
  // @ts-ignore
  return model
}

/**
 * @param {any} object
 */
function isModel (object) {
  return fields.every(field => Object.hasOwn(object, field))
}

export const actions = {
  upload: async ({ request }) => {
    const data = await request.formData()
    const file = data?.get('file')
    // @ts-ignore
    const name = file?.name
    // @ts-ignore
    const text = await file?.text()
    const objs = JSON.parse(text)
    console.log(objs.length)
    for (let i = 0; i < objs.length; i++) {
      const element = objs[i]
      const model = getModel(element)
      const instance = isModel(element)
      console.log({i, name, element, instance, model})
      if (isModel(element)) {
        // insert into db
      }
    }
    return { success: true }
  },
}
