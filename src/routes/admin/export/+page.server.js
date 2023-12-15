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

/**
 * @param {any} object
 * @returns {ClientModel}
 */
function getClientModel (object) {
  const fields = [
    'company_name',
    'first_name',
    'last_name',
    'status',
    'email',
    'phone',
  ]
  /** @type {TransientModel} */
  const model = {}

  for (const field of fields) {
    model[field] = object[field]
  }
  // @ts-ignore
  return model
}

/**
 * @param {any} object
 * @returns {boolean}
 */
function isClientModel (object) {
  const fields = [
    'company_name',
    'first_name',
    'last_name',
    'status',
    'email',
    'phone',
    'jobs',
  ]
  return fields.every(field => Object.hasOwn(object, field))
}

/**
 * @param {ClientModel} object
 * @returns {Promise<{ id: typeof e.uuid}>}
 */
async function insertClientModel (object) {
  const client = getClientModel(object)
  console.log('yes!client', client)
  return Client.insert(client)
}

export const actions = {
  /**
   * Upload the provided data objects and import them into the database.
   */
  upload: async ({ request }) => {
    // Pull file from Request
    const data = await request.formData()
    const file = data?.get('file')
    // @ts-ignore
    const name = file?.name
    // @ts-ignore
    const text = await file?.text()

    // Parse file contents as JSON
    let objects = JSON.parse(text)
    if (objects.length === undefined) {
      objects = [objects]
    }
    console.log(objects.length, 'object')

    const ids = []

    // Spin thru the requested data objects
    for (let i = 0; i < objects.length; i++) {
      const object = objects[i]
      const instance = isClientModel(object)
      console.log({i, name, object, instance})

      if (isClientModel(object)) {
        try {
          const result = await insertClientModel(object)
          ids.push(result.id)
        }
        catch (/** @type {any} */ error) {
          return { error: `Inserted ${ids.length} Clients ${ids} and got this error: ${error.message}` }
        }
      }
    }

    // Verify success or failure
    if (ids.length > 0) {
      const success = `${ids.length} Client record${ids.length > 1 ? 's' : ''} inserted: [${ids}]`
      console.log(success)
      return { success }
    }
    return { error: 'No records inserted.'}
  }
}
