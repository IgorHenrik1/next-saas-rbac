import { FastifyInstance } from "fastify";
import { UnauthorizedError } from "../routes/__errors/unauthorized-error";
import fastifyPlugin from "fastify-plugin";

export const auth = fastifyPlugin(async function auth( app: FastifyInstance){
  app.addHook('preHandler', async (request) => {
    request.getCurrentUserId = async () => {
      try{
        const {sub} = await request.jwtVerify<{sub: string}>()
        return sub
      }
      catch (error){
        throw new UnauthorizedError('Invalid auth token')
      }
    }
  })
})