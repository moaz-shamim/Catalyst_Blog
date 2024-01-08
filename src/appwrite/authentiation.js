import conf from "../environment_export/config.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL) //Your API Endpoint
      .setProject(conf.appwriteProjectId); //Your project ID
      this.account = new Account(this.client);

  }

  //   Service method to create an account.
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // call another method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  //   Service method to Login an account.
  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  //   Service method to get Current User.
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite Service :: getCurrentUser :: error", error);
    }
    return null;
  }

  //   Service method to Logout an account.
  async logout() {
    try {
      await this.account.deleteSessions('current');
    } catch (error) {
      console.log("Appwrite Service :: logout :: error", error);
    }
  }
}

const authService = new AuthService();

export default authService;
