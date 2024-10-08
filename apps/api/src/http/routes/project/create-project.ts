import { auth } from "@/http/middlewares/auth";
import { prisma } from "@/lib/prisma";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { BadRequestError } from "../__errors/bad-request-error";
import { createSlug } from "@/utils/create-slug";
import { getUserPermissions } from "@/utils/get-user-permission";
import { UnauthorizedError } from "../__errors/unauthorized-error";

export async function createProject(app:FastifyInstance){
  app.withTypeProvider<ZodTypeProvider>().register(auth).post('/organizations/:slug/projects', {
    schema:{
      tags: ['project'],
      summary: 'Create a new project',
      security: [{bearerAuth: []}],
      body: z.object({
        name: z.string(),
        description: z.string()
      }),
      params: z.object({
        slug: z.string()
      }),
      response:{
        201: z.object({
          projectId: z.string().uuid()
        })
      }
      }
    },async (request, reply) => {
      const {slug} = request.params;
      const userId = await request.getCurrentUserId();
      const {organization, membership} = await request.getUserMembership(slug);
      const {cannot} = getUserPermissions(userId, membership.role)

      if(cannot('create', 'Project')){
        throw new UnauthorizedError(`You're not allowed to create new projects.`)
      }

      const {name, description} = request.body;

      const project = await prisma.project.create({
        data: {
          name,
          description,
          organizationId: organization.id,
          ownerId: userId
        }
      })


     
      return reply.status(201).send({
        projectId: project.id,
      })
    },
  )
}