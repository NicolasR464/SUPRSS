import { UserSchema } from '@/types/user'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

type UserStore = {
    user: Partial<UserSchema>
    setUserData: (userData: Partial<UserSchema>) => void
    resetUserData: () => void
    hasHydrated: boolean
    setHasHydrated: (state: boolean) => void
}

/**
 * This store is used to manage non-sensitive user data, like pseudo, avatarUrl, isPremium status.
 * It provides a method to update the user data partially.
 */
export const useUserStore = create<UserStore>()(
    persist(
        immer((set) => ({
            user: {},

            hasHydrated: false,
            setHasHydrated: (state: boolean): void => {
                set({ hasHydrated: state })
            },

            setUserData: (userData: Partial<UserSchema>): void => {
                set((state) => {
                    state.user = { ...state.user, ...userData }
                })
            },

            resetUserData: (): void => {
                set((state) => {
                    state.user = {} as Partial<UserSchema>
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
