import { ID } from 'appwrite';
import { account } from '@/lib/appwrite';

export interface User {
  $id: string;
  email: string;
  name: string;
}

export const authService = {
  async login(email: string, password: string) {
    try {
      return await account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  async register(email: string, password: string, name: string) {
    try {
      const user = await account.create(ID.unique(), email, password, name);
      // Auto login after registration
      await this.login(email, password);
      return user;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  async logout() {
    try {
      await account.deleteSession('current');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const user = await account.get();
      return {
        $id: user.$id,
        email: user.email,
        name: user.name,
      };
    } catch {
      return null;
    }
  },

  async getSession() {
    try {
      return await account.getSession('current');
    } catch {
      return null;
    }
  },
};
