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
        immer((set) => ({
            user: {
                pseudo: undefined,
                avatar: undefined,
            },

            hasHydrated: false,

            initializeUser: async (JWT: string) => {
                console.log('🔥 initializeUser')

                const user = await getUserData(JWT)

                if (user) {
                    set({ user })
                }

                console.log(user)
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
                set((state) => {
                    state.user = { ...state.user, ...userData }
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
