import type { User } from "../types";
import { api } from "./api";

export const userService = {

    getAll: async (): Promise<User[]> => {
        const response = await api.get<User[]>('/users');
        return response.data;
    },
    register: async (data: Omit<User, 'id'>): Promise<User> => {
        const response = await api.post('/users', data);
        return response.data
    },
    login: async (email:string, password: string): Promise<any> => {
        const response = await api.post('/auth/login', {email, password});
        return response.data
    }


}