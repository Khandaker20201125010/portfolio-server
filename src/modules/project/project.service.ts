import { prisma } from "../../config/db";
import { CreateProjectInput, UpdateProjectInput } from "./project.modal";
const createProject = async (
  data: CreateProjectInput,
  authorId: number,
  imageUrl?: string
) => {
  return prisma.project.create({
    data: {
      title: data.title,
      slug: data.slug,
      description: data.description,
      features: data.features ?? [],
      thumbnail: imageUrl ?? data.thumbnail ?? null,
      liveUrl: data.liveUrl ?? null,
      frontendRepoUrl: data.frontendRepoUrl ?? null,
      backendRepoUrl: data.backendRepoUrl ?? null,
      authorId,
    },
  });
};

const getAllProjects = async () => {
  return prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });
};

const getProjectBySlug = async (slug: string) => {
  return prisma.project.findUnique({ where: { slug } });
};

const getProjectById = async (id: number) => {
  return prisma.project.findUnique({ where: { id } });
};

const updateProject = async (
  id: number,
  data: UpdateProjectInput,
  imageUrl?: string
) => {
  const payload: any = { ...data };
  if (imageUrl) payload.thumbnail = imageUrl;
  return prisma.project.update({ where: { id }, data: payload });
};

const deleteProject = async (id: number) => {
  return prisma.project.delete({ where: { id } });
};

export const projectService = {
  createProject,
  getAllProjects,
  getProjectBySlug,
  getProjectById,
  updateProject,
  deleteProject,
};
