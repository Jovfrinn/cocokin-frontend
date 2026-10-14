import type { User, AuthResponse } from "../types";
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
    login: async (email:string, password: string): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/auth/login', {email, password});
        return response.data
    }


}