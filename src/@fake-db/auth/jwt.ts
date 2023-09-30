// ** JWT import
import jwt from 'jsonwebtoken'

// ** Mock Adapter
import mock from 'src/@fake-db/mock'

// ** Default AuthConfig
import defaultAuthConfig from 'src/configs/auth'

// ** Types
import { UserDataType } from 'src/context/types'

const users = fetchUsers()

// ! These two secrets should be in .env file and not in any other file
const jwtConfig = {
  secret: process.env.NEXT_PUBLIC_JWT_SECRET,
  expirationTime: process.env.NEXT_PUBLIC_JWT_EXPIRATION,
  refreshTokenSecret: process.env.NEXT_PUBLIC_JWT_REFRESH_TOKEN_SECRET
}

type ResponseType = [number, { [key: string]: any }]

async function fetchUsers(): Promise<UserDataType[]> {
  try {
    const response = await fetch('https://iqtest-server.onrender.com/api/users/')

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()

    const result = data.map((user: any) => normalizeUser(user))

    return result
  } catch (error) {
    console.error('Failed to fetch users:', error)

    return []
  }
}

function normalizeUser(data: any): UserDataType {
  return {
    id: data.id,
    role: data.role || '',
    email: data.email,
    fullName: data.fullName,
    userName: data.userName,
    password: data.password,
    avatar: data.avatar || null,
    dob: data.dob ? new Date(data.dob) : null,
    gender: data.gender || null,
    phoneNumber: data.phoneNumber || null,
    country: data.country || null
  }
}

const getUserInfo = async (token: string): Promise<ResponseType> => {
  let response: ResponseType = [200, {}]

  // ** Checks if the token is valid or expired
  await jwt.verify(token, jwtConfig.secret as string, async (err, decoded) => {
    if (err) {
      // ** If onTokenExpiration === 'logout' then send 401 error
      if (defaultAuthConfig.onTokenExpiration === 'logout') {
        response = [401, { error: { error: 'Invalid User' } }]
      } else {
        const oldTokenDecoded = jwt.decode(token, { complete: true })

        // @ts-ignore
        const { id: userId } = oldTokenDecoded.payload

        const userList = await users
        const user = userList.find(u => u.id === userId)

        const accessToken = jwt.sign({ id: userId }, jwtConfig.secret as string, {
          expiresIn: jwtConfig.expirationTime
        })

        window.localStorage.setItem(defaultAuthConfig.storageTokenKeyName, accessToken)

        const obj = { userData: { ...user, password: undefined } }
        response = [200, obj]
      }
    } else {
      // @ts-ignore
      const userId = decoded.id

      const userList = await users
      const userData = userList.find(u => u.id === userId)

      delete (userData as any).password

      response = [200, { userData }]
    }
  })

  return response
}

mock.onGet('/auth/me').reply(config => {
  // @ts-ignore
  const token = config.headers.Authorization as string

  return getUserInfo(token)
})
