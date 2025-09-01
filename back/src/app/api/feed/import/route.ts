export const POST = async (req: Request) => {
    console.log('POST /api/feed/import')

    const { collection, feed } = await req.json()

    return new Response('OK', {
        status: 200,
    })
}
