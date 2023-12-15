import { Client, e } from "$lib/server/database.js"

/**
 * @param {any} user
 */
export async function Clients(user) {

  /**
   * @param {ClientModel} client
   */
  function clientSelection (client) {
    return {
      // first_name: true,
      // last_name: true,
      // company_name: true,
      // street: true,
      // city: true,
      // state: true,
      // zip: true,
      // email: true,
      // phone: true,
      // status: true,
      // user: { email: true, first_name: true, last_name: true, password_hash: true },
      // jobs: true,
      // order_by: client.full_name,
      filter: user.role == 'admin'
        ? null
        : e.op(client.user.email, '=', user.email),
    }
  }
  return await Client.select(clientSelection)
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
export function isClientModel (object) {
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
export async function insertClientModel (object) {
  const client = getClientModel(object)
  console.log('yes!client', client)
  return Client.insert(client)
}
