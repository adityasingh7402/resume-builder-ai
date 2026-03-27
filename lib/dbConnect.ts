import mongoose from 'mongoose'

type ConnectionState = {
  isConnected?: number
}

const state: ConnectionState = {}
let pending: Promise<void> | null = null

async function dbConnect(): Promise<void> {
  if (state.isConnected) return

  if (pending) {
    return pending
  }

  pending = connect()

  try {
    await pending
  } finally {
    pending = null
  }
}

async function connect(retries = 3): Promise<void> {
  for (let i = 1; i <= retries; i++) {
    try {
      const db = await mongoose.connect(process.env.MONGODB_URI!, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      })
      state.isConnected = db.connections[0].readyState
      return
    } catch (err) {
      console.error(`DB connect attempt ${i} failed:`, err)
      if (i === retries) throw new Error('Could not connect to MongoDB')
      await new Promise((r) => setTimeout(r, 2000))
    }
  }
}

export default dbConnect
