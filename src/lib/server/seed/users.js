import bcrypt from "bcryptjs"
import { User } from "$lib/server/database.js"

export async function addUsers() {

  console.info('Adding users...')

  // everybody will have the password: "password"
  let password_hash = await bcrypt.hash("password", 10)

  // @ts-ignore
  let addUser = async (user) => {
    if (!user.role) {
      user.role = "user"
    }

    user.avatar_src = "/images/avatars/" + user.username + ".jpeg"
    user.user_auth_token = crypto.randomUUID() // these hashes used for read-only mode

    if (!user.email) {
      user.email = user.username + "@example.com"
    }

    user.password_hash = password_hash
    let result = await User.insert_in_readonly_mode(user)
    console.info("Added user: " + user.username, result.id)
    return result.id
  }

  await addUser({
    username: "victor",
    first_name: "Victor",
    last_name: "VectorBot",
    email: "admin@example.com",
    role: "admin",
  })
  await addUser({
    username: "zander",
    first_name: "Zander",
    last_name: "ByteBot",
    role: "admin",
  })
  await addUser({
    username: "siri",
    first_name: "Siri",
    last_name: "SimpatiBot",
    role: "admin",
  })
  await addUser({
    username: "blaze",
    first_name: "Blaze",
    last_name: "CoggBot",
  })
  await addUser({
    username: "chip",
    first_name: "Chip",
    last_name: "BlitzBot",
  })
  await addUser({
    username: "ava",
    first_name: "Ava",
    last_name: "TarBot",
  })
  await addUser({
    username: "iris",
    first_name: "Iris",
    last_name: "IntelliBot",
  })
  await addUser({
    username: "gigi",
    first_name: "Gigi",
    last_name: "GigaBot",
  })

  console.info('added users.')
}
