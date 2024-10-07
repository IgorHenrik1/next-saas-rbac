import { FastifyInstance } from "fastify"
import { ZodError } from "zod"
import { BadRequestError } from "./routes/__errors/bad-request-error"
import { UnauthorizedError } from "./routes/__errors/unauthorized-error"
import { hasZodFastifySchemaValidationErrors } from "fastify-type-provider-zod"

type FastifyErrorHandler = FastifyInstance['errorHandler']
export const  errorHandler: FastifyErrorHandler = (error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)){
    return reply.status(400).send({
      errors: error.validation.reduce(
        (acc, issue) => {
          const path = issue.instancePath.split('/').pop() || 'unknown'
          if (!acc[path]){
            acc[path] = []
          }
          acc[path].push(issue.message ?? 'unknown error')
          return acc
        },
        {} as Record<string, string[]>
      ),
      message: 'Validation error',
    
    })
  }

  if (error instanceof BadRequestError){
    return reply.status(400).send({
      message: error.message
    })
  }

  if( error instanceof UnauthorizedError){
    return reply.status(401).send({
      message: error.message
    })
  }

  console.error(error)

  // send error to some observability platform

  return reply.status(500).send({message: 'Interval server error.'})
}