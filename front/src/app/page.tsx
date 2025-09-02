import Chat from '@/components/chat'
import { UserDashboard } from '@/components/user/dashboard'

import { auth } from '@clerk/nextjs/server'

/**
 *
 * If logged in we check the local storage for a username
 * If no username we check if we have a user stored in the DB with the clerkid
 * If no user is not registered in the DB we ask him to set up a username and avatar
 */

const Home = async () => {
    const { userId } = await auth()

    return <div>{userId && <UserDashboard />}</div>
}

export default Home
