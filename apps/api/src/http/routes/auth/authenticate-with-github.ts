import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { BadRequestError } from "../__errors/bad-request-error";
import { sign } from "crypto";

export async function authenticateWithGithub( app: FastifyInstance){
  app.withTypeProvider<ZodTypeProvider>().post('/sessions/github', {
    schema: {
      tags: ['auth'],
      summary: 'Authenticate user with Github',
      body: z.object({
        code: z.string()
      }),
      response:{
        201:z.object({
          token: z.string()
        })
      }
    }
  }, async (request, reply) => {
    const {code} = request.body
    const githubOAuthUrl = new URL(
      'https://github.com/login/oauth/access_token'
    )
    githubOAuthUrl.searchParams.set('client_id', 'Ov23li9WvfpZNRfYXPqD')
    githubOAuthUrl.searchParams.set('client_secret', '029c5a781789c31031c149de43a88ae2952c9d31')
    githubOAuthUrl.searchParams.set('redirect_uri', 'http://localhost:3000/api/auth/callback')
    githubOAuthUrl.searchParams.set('code', code)
    const githubAccessTokenResponse = await fetch(githubOAuthUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      }
    })
    const githubAccessTokenData = await githubAccessTokenResponse.json()
    const {access_token: githubAccessToken} = z.object({
      access_token: z.string(),
      token_type: z.literal('bearer'),
      scope: z.string()
    }).parse(githubAccessTokenData)

    const githubUserResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${githubAccessToken}`
      }
    })
    const githubUserData = await githubUserResponse.json()
    const {id: githubId, avatar_url: avatarUrl, name, email } = z.object({
      id: z.number().int().transform(String),
      avatar_url: z.string().url(),
      name: z.string().nullable(),
      email: z.string().nullable()
    }).parse(githubUserData)
    if(email === null) {
      throw new BadRequestError('Your Github account must have an email to authenticate')
    }
    let user = await prisma.user.findUnique({
      where: {email}
    })
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name,
          avatarUrl,
        }
      })
    }
    let account = await prisma.account.findUnique({
      where: {
        provider_userId: {
          provider: 'GITHUB',
          userId: user.id
        }
      }
    })

    if (!account) {
      account = await prisma.account.create({
        data: {
          provider: 'GITHUB',
          providerAccountId: githubId,
          userId: user.id,
        }
      })
    }
    const token = await reply.jwtSign(
      {
        sub: user.id
      },
      {
        sign:{
          expiresIn: '7d'
        }
      }
    )
    return reply.status(201).send({token})
  })
}