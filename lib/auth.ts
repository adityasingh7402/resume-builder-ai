import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/models/User'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, profile }) {
      try {
        await dbConnect()

        const githubProfile = profile as { login?: string }
        const username = githubProfile?.login
        if (!username) return false

        const existing = await UserModel.findOne({ email: user.email ?? '' })
        if (!existing) {
          await UserModel.create({
            name: user.name ?? username,
            email: user.email ?? '',
            image: user.image ?? '',
            github_username: username,
          })
        }

        return true
      } catch (err) {
        console.error('signIn error:', err)
        return false
      }
    },

    async session({ session }) {
      if (session.user?.email) {
        await dbConnect()
        const dbUser = await UserModel.findOne({ email: session.user.email })
        if (dbUser) {
          const u = session.user as unknown as Record<string, unknown>
          u.id = dbUser._id.toString()
          u.github_username = dbUser.github_username
        }
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
})
