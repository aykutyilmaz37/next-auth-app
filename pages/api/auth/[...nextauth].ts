import { API_URL } from "@/constants/API_URL";
import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await axios.post(`${API_URL}/auth/login`,{
          email: credentials?.email,
          password: credentials?.password,
        });
        const data = await res.data;
        if (data.status === true) {
          localStorage.setItem('token', data.data.token);
          return {
            id: data.data.id,
            name: data.data.fullName,
            email: data.data.email,
            token: data.data.token, 
          };
        } else {
          // Login Failed
          return null; 
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token, user }) {
      session.user = token
      return session;
    }
  }
});
