import { avatarPlaceholder } from '@/utils/constants/avatarPlaceholder'
import { UserSchema } from '@/types/user'
import { getUserData } from '@/utils/apiCalls/user'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

type UserStore = {
    user: Partial<UserSchema>
    setUserData: (userData: Partial<UserSchema>) => void
    resetUserData: () => void
    hasHydrated: boolean
    setHasHydrated: (state: boolean) => void
    initializeUser: (JWT: string) => Promise<void>
}

/**
 * This store is used to manage non-sensitive user data.
 * It provides a method to update the user data partially.
 */
export const useUserStore = create<UserStore>()(
    persist(
        immer((set, get) => ({
            user: {
                pseudo: undefined,
                avatar: undefined,
            },

            hasHydrated: false,

            initializeUser: async (JWT: string) => {
                console.log('🔥 initializeUser')

                const { setUserData } = get()

                const userResponse = await getUserData(JWT)

                if (userResponse) {
                    console.log({ userResponse })

                    const data = {
                        pseudo: userResponse.pseudo ?? 'Anonymous',
                        avatar: userResponse.avatar ?? avatarPlaceholder,
                        ...(userResponse.notifications && {
                            notifications: userResponse.notifications,
                        }),
                        ...(userResponse.collectionsSubscriptions && {
                            collectionsSubscriptions:
                                userResponse.collectionsSubscriptions,
                        }),
                        ...(userResponse.feedSubscriptions && {
                            feedSubscriptions: userResponse.feedSubscriptions,
                        }),
                        ...(userResponse.articles && {
                            articles: userResponse.articles,
                        }),
                    }

                    setUserData(data)
                }

                console.log(userResponse)
            },

            resetUserData: (): void => {
                set((state) => {
                    state.user = {} as Partial<UserSchema>
                })
            },

            setHasHydrated: (state: boolean): void => {
                set({ hasHydrated: state })
            },

            setUserData: (userData: Partial<UserSchema>): void => {
                const newUserdata = {
                    pseudo: userData.pseudo ?? 'Anonymous',
                    avatar: userData.avatar ?? avatarPlaceholder,
                    ...(userData.notifications && {
                        notifications: userData.notifications,
                    }),
                    ...(userData.collectionsSubscriptions && {
                        collectionsSubscriptions:
                            userData.collectionsSubscriptions,
                    }),
                    ...(userData.feedSubscriptions && {
                        feedSubscriptions: userData.feedSubscriptions,
                    }),
                    ...(userData.articles && {
                        articles: userData.articles,
                    }),
                }

                set((state) => {
                    state.user = { ...state.user, ...newUserdata }
                })
            },
        })),

        {
            name: 'user-store',
            onRehydrateStorage:
                () =>
                (state: UserStore | undefined): void => {
                    state?.setHasHydrated(true)
                },
        }
    )
)
