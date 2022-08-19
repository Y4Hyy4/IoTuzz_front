// import Cookies from "js-cookie"

export default {
  state: {
    isTesting: false,
    file_path: '',
    test_type: -1,
    test_pid: -1,
  },
  mutations: {
    setTestState(state, val) {
      state.isTesting = true
      state.file_path = val.file_path
      state.test_type = val.test_type
      state.test_pid = val.test_pid
      // Cookies.set('isTesting', val.isTesting) 
      // Cookies.set('test_type', val.test_type)
      // Cookies.set('file_path', val.file_path)
    },
    clearTestState(state) {
      state.isTesting = false
      state.test_pid = -1
      // Cookies.remove('test_type')
      // Cookies.remove('token')
  },
    // getToken(state) {
    //     state.token = state.token || Cookies.get('token')
    // }
  }
}
