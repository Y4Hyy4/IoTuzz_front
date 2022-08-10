import Mock from 'mockjs'
import mockHome from './mockServerData/mockHome'
// import mockPermission from './mockServerData/mockPermission'
import mockUser from "./mockServerData/mockUser"
import mockSolidWare from "./mockServerData/mockSolidWare"

Mock.mock('/home/getData', mockHome.getStatisticalData)
Mock.mock(/user\/add/, 'post', mockUser.createUser)
Mock.mock(/user\/edit/, 'post', mockUser.updateUser)
// Mock.mock(/user\/getUser/, 'get', mockUser.getUserList)
Mock.mock(/user\/del/, 'post', mockUser.deleteUser)
// Mock.mock(/permission\/getMenu/, 'post', mockPermission.getMenu)
Mock.mock(/solidWare\/add/, 'post', mockSolidWare.addSolidWare)
Mock.mock(/solidWare\/edit/, 'post', mockSolidWare.updateSolidWare)
Mock.mock(/solidWare\/del/, 'post', mockSolidWare.deleteSolidWare)
Mock.mock(/solidWare\/getSolidWare/, 'get', mockSolidWare.getSolidWareList)