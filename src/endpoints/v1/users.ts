import got, { CancelableRequest, HTTPError } from "got"
import UserAgent from 'user-agents'
import {ResponseBody} from '../../interfaces/response.js'
import {LoginData} from '../../interfaces/response-users.js'

export enum Endpoint {
  Login = 'https://www.markji.com/api/v1/users/login',
  Profile = 'https://www.markji.com/api/v1/users/profile',
}

export async function login(username: string, password: string): Promise<ResponseBody<LoginData>> {
  try {
    return await got.post(Endpoint.Login, {
      json: {
        identity: username,
        password: password,
        nuencrypt_fields: ['password'],
      },
      headers: {
        'User-Agent': new UserAgent().toString(),
      },
      followRedirect: true
    }).json()
  }
  catch (error) {
    return JSON.parse((error as HTTPError).response.body as string)
  }
}
