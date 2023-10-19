import SpotifyProvider from '@auth/core/providers/spotify';
import SpotifyWebApi from 'spotify-web-api-node';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '~/db/db';

import { env } from '~/env.mjs';

export const SpotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

export default {
  // @ts-ignore
  adapter: DrizzleAdapter(db),
  providers: [
    SpotifyProvider({
      clientId: env.SPOTIFY_CLIENT_ID,
      clientSecret: env.SPOTIFY_CLIENT_SECRET,
    }),
  ],
  // pages: {
  // 	signIn: "/login"
  // },
  callbacks: {
    async jwt({ token, account, user }) {
      // init signin
      if (Boolean(account) && Boolean(user)) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000,
        };
      }

      // active token
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // expired token
      // export async function refreshAccessToken(token) {
      try {
        SpotifyApi.setAccessToken(token.accessToken);
        SpotifyApi.setRefreshToken(token.refreshToken);
        const { body: data } = await SpotifyApi.refreshAccessToken();

        const refreshedToken = data.access_token;
        SpotifyApi.setAccessToken(refreshedToken);

        console.log('refreshed access token successfully');
        return {
          ...token,
          accessToken: refreshedToken,
          accessTokenExpires: Date.now() + data.expires_in * 1000,
          refreshToken: data.refresh_token ?? token.refreshToken,
        };
      } catch (error) {
        console.log('resfresh access token error');
        return {
          ...token,
          error: 'RefreshAccessTokenError',
        };
      }
      // }
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;

      return session;
    },
  },
};
