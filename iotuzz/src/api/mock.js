import Mock from 'mockjs'
import mockHome from './mockServerData/mockHome'
import mockPermission from './mockServerData/mockPermission'
import mockUser from "./mockServerData/mockUser"

Mock.mock('/home/getData', mockHome.getStatisticalData)
Mock.mock(/user\/add/, 'post', mockUser.createUser)
Mock.mock(/user\/edit/, 'post', mockUser.updateUser)
Mock.mock(/user\/getUser/, 'get', mockUser.getUserList)
Mock.mock(/user\/del/, 'post', mockUser.deleteUser)
Mock.mock(/permission\/getMenu/, 'post', mockPermission.getMenu)
