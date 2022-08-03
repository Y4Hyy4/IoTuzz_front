import axios from "./axios";

export const getData = () => {
  return axios.request({
      url: '/home/getData',
      method: 'get',
  })
}

// Mock
// export const getUser = (params) => {
//   return axios.request({
//       url: '/user/getUser',
//       method: 'get',
//       params
//   })
// }

export const getMenu = (param) => {
  return axios.request({
    url: "/permission/getMenu",
    method: "post",
    data: param,
  });
};

export const getSolidWareList = (params) => {
  return axios.request({
    url: '/solidWare/getSolidWare',
    method:'get',
    params
  })
}

export const getUser = (params) => {
  return axios.request({
      url: '/api/user/sorted',
      method: 'get',
      params
  })
}

export const callKit = (params) => {
  return axios.request({
    url:'/api/kit/call/',
    method:'post',
    data:params
  })
}