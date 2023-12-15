import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismadb';
import NextAuth, { NextAuthOptions, RequestInternal } from 'next-auth';
import bcrypt from 'bcryptjs';
import Credentials from 'next-auth/providers/credentials';
import env from '@/config/env';

export const Options: NextAuthOptions = {
  secret: env.nextAuthSecret,
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'email',
          type: 'email',
        },
        password: {
          label: 'password',
          type: 'password',
        },
      },
      authorize: async function (
        credentials: Record<string, string> | undefined,
        req: Pick<RequestInternal, 'body' | 'query' | 'headers' | 'method'>,
      ) {
        console.log('authorize');

        if (!credentials?.email || !credentials.password) {
          throw new Error('Invalid credentials');
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.password) {
          throw new Error('Invalid credentials');
        }

        const isCorrectedPassword = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!isCorrectedPassword) {
          throw new Error('Invalid credentials');
        }
        const { password, ...userWithoutPwd } = user;

        console.log('success user, user', userWithoutPwd);

        return userWithoutPwd;
      },
    }),
  ],
  pages: {
    signIn: '/signin',
    error: '/signin',
  },
  callbacks: {
    session: async ({ session, token, user }) => {
      if (session?.user) {
        session.user.name = token.email;
      }
      console.log('next auth session', session, 'token', token, 'user', user);

      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30,
  },
};

const handler = NextAuth(Options);

export { handler as GET, handler as POST };
