import { api } from "./api-client"

interface CreateProjectRequest{
  org: string
  name: string
  description: string
}

type CreateProjectResponse = void


export async function createProject({name, description, org} : CreateProjectRequest): Promise<CreateProjectResponse> {
  const result = await api.post(`organizations/${org}/projects`, {
    json:{
      name,
      description
    }
  })

}