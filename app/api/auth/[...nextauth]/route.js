import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@association.org" },
        password: { label: "Mot de passe", type: "password" }
      },
      async authorize(credentials) {
        try {
          // 1. Utilisateur de test pour la démo
          if (credentials.email === "admin@association.org" && credentials.password === "password123") {
            return {
              id: "1",
              email: "admin@association.org",
              name: "Administrateur Association",
              role: "admin"
            }
          }

          // 2. Ici tu pourras plus tard connecter ta base de données
          // const user = await findUserInDatabase(credentials.email);
          // if (user && await verifyPassword(credentials.password, user.password)) {
          //   return user;
          // }

          return null;
        } catch (error) {
          console.error("Erreur d'authentification:", error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 jours
  },
  pages: {
    signIn: "/auth/login",
    signUp: "/auth/register",
    error: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Ajouter les infos utilisateur dans le token
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Transférer les infos du token vers la session
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Redirection après connexion
      if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }