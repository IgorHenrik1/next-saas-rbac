import { auth } from "@/http/middlewares/auth";
import { prisma } from "@/lib/prisma";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { BadRequestError } from "../__errors/bad-request-error";
import { getUserPermissions } from "@/utils/get-user-permission";
import { UnauthorizedError } from "../__errors/unauthorized-error";
import { roleSchema } from "@saas/auth";

export async function getInvites(app:FastifyInstance){
  app.withTypeProvider<ZodTypeProvider>().register(auth).get('/organizations/:slug/invites', {
    schema:{
      tags: ['invites'],
      summary: 'Get all organizations invites',
      security: [{bearerAuth: []}],
      params: z.object({
        slug: z.string()
      }),
      response:{
        200: z.object({
          invites: z.array( z.object({
            id: z.string().uuid(),
            email: z.string().email(),
            role: roleSchema,
            createAt: z.date(),
            author: z.object({
              id: z.string().uuid(),
              name: z.string().nullable(),
            }).nullable(),
          }))
        })
      }
      }
    },async (request) => {
      const {slug} = request.params;
      const userId = await request.getCurrentUserId();
      const {organization, membership} = await request.getUserMembership(slug);
      const {cannot} = getUserPermissions(userId, membership.role)

      if(cannot('get', 'Invite')){
        throw new UnauthorizedError(`You're not allowed to get organizations invites.`)
      }

      const invites = await prisma.invite.findMany({
        where:{
          organizationId: organization.id
        },
        select: {
          id: true,
          email: true,
          role: true,
          createAt: true,
          author: {
            select: {
              id: true,
              name: true,
            }
          }
        },
        orderBy: {
          createAt: 'desc'
        }
      })

      return {invites}

    },
  )
}