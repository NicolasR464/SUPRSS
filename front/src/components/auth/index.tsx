'use client'

import { useUserStore } from '@/store/user'
import { useAuth } from '@clerk/nextjs'
import { useEffect } from 'react'

export function ClearStoreOnLogout() {
    const { isSignedIn } = useAuth()
    const resetUserData = useUserStore((state) => state.resetUserData)

    useEffect(() => {
        if (!isSignedIn) {
            resetUserData()
        }
    }, [isSignedIn, resetUserData])

    return null
}
