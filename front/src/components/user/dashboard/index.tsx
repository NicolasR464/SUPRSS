'use client'

import { useUserStore } from '@/store/user'
import { useAuth, useUser } from '@clerk/clerk-react'
import { UserOnboarding } from '../onboarding'
import { useEffect } from 'react'

export const UserDashboard = () => {
    const { isSignedIn } = useUser()
    const { getToken } = useAuth()

    const initializeUser = useUserStore((state) => state.initializeUser)
    const userStore = useUserStore((state) => state.user)
    const hasHydrated = useUserStore((state) => state.hasHydrated)

    useEffect(() => {
        const getUserData = async () => {
            const JWT = await getToken()

            if (JWT) await initializeUser(JWT)
        }

        if (isSignedIn && !userStore.pseudo) getUserData()
    }, [getToken, initializeUser, isSignedIn, userStore])

    return (
        <div>
            {isSignedIn &&
                hasHydrated &&
                (!userStore.pseudo || userStore.pseudo === 'Anonymous') && (
                    <UserOnboarding />
                )}
        </div>
    )
}
