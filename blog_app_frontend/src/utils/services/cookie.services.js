import { TOKEN } from "utils/constants/index"

// 24 hour * 60 minutes of every hour
const COOKIE_EXPIRE_MIN = 24 * 60

export const getAuthToken = () => {
  return cookies.get(TOKEN)
}

export const signIn = ({ token }) => {
  cookies.set(TOKEN, token, {
    path: '/',
    expires: new Date((Date.now() + COOKIE_EXPIRE_MIN * 60 * 1000))
  })
}

export const signOut = () => {
  cookies.remove(TOKEN, { path: '/' })
}
