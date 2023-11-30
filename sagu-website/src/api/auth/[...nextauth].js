import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { query } from "../../server/db.js";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      // Retrieve user details from the database
      const results = await query("SELECT * FROM accounts WHERE email = ?", [
        session.user.email,
      ]);
      if (results.length > 0) {
        // Assuming 'id' is the name of your auto-increment primary key column
        session.user.id = results[0].id;
      }
      return session;
    },
    async signIn({ profile }) {
      const { email: googleEmail } = profile;
      try {
        // Check if the user exists in the database
        const existingUserQuery = "SELECT * FROM accounts WHERE email = ?";
        const existingUser = await query(existingUserQuery, [googleEmail]);

        if (existingUser.length > 0) {
          // The user already exists
          console.log("User already exists in database:", existingUser[0]);
          // You can add more code here to update user information if needed
        } else {
          // The user doesn't exist, create a new account
          const insertUserQuery = `
            INSERT INTO accounts (first_name, last_name, email)
            VALUES (?, ?, ?)
          `;
          const newUser = await query(insertUserQuery, [
            profile.given_name,
            profile.family_name,
            googleEmail,
          ]);
          console.log("New user created:", newUser);
        }

        // Here we consider the sign-in successful
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
  },
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development", // Turn on debug logging in development
});

export { handler as default };
