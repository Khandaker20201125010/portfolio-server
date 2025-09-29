# Portfolio Backend API

> Backend API for a personal portfolio project built with **ExpressJS**, **TypeScript**, **Prisma**, **JWT Authentication**, and **Cloudinary**. This single-file README contains copy-ready examples for every endpoint and environment setup.

---

## 🚀 Quick Overview

* **Auth:** Register, Login, Logout (JWT)
* **Owner-only dashboard**: protected by JWT
* **Blogs:** CRUD (create/read/update/delete)
* **Projects:** CRUD (portfolio/project showcase)
* **Images:** Multer uploads -> Cloudinary (stores `secure_url`)
* **Validation:** Zod
* **DB:** PostgreSQL via Prisma

---

## 📦 Tech Stack

* ExpressJS + TypeScript
* Prisma ORM + PostgreSQL
* JWT + bcrypt for auth
* Multer + Cloudinary for file uploads
* Zod for runtime validation

---

## ⚙️ Installation

```bash
# Clone repo
git clone https://github.com/your-username/portfolio-backend.git
cd portfolio-backend

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run DB migrations
npx prisma migrate dev --name init

# Start dev server
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file in the project root with the following variables:

```bash
# Database
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/portfolio"

# JWT
JWT_SECRET="supersecret"
JWT_EXPIRES_IN="7d"

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Optional
PORT=6000
```

---

## 📁 Project Structure (example)

```
src/
├─ controllers/
├─ middlewares/
├─ routes/
├─ services/
├─ utils/
├─ prisma/
├─ app.ts
└─ server.ts
```

---

## 🧩 Scripts

```bash
# Start dev server (nodemon / ts-node)
npm run dev

# Build
npm run build

# Start production
npm start

# Prisma migrations
npx prisma migrate dev --name init
```

---

# 📘 API Documentation (copy-ready)

Base URL (local): `http://localhost:6000/api`

> Use the `Authorization: Bearer <JWT_TOKEN>` header for protected routes.

---

## 🔐 Authentication

### Register

```bash
POST http://localhost:6000/api/auth/register
Content-Type: application/json
```

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

**Success response (201)**

