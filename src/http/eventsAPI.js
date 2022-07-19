import { $authHost } from "./index";

export const getAll = async () => {
  const { data } = await $authHost.get('api/event')
  return data
}

export const getOne = async (id) => {
  const { data } = await $authHost.get(`api/event/${id}`)
  return data
}

export const create = async (event) => {
  const { data } = await $authHost.post('api/event', {
    name: event.name,
    details: event.details,
    start: event.start,
    end: event.end,
    count: event.count,
    masterId: event.masterId
  })
  return data
}