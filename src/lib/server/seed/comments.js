// @ts-nocheck
import { selectPostId, selectUserId } from "./db"
import { User, Comment, Post } from "$lib/server/database.js"

// We assume the tags, users & posts already exist
export async function addComments() {

  // jank
  let sveltekit_post_id = await selectPostId("sveltekit-simplifies-web-app-development")
  let tailwind_post_id = await selectPostId("how-tailwind's-utility-first-design-improves-css-development")
  let edgedb_post_id = await selectPostId("the-rise-of-edgedb-a-new-era-in-database-technology")

  await addComment({
    content:
      "I used to think web development was hard, but then I discovered SvelteKit and now I'm pretty sure I'm a genius.",
    author: await selectUserId("zander"),
    post: sveltekit_post_id,
  })

  await addComment({
    content:
      "SvelteKit is so easy to use, it's like a walk in the park. Except the park is filled with unicorns and rainbows.",
    author: await selectUserId("gigi"),
    post: sveltekit_post_id,
  })

  await addComment({
    content:
      "SQL may have a 1732-page manual, but EdgeDB only needs one word: awesome.",
    author: await selectUserId("iris"),
    post: edgedb_post_id,
  })

  await addComment({
    content:
      "I'm pretty sure EdgeDB was created by a secret society of database ninjas.",
    author: await selectUserId("chip"),
    post: edgedb_post_id,
  })

  await addComment({
    content:
      "I'm convinced Tailwind CSS was sent from the future to save us from CSS-related headaches.",
    author: await selectUserId("ava"),
    post: tailwind_post_id,
  })

  await addComment({
    content:
      "If only I had Tailwind CSS when I was designing my Myspace page in 2006.",
    author: await selectUserId("chip"),
    post: tailwind_post_id,
  })
}

/**
 * @param {Comment} comment
 */
async function addComment(comment) {
  const result = await Comment.insert_in_readonly_mode({
    content: comment.content,
    author: User.select_query({
      filter_single: { id: comment.author },
    }),
    post: Post.select_query({
      filter_single: { id: comment.post },
    }),
  })
  console.log("added comment", comment.content, result.id)
}
