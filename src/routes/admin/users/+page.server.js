import { User } from "$lib/server/database.js"

export function load({ cookies }) {
  return {
    items: User.select((/** @type {any} */ user) => ({
      id: true,
      email: true,
      username: true,
      first_name: true,
      last_name: true,
      role: true,
      avatar_src: true,
      order_by: user.username,
    })),
  }
}

let getForm = (/** @type {FormData} */ data) => {
  return {
    username: data.get("username"),
    first_name: data.get("first_name"),
    last_name: data.get("last_name"),
    email: data.get("email"),
    role: data.get("role"),
    avatar_src: data.get("avatar_src"),
  }
}

export const actions = {
  create: async ({ request }) => {
    const data = await request.formData()
    try {
      await User.insert(getForm(data))
    } catch (/** @type {any} */ error) {
      return { error: error.message, form: getForm(data) }
    }
  },
  update: async ({ request }) => {
    const data = await request.formData()
    try {
      await User.update(() => ({
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
    console.info('users (delete):', {id, data, bodyUsed: request.bodyUsed});
    let result
    try {
      result = await User.delete({ filter_single: { id } })
    } catch (/** @type {any} */ error) {
      return { error: error.message }
    }
    console.info('delete', {result})
  },
}
