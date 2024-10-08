import { auth } from "@/http/middlewares/auth";
import { prisma } from "@/lib/prisma";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { BadRequestError } from "../__errors/bad-request-error";
import { createSlug } from "@/utils/create-slug";
import { roleSchema } from "../../../../../../packages/auth/src";

export async function getOrganizations(app:FastifyInstance){
  app.withTypeProvider<ZodTypeProvider>().register(auth).get('/organizations', {
    schema:{
      tags: ['organization'],
      summary: 'Get organization where user is a member',
      security: [{bearerAuth: []}],
      response:{
        200: z.object({
          organizations: z.array(z.object({
            id: z.string().uuid(),
            name: z.string(),
            slug: z.string().nullable(),
            avatarUrl: z.string().nullable(),
            role: roleSchema  
          }
            
          ))
        })
      }
      }
    },async (request) => {
      const userId = await request.getCurrentUserId();
      const organizations = await prisma.organization.findMany({
        select:{
          id: true,
          name: true,
          slug: true,
          avatarUrl: true,
          members:{
            select:{
              role: true
            },
            where:{
              userId
            }
          }
        },
        where: {
          members: {
            some:{
              userId
            }
          }
        }
      })

      const organizationsWithUserRole = organizations.map(({members, ...org}) =>{
        return {
          ...org,
          role: members[0].role
        }
      })
      return {
        organizations: organizationsWithUserRole
      }
    },
  )
}