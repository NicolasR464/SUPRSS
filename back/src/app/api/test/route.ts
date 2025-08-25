import { db } from '@/utils/mongo'

export async function GET() {
    const database = await db()
    const docs = await database.collection('articles').find({}).toArray()
    return Response.json(docs)
}

export async function POST(req: Request) {
    const { title } = await req.json()
    const database = await db()
    const result = await database
        .collection('articles')
        .insertOne({ title, done: false })
    return Response.json(result, { status: 201 })
}
