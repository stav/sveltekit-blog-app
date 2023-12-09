import { Tag } from "$lib/server/database.js"

export function load({ cookies }) {
  return {
    items: Tag.select((/** @type {any} */ tag) => ({
      id: true,
      name: true,
      order_by: tag.name,
    })),
  }
}

let getForm = (/** @type {FormData} */ data) => {
  return {
    name: data.get("name"),
  }
}

export const actions = {
  create: async ({ request }) => {
    const data = await request.formData()
    try {
      await Tag.insert(getForm(data))
    } catch (/** @type {any} */ error) {
      return { error: error.message, form: getForm(data) }
    }
  },
  update: async ({ request }) => {
    const data = await request.formData()
    try {
      await Tag.update(() => ({
        filter_single: { id: data.get("id") },
        set: getForm(data),
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
    console.info('tags (delete):', {id, data, bodyUsed: request.bodyUsed});
    let result
    try {
      result = await Tag.delete({ filter_single: { id } })
    } catch (/** @type {any} */ error) {
      // @ts-ignore
      return { error: error.message }
    }
    console.info('delete', {result})
  },
}
