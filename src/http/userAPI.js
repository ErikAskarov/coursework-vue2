import { $authHost, $host } from "./index";
import jwt_decode from 'jwt-decode'

export const registration = async (user) => {
  const { data } = await $host.post('api/user/registration', { 
    secondName: user.secondName, 
    firstName: user.firstName, 
    patronymic: user.patronymic, 
    cardpassId: user.cardpassId, 
    email: user.email, 
    password: user.password, 
    role: user.role 
  })
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}

export const login = async (user) => {
  const { data } = await $host.post('api/user/login', { 
    email: user.email, 
    password: user.password 
  })
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}

export const check = async () => {
  const { data } = await $authHost.get('api/user/auth')
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}

export const getOne = async (id) => {
  console.log('id', id)
  const { data } = await $authHost.get(`api/user/get/${id}`)
  return data
}

export const getTable = async (payload) => {
  console.log('getTable api', payload)
  const { data } = await $authHost.get('api/user/table/', {
    params: {
      id: payload.id,
      startDate: payload.startDate,
      endDate: payload.endDate
    }
  })
  return data
}