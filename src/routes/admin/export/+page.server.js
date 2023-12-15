import { objectsFromRequestJson } from "./Requests.js"
import {
  Clients,
  ClientsAsJson,
  insertClientModelForUser,
  isClientModel,
} from "./Clients.js"

/** @returns LoadedClientData */
export async function load({ locals }) {
  const clients = await Clients(locals.user)
  const json = await ClientsAsJson(locals.user)

  return {
    clients: {
      length: clients.length,
      json,
    },
  }
}

export const actions = {
  /**
   * Upload the provided data objects and import them into the database.
   */
  upload: async ({ request, locals }) => {
    const ids = []
    const objects = await objectsFromRequestJson(request)

    // Spin thru the requested data objects
    for (const object of objects) {
      if (isClientModel(object)) {
        try {
          const result = await insertClientModelForUser(object, locals.user)
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
