//import type { Handle } from '@sveltejs/kit'
import { User } from "$lib/server/database.js"

let signinRedirect = () => {
  const response = new Response(null, {
    status: 302,
    headers: {
      Location: "/user/sign-in",
    },
  })

  return response
}

export const handle = async ({ event, resolve }) => {
  const isAdminPage = event.url.pathname.startsWith("/admin")
  const session = event.cookies.get("session") // get cookies from browser

  if (!session) {
    console.log('hook handle: NO SESSION')
    // if there is no session load page as normal unless visiting admin page
    if (isAdminPage) {
      return signinRedirect()
    }
    return await resolve(event)
  }

  const user = await User.select({
    id: true,
    username: true,
    first_name: true,
    last_name: true,
    avatar_src: true,
    email: true,
    role: true,
    filter_single: { user_auth_token: session },
  })

  console.log('hook handle: user', typeof user, user)

  // if `user` exists set `events.local`
  if (user) {
    event.locals.user = {
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
      avatar_src: user.avatar_src,
      first_name: user.first_name,
      last_name: user.last_name,
    }
  }
  else {
    console.log('hook handle: NO USER!!!')
    return signinRedirect()
  }

  if (isAdminPage && user.role !== "admin") {
    return signinRedirect()
  }

  return await resolve(event)
}
