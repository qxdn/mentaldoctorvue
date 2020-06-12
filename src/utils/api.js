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
