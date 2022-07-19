import { $authHost } from "./index";

export const subscribe = async (payload) => {
  console.log('data', payload)
  let formDataFile = new FormData();
  formDataFile.append("file", payload.file)
  formDataFile.append("workerId", payload.workerId)
  formDataFile.append("eventId", payload.eventId)
  console.log(payload.workerId, payload.eventId)
  const { data } = await $authHost.post('api/registerevent', formDataFile, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return data;
}

export const getOneToMaster = async (payload) => {
  console.log('master id from register events api ', payload)
  const { data } = await $authHost.get(`api/registerevent/master/${payload}`)
  console.log('register events api data', data)
  return data;
}

export const getOneToWorker = async (payload) => {
  console.log('worker id from register events api ', payload)
  const { data } = await $authHost.get(`api/registerevent/worker/${payload}`)
  console.log('register events api data', data)
  return data;
}

export const getDocument = async (payload) => {
  console.log('Document from registerEventAPI', payload)
  const data = await $authHost.get(`${payload}`)
  console.log('doc data', data.request.responseURL)
  console.log(`ссылка: ${$authHost}${payload}`)
  return data.request.responseURL
}

export const updateConfirm = async (payload) => {
  console.log('updateConfirm payload', payload)
  const { data } = await $authHost.post('api/registerevent/update', {
    id: payload.id,
    confirm: payload.confirm
  })
  console.log('updateConfirm registerEvents api data', data)
  return data;
}