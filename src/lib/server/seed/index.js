import { User, Post, Comment, Tag } from "$lib/server/database.js"
import { addComments } from "./comments"
import { addPosts } from "./posts"
import { addUsers } from "./users"
import { addTags } from "./tags"

export async function seed() {
  console.log("Seeding database...")

  // uncomment to clear database
  await Comment.delete({})
  await Post.delete({})
  await User.delete({})
  await Tag.delete({})

  // Order is important
  await addTags()
  await addUsers()
  await addPosts()
  await addComments()

  console.log('done seeding.')
}
