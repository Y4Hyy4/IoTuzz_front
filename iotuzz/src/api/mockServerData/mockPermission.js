import Mock from "mockjs";

export default {
    getMenu: (config) => {
        const { username, password } = JSON.parse(config.body);
        console.log(JSON.parse(config.body));
        // 先判断用户是否存在
        // 判断账号和密码是否对应
        if (username === "admin" && password === "admin") {
            return {
                code: 20000,
                data: {
                    menu: [
                        {
                            path: "/Home",
                            name: "home",
                            label: "首页",
                            icon: "el-icon-menu",
                            url: "Home/index.vue",
                        },
                        {
                            path: "/FuzzManage",
                            label: "固件测试",
                            icon: "el-icon-s-tools",
                            children: [
                                {
                                    path: "/FuzzManage/Monitor",
                                    name: "fuzzMonitor",
                                    label: "监控窗口",
                                    icon: "el-icon-cpu",
                                    url: "FuzzManage/FuzzMonitor.vue"
                                },
                                {
                                    path: "/FuzzManage/SolidWareUpload",
                                    name: "solidWareUpload",
                                    label: "固件上传",
                                    icon: "el-icon-document-add",
                                    url: "FuzzManage/SolidWareUpload.vue"
                                },
                            ],
                        },
                        {
                            path: '/UserManage',
                            label: '用户管理',
                            icon: 'el-icon-user-solid',
                            children: [
                                {
                                    path: '/UserManage/SuperUser',
                                    name: 'superUser',
                                    label: '超级用户',
                                    icon: 'el-icon-star-off',
                                    url: "UserManage/components/SuperUser.vue"
                                },
                                {
                                    path: '/UserManage/OrdinaryUser',
                                    name: 'ordinaryUser',
                                    label: '普通用户',
                                    icon: 'el-icon-user',
                                    url: "UserManage/components/OrdinaryUser.vue"
                                },
                            ]
                        },

                    ],
                    token: Mock.Random.guid(),
                    message: "获取成功",
                },
            };
        } else if (username === "1" && password === "1") {
            return {
                code: 20000,
                data: {
                    menu: [
                        {
                            path: "/",
                            name: "home",
                            label: "首页",
                            icon: "el-icon-menu",
                            url: "Home",
                        },
                        {
                            path: "/FuzzManage",
                            label: "固件测试",
                            icon: "el-icon-s-tools",
                            children: [
                                {
                                    path: "/FuzzManage/Monitor",
                                    name: "fuzzMonitor",
                                    label: "监控窗口",
                                    icon: "el-icon-cpu",
                                    url: "FuzzManage/FuzzMonitor.vue"
                                },
                                {
                                    path: "/FuzzManage/SolidWareUpload",
                                    name: "solidWareUpload",
                                    label: "固件上传",
                                    icon: "el-icon-document-add",
                                    url: "FuzzManage/SolidWareUpload.vue"
                                },
                            ],
                        },
                        {
                            path: '/UserManage',
                            label: '用户管理',
                            icon: 'el-icon-user-solid',
                            children: [
                                {
                                    path: '/UserManage/OrdinaryUser',
                                    name: 'ordinaryUser',
                                    label: '普通用户',
                                    icon: 'el-icon-user',
                                    url: "UserManage/components/OrdinaryUser.vue"
                                },
                            ]
                        },
                    ],
                    token: Mock.Random.guid(),
                    message: "获取成功",
                },
            };
        } else {
            return {
                code: -999,
                data: {
                    message: "密码错误",
                },
            };
        }
    },
};
