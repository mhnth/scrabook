import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismadb';
import NextAuth, { NextAuthOptions, RequestInternal } from 'next-auth';
import bcrypt from 'bcryptjs';
import Credentials from 'next-auth/providers/credentials';
import env from '@/config/env';
import { User } from '@prisma/client';
import { AdapterUser } from 'next-auth/adapters';

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

        console.log('AUTH AUTHORIZE: \n', userWithoutPwd);

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
      if (session.user) {
        session.user.image = token.picture;
      }
      console.log(
        'AUTH CALLBACK SESSION:',
        '\nsession: \n',
        session,
        'token: \n',
        token,
        '\nuser: \n',
        user,
      );

      return session;
    },
    jwt: async ({ user, token }) => {
      console.log(
        'AUTH CALLBACK JWT:',
        '\n token: \n',
        token,
        '\n user: \n',
        user,
      );
      const user1 = user as User;

      if (user) {
        token.uid = user.id;
        token.picture = user1.picture;
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 1000 * 60 * 60 * 24 * 30 * 12, // 1 year
  },
};

const handler = NextAuth(Options);

export { handler as GET, handler as POST };
