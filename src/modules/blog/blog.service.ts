// src/modules/blog/blog.service.ts
import { prisma } from "../../config/db";
import { CreateBlogInput, UpdateBlogInput } from "./blog.modal";


 const createBlog = async (data: CreateBlogInput, authorId: number, imageUrl?: string) => {
  const blog = await prisma.blog.create({
    data: {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      published: data.published ?? false,
      tags: data.tags ?? [],
      coverImage: imageUrl ?? null,
      authorId,
    },
  });
  return blog;
};

 const getAllBlogs = async () => {
  return prisma.blog.findMany({ orderBy: { createdAt: "desc" } });
};

 const getBlogBySlug = async (slug: string) => {
  return prisma.blog.findUnique({ where: { slug } });
};

const updateBlog = async (id: number, data: UpdateBlogInput, imageUrl?: string) => {
  const payload: any = { ...data };
  if (imageUrl) payload.coverImage = imageUrl;
  return prisma.blog.update({ where: { id }, data: payload });
};

 const deleteBlog = async (id: number) => {
  return prisma.blog.delete({ where: { id } });
};

export const blogService = {
    createBlog,
    getAllBlogs,
    getBlogBySlug,
    updateBlog,
    deleteBlog
}