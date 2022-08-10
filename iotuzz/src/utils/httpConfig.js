import axios from 'axios'
import {Message} from 'element-ui'
import router from '../router'
const http = {}
const baseURL='http://127.0.0.1:8000'
import { getToken, removeToken } from '@/utils/auth' 
const service=new axios.create({
    baseURL,
    timeout:500000,
}
)

service.interceptors.request.use(
    function(config){
        const Token = getToken() 
        if(Token){
            config.headers.Authorization=Token
        }
        else{
            // console.log("没有获取到token")
        }
        return config
    },
    function(error){
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    response => {
        const res = response.data
        if(res.code===50014||res.code===50012||res.code===50008){
            Message({
                message: res.error,
                type: 'error',
                duration: 5 * 1000
              })
              removeToken()
              return router.replace('/login')
        }
        return res
    },
    error => {
      console.log('错误问题' + error) // for debug
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
    //   console.log(error)
      return Promise.reject(error)
    }
  )

export default service
