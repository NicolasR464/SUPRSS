// CALL ALL ARTICLES TO THE BACK

import { getCollectionById } from '@/utils/apiCalls/collection'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const Collection = async ({ params }: { params: Promise<{ id: number }> }) => {
    const { id } = await params

    const { getToken } = await auth()

    const JWT = await getToken()

    if (!JWT) {
        // redirect
        redirect('/')
        return
    }

    const collectionData = await getCollectionById(id, JWT)

    console.log({ collectionData })

    return <>HEY</>
}

export default Collection
