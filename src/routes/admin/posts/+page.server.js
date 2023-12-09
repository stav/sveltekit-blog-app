import { Post, User, Tag } from "$lib/server/database.js"

export function load({ cookies }) {
  return {
    items: Post.select((/** @type {any} */ post) => ({
      id: true,
      title: true,
      slug: true,
      content: true,
      snippet: true,
      author: { username: true, avatar_src: true, id: true },
      tags: { name: true, id: true },
      image_src: true,
      order_by: post.title,
    })),
    users: User.select((/** @type {any} */ user) => ({
      id: true,
      username: true,
      order_by: user.username,
    })),
    tags: Tag.select((/** @type {any} */ tag) => ({
      id: true,
      name: true,
      order_by: tag.name,
    })),
  }
}

let getForm = (/** @type {any} */ data) => {
  return {
    title: data.get("title"),
    slug: data.get("slug"),
    content: data.get("content"),
    author: data.get("author"),
    snippet: data.get("snippet"),
    tags: data.getAll("tags"),
    image_src: data.get("image_src"),
  }
}

let getPost = (/** @type {any} */ data) => {
  let f = getForm(data)
  return {
    title: f.title,
    slug: f.slug,
    content: f.content,
    snippet: f.snippet,
    author: User.select_query({
      filter_single: { id: f.author },
    }),
    tags: Tag.select_query_by_ids(f.tags),
    image_src: f.image_src,
  }
}

export const actions = {
  create: async ({ request }) => {
    const data = await request.formData()
    try {
      await Post.insert(getPost(data))
    } catch (/** @type {any} */ error) {
      return { error: error.message, form: getForm(data) }
    }
  },
  update: async ({ request }) => {
    const data = await request.formData()
    try {
      await Post.update(() => ({
        filter_single: { id: data.get("id") },
        set: getPost(data),
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
    console.info('posts (delete):', {id, data, bodyUsed: request.bodyUsed});
    let result
    try {
      result = await Post.delete({ filter_single: { id } })
    } catch (/** @type {any} */ error) {
      // @ts-ignore
      return { error: error.message }
    }
    console.info('delete', {result})
  },
}
