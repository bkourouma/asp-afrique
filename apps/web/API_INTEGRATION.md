# API Integration Guide

## Overview

The frontend communicates with the backend API at `http://localhost:3002`. All API calls are made through the `api-client.ts` module which automatically handles authentication.

## Configuration

### Environment Variables

```env
# .env.local
NEXT_PUBLIC_API_URL="http://localhost:3002"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"
```

## API Client Usage

### Basic Usage

The API client provides helper functions for common HTTP methods:

```typescript
import { apiGet, apiPost, apiPut, apiDelete } from '@/lib/api-client'

// GET request
const data = await apiGet('/api/v1/users/me')

// POST request
const result = await apiPost('/api/v1/auth/login', {
  email: 'admin@aspc-ci.org',
  password: 'Admin123!'
})

// PUT request
const updated = await apiPut('/api/v1/users/123', { name: 'New Name' })

// DELETE request
const deleted = await apiDelete('/api/v1/users/123')
```

### Authentication

The API client automatically includes the JWT token from the session:

```typescript
// Token is automatically added to Authorization header
const user = await apiGet('/api/v1/users/me')
```

### Error Handling

```typescript
try {
  const user = await apiGet('/api/v1/users/me')
} catch (error) {
  console.error('Failed to fetch user:', error.message)
}
```

## Available API Endpoints

### Authentication

- `POST /api/v1/auth/login` - Login with credentials
- `POST /api/v1/auth/logout` - Logout
- `GET /api/v1/auth/verify` - Verify token

### Users

- `GET /api/v1/users/me` - Get current user
- `GET /api/v1/users` - Get all users (admin only)
- `GET /api/v1/users/:id` - Get user by ID (admin only)
- `PUT /api/v1/users/:id` - Update user (admin only)
- `DELETE /api/v1/users/:id` - Delete user (admin only)

## Creating New API Modules

Create a new file in `src/lib/api/` for each resource:

```typescript
// src/lib/api/posts.ts
import { apiGet, apiPost, apiPut, apiDelete } from '../api-client'

export interface Post {
  id: string
  title: string
  content: string
}

export async function getPosts(): Promise<Post[]> {
  return apiGet<Post[]>('/api/v1/posts')
}

export async function createPost(data: Partial<Post>): Promise<Post> {
  return apiPost<Post>('/api/v1/posts', data)
}

export async function updatePost(id: string, data: Partial<Post>): Promise<Post> {
  return apiPut<Post>(`/api/v1/posts/${id}`, data)
}

export async function deletePost(id: string): Promise<{ success: boolean }> {
  return apiDelete<{ success: boolean }>(`/api/v1/posts/${id}`)
}
```

## Using API in Components

```typescript
'use client'

import { useEffect, useState } from 'react'
import { getPosts } from '@/lib/api/posts'

export default function PostsList() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts()
        setPosts(data)
      } catch (error) {
        console.error('Failed to fetch posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  )
}
```

## Backend API Development

When creating new endpoints in the backend, follow this pattern:

```typescript
// apps/api/src/routes/posts.ts
import { FastifyInstance } from 'fastify'
import { prisma } from '@packages/db'

export default async function postRoutes(fastify: FastifyInstance) {
  // GET all posts
  fastify.get('/posts', async (request, reply) => {
    const posts = await prisma.post.findMany()
    return reply.send(posts)
  })

  // POST create post
  fastify.post('/posts', async (request, reply) => {
    const post = await prisma.post.create({
      data: request.body
    })
    return reply.status(201).send(post)
  })
}
```

Then register the route in `apps/api/src/index.ts`:

```typescript
import postRoutes from './routes/posts.js'

app.register(postRoutes, { prefix: '/api/v1' })
```

## Testing with Postman

1. Login to get the access token:
   ```
   POST http://localhost:3002/api/v1/auth/login
   Body: { "email": "admin@aspc-ci.org", "password": "Admin123!" }
   ```

2. Copy the `accessToken` from the response

3. Use the token in subsequent requests:
   ```
   Authorization: Bearer <accessToken>
   ```

## Best Practices

1. **Always use the API client** - Don't make direct fetch calls
2. **Create API modules** - Organize endpoints by resource
3. **Handle errors** - Always wrap API calls in try-catch
4. **Type your responses** - Use TypeScript interfaces
5. **Require authentication** - Set `requireAuth: true` (default) for protected endpoints

