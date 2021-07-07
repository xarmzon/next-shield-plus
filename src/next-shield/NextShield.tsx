import type { NextRouter } from 'next/router'
import type { ElementType, ReactNode } from 'react'
import { useEffect } from 'react'

type Union<T extends any[]> = T extends (infer U)[] ? U : never

export interface NextShieldProps<
  PrivateRoutesList extends string[],
  PublicRoutesList extends string[]
> {
  /**
   * 🔑 This value must be provided by the state of your app. Indicates if the user is authenticated or not.
   *
   * @example
   * Here is a simple example with firebase auth. But applies the same logic for any auth provider. 😋
   * @example
   * ```ts
   * const [isAuth, setAuth] = useState(false)
   * useEffect(() => {
   *  const unsubscribe = auth().onAuthStateChanged(user => {
   *    if (user) {
   *       setAuth(true)
   *       return
   *     }
   *
   *    setAuth(false)
   *   })
   *
   *   return () => unsubscribe()
   * }, [isAuth])
   * ```
   */
  isAuth: boolean
  /**
   * ⏳ This value must be provided by the state of your app. Indicates if the user is already available or not.
   *
   * @example
   * Here is a simple example with firebase auth. But applies the same logic for any auth provider. 😋
   * @example
   * ```ts
   * const [isAuth, setAuth] = useState(false)
   * const [isLoading, setLoading] = useState(true)
   * useEffect(() => {
   *   const unsubscribe = auth().onAuthStateChanged(user => {
   *     if (user) {
   *       setAuth(true)
   *       setLoading(false)
   *       return
   *     }
   *
   *     setAuth(false)
   *     setLoading(false)
   *   })
   *
   *   return () => unsubscribe()
   * }, [isAuth])
   * ```
   */
  isLoading: boolean
  /**
   * ⇆ Instance of your router.
   *
   * @example
   * ```tsx
   * const router = useRouter()
   * ...
   * return (
   *  <NextShield
   *    ...
   *    router={router}
   *    ...
   *  >
   *    <Component {...pageProps} />
   *  </NextShield>
   * )
   * ```
   */
  router: NextRouter
  /**
   * 📋 Login page, must be a public route.
   *
   * @example
   * ```tsx
   * ...
   * return (
   *  <NextShield
   *    ...
   *    loginRoute="/login"
   *    ...
   *  >
   *    <Component {...pageProps} />
   *  </NextShield>
   * )
   * ```
   */
  loginRoute: Union<PublicRoutesList>
  /**
   * 🚧 Private route where your user is going to access after login.
   *
   * @example
   * ```tsx
   * ...
   * return (
   *  <NextShield
   *    ...
   *    accessRoute="/control-panel"
   *    ...
   *  >
   *    <Component {...pageProps} />
   *  </NextShield>
   * )
   * ```
   */
  accessRoute: Union<PrivateRoutesList>
  /**
   * 🚧 🚧 🚧 Array of private routes. These are only accessible when the user is authenticated.
   *
   * @example
   * ```ts
   * const privateRoutes = ['/control-panel', '/sales', '/user/[id]']
   * ```
   */
  privateRoutes: PrivateRoutesList
  /**
   * 👀 👀 👀 Array of public routes. These are only accessible when the user is NOT authenticated.
   *
   * @example
   * ```ts
   * const publicRoutes = ['/', '/login', '/services/[slug]']
   * ```
   */
  publicRoutes: PublicRoutesList
  /**
   * 🚦🚦🚦 Array of hybrid routes. These are always accessible; doesn't matter the user state.
   * You are not required to use this prop, it's only helpful if you wanna track which routes are always accessible.
   * @example
   * ```ts
   * const hybridRoutes = ['/support', '/pricing', '/products/[slug]']
   * ```
   */
  hybridRoutes?: string[]
  /**
   * Functional Component which is going to appear when `isLoading` equals to `true`
   *
   * @example
   * ```tsx
   * export function Loading() {
   *   return <p>Loading...</p>
   * }
   * ```
   *
   * `_app.tsx`:
   *
   * ```tsx
   * import { Loading } from '@components/routes/loading'
   *
   * const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
   *   return (
   *     <NextShield
   *       ...
   *       LoadingComponent={Loading}
   *       ...
   *     >
   *       <Component {...pageProps} />
   *     </NextShield>
   *   )
   * }
   * ```
   */
  LoadingComponent: ElementType<unknown>
}

/**
 * 😉 Component designed to protect the routes of your app. You must use this component as a wrapper in your `_app.tsx` file.
 * 
 * @typeParam NextShieldProps - {@link NextShieldProps | see definition here}
 * @returns NextShield Component
 * 
 * @example
 * ```tsx
 * import { Loading } from '@components/routes/loading'
 * 
 * const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
 *  const { isAuth, isLoading } = useAuth()
 *  const router = useRouter()

 *  const privateRoutes = ['/protected']
 *  const publicRoutes = ['/']
 *  const hybridRoutes = ['/products/[slug]']

 *  return (
 *    <NextShield
 *      isAuth={isAuth}
 *      isLoading={isLoading}
 *      router={router}
 *      privateRoutes={privateRoutes}
 *      publicRoutes={publicRoutes}
 *      hybridRoutes={hybridRoutes}
 *      LoadingComponent={Loading}
 *    >
 *      <Component {...pageProps} />
 *    </NextShield>
 *   )
 * }

 * export default MyApp
 * ```
 * @packageDocumentation
 */

export function NextShield<
  PrivateRoutesList extends string[],
  PublicRoutesList extends string[]
>({
  isAuth,
  isLoading,
  router,
  loginRoute,
  accessRoute,
  privateRoutes,
  publicRoutes,
  hybridRoutes,
  LoadingComponent,
  children,
}: NextShieldProps<PrivateRoutesList, PublicRoutesList> & { children: ReactNode }) {
  const pathIsPrivate = privateRoutes.indexOf(router.pathname) !== -1
  const pathIsPublic = publicRoutes.indexOf(router.pathname) !== -1
  const pathIsHybrid = hybridRoutes?.indexOf(router.pathname) !== -1

  useEffect(() => {
    if (!isAuth && !isLoading && pathIsPrivate) router.replace(loginRoute)
    if (isAuth && !isLoading && pathIsPublic) router.replace(accessRoute)
  }, [router, isAuth, isLoading, pathIsPrivate, pathIsPublic])

  if (
    ((isLoading || !isAuth) && pathIsPrivate) ||
    ((isLoading || isAuth) && pathIsPublic) ||
    (isLoading && pathIsHybrid)
  )
    return <>{LoadingComponent}</>

  return <>{children}</>
}
