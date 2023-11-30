import { Tag } from "$lib/server/database.js"

export async function addTags() {
  let addTag = async (/** @type {string} */ name) => {
    let result = await Tag.insert_in_readonly_mode({ name })
    console.log("Added tag: " + name, result.id)
    return result.id
  }

  console.log('Adding tags...')
  await addTag("SvelteKit")
  await addTag("Tailwind")
  await addTag("Database")
  await addTag("EdgeDB")
  console.log('Added tags.')
}
