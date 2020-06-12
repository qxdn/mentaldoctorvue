import axios from 'axios'
import qs from 'qs'

var axiosInstance = axios.create({
  baseURL: 'http://localhost:8081'
})

export const postKeyValueRequest = (url, params) => {
  return axiosInstance({
    method: 'post',
    url: url,
    data: params,
    transformRequest: [function (data) {
      return qs.stringify(data)
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export const postRequest = (url, params) => {
  return axiosInstance.post(url, params)
}

export const getRequest = (url, params) => {
  return axiosInstance.get(url, params)
}

export const putRequest = (url, params) => {
  return axiosInstance.put(url, params)
}

export const deleteRequest = (url, params) => {
  return axiosInstance.delete(url, params)
}
