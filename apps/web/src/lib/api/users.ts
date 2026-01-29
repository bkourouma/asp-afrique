import { apiGet, apiPost, apiPut, apiDelete } from '../api-client'

export interface User {
  id: string
  email: string
  name: string | null
  roles: string[]
}

export interface LoginResponse {
  accessToken: string
  user: User
}

/**
 * Get current user profile
 */
export async function getCurrentUser(): Promise<User> {
  return apiGet<User>('/api/v1/users/me')
}

/**
 * Get all users (admin only)
 */
export async function getAllUsers(): Promise<User[]> {
  return apiGet<User[]>('/api/v1/users')
}

/**
 * Get user by ID (admin only)
 */
export async function getUserById(id: string): Promise<User> {
  return apiGet<User>(`/api/v1/users/${id}`)
}

/**
 * Update user (admin only)
 */
export async function updateUser(id: string, data: Partial<User>): Promise<User> {
  return apiPut<User>(`/api/v1/users/${id}`, data)
}

/**
 * Delete user (admin only)
 */
export async function deleteUser(id: string): Promise<{ success: boolean }> {
  return apiDelete<{ success: boolean }>(`/api/v1/users/${id}`)
}

