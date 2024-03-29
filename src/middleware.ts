import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: ['/login'],
  // Routes that can always be accessed, and have
  // no authentication information
  ignoredRoutes: [],
})
