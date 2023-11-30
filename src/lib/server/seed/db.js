import { Tag, User, Post } from "$lib/server/database.js"

/**
 * @param {string} name
 */
export async function selectTagId(name) {
  return (await Tag.select({ filter_single: { name } })).id
}

/**
 * @param {string} username
 */
export async function selectUserId(username) {
  return (await User.select({ filter_single: { username } })).id
}

/**
 * @param {string} slug
 */
export async function selectPostId(slug) {
  return (await Post.select({ filter_single: { slug } })).id
}
