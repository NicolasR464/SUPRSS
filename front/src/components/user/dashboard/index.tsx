'use client'

import { useUserStore } from '@/store/user'
import { useAuth, useUser } from '@clerk/clerk-react'
import { UserOnboarding } from '../onboarding'
import { useEffect } from 'react'

export const UserDashboard = () => {
    const { isSignedIn } = useUser()
    const { getToken } = useAuth()

    const initializeUser = useUserStore((state) => state.initializeUser)
    const user = useUserStore((state) => state.user)

    useEffect(() => {
        const getUserData = async () => {
            const JWT = await getToken()

            if (JWT) await initializeUser(JWT)
        }

        if (isSignedIn && !user.pseudo) getUserData()
    }, [getToken, initializeUser, isSignedIn, user])

    return <div>{isSignedIn && !user.pseudo && <UserOnboarding />}</div>
}
