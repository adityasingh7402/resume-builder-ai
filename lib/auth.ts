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

        const existing = await UserModel.findOne({ email: user.email })

        if (!existing) {
          await UserModel.create({
            name: user.name,
            email: user.email,
            image: user.image,
            github_username: username,
          })
        }

        return true
      } catch (err) {
        console.error('signIn callback error:', err)
        return false
      }
    },

    async session({ session, token }) {
      if (session.user && token.sub) {
        const dbUser = await UserModel.findOne({ email: session.user.email })
        if (dbUser) {
          // @ts-expect-error extending session
          session.user.id = dbUser._id.toString()
          // @ts-expect-error extending session
          session.user.github_username = dbUser.github_username
        }
      }
      return session
    },

    async jwt({ token, profile }) {
      if (profile) {
        const githubProfile = profile as { login?: string }
        token.github_username = githubProfile?.login
      }
      return token
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
})
