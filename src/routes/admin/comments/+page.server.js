import { Comment, User, Post } from "$lib/server/database.js"

export function load() {
  return {
    items: Comment.select((/** @type {any} */ comment) => ({
      id: true,
      content: true,
      author: { username: true, avatar_src: true, id: true },
      post: { title: true, id: true },
      order_by: comment.created_at,
    })),
    users: User.select((/** @type {any} */ user) => ({
      id: true,
      username: true,
      order_by: user.username,
    })),
    posts: Post.select((/** @type {any} */ post) => ({
      id: true,
      title: true,
      order_by: post.title,
    })),
  }
}

let getForm = (/** @type {FormData} */ data) => {
  return {
    content: data.get("content"),
    author: data.get("author"),
    post: data.get("post"),
  }
}

let getComment = (/** @type {FormData} */ data) => {
  let f = getForm(data)
  let options = {
    content: f.content,
    author: User.select_query({
      filter_single: { id: f.author },
    }),
    post: Post.select_query({
      filter_single: { id: f.post },
    }),
  }
  return options
}

export const actions = {
  create: async ({ request }) => {
    const data = await request.formData()
    try {
      await Comment.insert(getComment(data))
    } catch (/** @type {any} */ error) {
      return { error: error.message, form: getForm(data) }
    }
  },
  update: async ({ request }) => {
    const data = await request.formData()
    try {
      await Comment.update(() => ({
        filter_single: { id: data.get("id") },
        set: getComment(data),
      }))
    } catch (/** @type {any} */ error) {
      let form = getForm(data)
      // @ts-ignore
      form.id = data.get("id")
      return { error: error.message, form: getForm(data) }
    }
  },
  delete: async ({ request }) => {
    const data = await request.formData()
    const id = data.get("id")
    console.info('comments (delete):', {id, data, bodyUsed: request.bodyUsed});
    let result
    try {
      result = await Comment.delete({ filter_single: { id } })
    } catch (/** @type {any} */ error) {
      return { error: error.message }
    }
    console.info('delete', {result})
  },
}
