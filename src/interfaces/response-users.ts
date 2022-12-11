
export interface LoginData {
  user: {
    nick: string,
    avatar: string,
    level: {
      level: number,
      description: string,
    },
    email: string,
    email_verified: boolean,
    phone: string,
    phone_verified: boolean,
    oauths: {
      appid: string,
      type: string,
      username: string
    }[],
    description: string,
    created_time: string,
    id: number
  },
  token: string
}