```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### Login

```bash
POST http://localhost:6000/api/auth/login
Content-Type: application/json
```

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

**Success response (200)**

```json
{
  "success": true,
  "token": "JWT_TOKEN_HERE",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### Logout

```bash
POST http://localhost:6000/api/auth/logout
Authorization: Bearer <JWT_TOKEN>
```

**Success response (200)**

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## 📝 Blog Endpoints

### Get all blogs

```bash
GET http://localhost:6000/api/blogs
```

**Response (200)**

```json
[
  {
    "id": 1,
    "title": "My First Blog",
    "slug": "my-first-blog",
    "excerpt": "Short excerpt...",
    "thumbnail": "https://res.cloudinary.com/.../image.jpg",
    "createdAt": "2025-09-01T12:00:00.000Z"
  }
]
```

---

### Get blog by slug

```bash
GET http://localhost:6000/api/blogs/my-first-blog
```

**Response (200)**

```json
{
  "id": 1,
  "title": "My First Blog",
  "slug": "my-first-blog",
  "content": "Full content here...",
  "thumbnail": "https://res.cloudinary.com/.../image.jpg",
  "createdAt": "2025-09-01T12:00:00.000Z"
}
```

---

### Create blog (owner only)

```bash
POST http://localhost:6000/api/blogs
Authorization: Bearer <JWT_TOKEN>
Content-Type: multipart/form-data
```

Form-data fields:

* `title` (string)
* `slug` (string)
* `content` (string)
* `thumbnail` (file) — **key**: `thumbnail`

**Success (201)**

```json
{
  "success": true,
  "blog": {
    "id": 2,
    "title": "New Blog",
    "slug": "new-blog",
    "thumbnail": "https://res.cloudinary.com/.../image.jpg"
  }
}
```

---

### Update blog (owner only)

```bash
PATCH http://localhost:6000/api/blogs/my-first-blog
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

```json
{
  "title": "Updated Title",
  "content": "Updated content..."
}
```

**Success (200)**

```json
{
  "success": true,
  "blog": {
    "id": 1,
    "title": "Updated Title",
    "slug": "my-first-blog"
  }
}
```

---

### Delete blog (owner only)

```bash
DELETE http://localhost:6000/api/blogs/my-first-blog
Authorization: Bearer <JWT_TOKEN>
```

**Success (200)**

```json
{ "success": true, "message": "Blog deleted" }
```

---

## 💼 Project Endpoints

### Get all projects

```bash
GET http://localhost:6000/api/projects
```

**Response (200)**

```json
[
  {
    "id": 1,
    "title": "Portfolio Website",
    "slug": "portfolio-website",
    "description": "Personal portfolio built with Next.js",
    "liveUrl": "https://portfolio.com",
    "repoUrl": "https://github.com/johndoe/portfolio",
    "thumbnail": "https://res.cloudinary.com/.../image.jpg"
  }
]
```

---

### Get project by slug

```bash
GET http://localhost:6000/api/projects/portfolio-website
```

**Response (200)**

```json
{
  "id": 1,
  "title": "Portfolio Website",
  "slug": "portfolio-website",
  "description": "My personal portfolio built with Next.js",
  "features": ["NextJS", "Tailwind", "Prisma"],
  "liveUrl": "https://portfolio.com",
  "repoUrl": "https://github.com/johndoe/portfolio",
  "thumbnail": "https://res.cloudinary.com/.../image.jpg"
}
```

---

### Create project (owner only)

```bash
POST http://localhost:6000/api/projects
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

```json
{
  "title": "Portfolio Website",
  "slug": "portfolio-website",
  "description": "My personal portfolio built with Next.js",
  "features": ["NextJS", "Tailwind", "Prisma"],
  "liveUrl": "https://portfolio.com",
  "repoUrl": "https://github.com/johndoe/portfolio"
}
```

**Success (201)**

```json
{ "success": true, "project": { "id": 2, "title": "Portfolio Website" } }
```

---

### Update project (owner only)

```bash
PATCH http://localhost:6000/api/projects/portfolio-website
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

```json
{
  "title": "Updated Project Title",
  "description": "Updated description"
}
```

**Success (200)**

```json
{ "success": true, "project": { "id": 1, "title": "Updated Project Title" } }
```

---

### Delete project (owner only)

```bash
DELETE http://localhost:6000/api/projects/portfolio-website
Authorization: Bearer <JWT_TOKEN>
```

**Success (200)**

```json
{ "success": true, "message": "Project deleted" }
```

---

## 🌩️ Image Uploads (Cloudinary)

* For file uploads use `multipart/form-data`.
* Use key `thumbnail` when uploading a single image.
* The server uploads to Cloudinary and stores the returned `secure_url` in the DB.

**Example (curl)**

```bash
curl -X POST "http://localhost:6000/api/blogs" \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -F "title=Cloudinary Test" \
  -F "slug=cloudinary-test" \
  -F "content=Testing file upload" \
  -F "thumbnail=@/path/to/image.jpg"
```

---

## ✅ Validation & Security Notes

* Zod schemas validate request bodies; return `400` on invalid input.
* Passwords hashed with `bcrypt` before saving.
* JWT stored client-side (e.g., localStorage) and sent in `Authorization` header.
* Protect owner-only routes with middleware that verifies token and owner role.

---

## 🧪 Testing with Postman

1. Register → Login → copy the JWT token.
2. Set header: `Authorization: Bearer <your-token>`.
3. Test protected blog/project endpoints.
4. For file uploads use Postman `form-data` and key `thumbnail` for the file.

---

## 🧾 Examples (Postman-ready snippets)

**Login (raw JSON body)**

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

**Auth header (example)**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📝 Tips for Deployment

* Ensure `DATABASE_URL` and Cloudinary env vars are set in the host (Render, Vercel, Docker).
* Use `NODE_ENV=production` and serve the built JS (`npm run build && npm start`).
* Use a secure value for `JWT_SECRET` and rotate if compromised.

---


