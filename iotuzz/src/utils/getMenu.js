export const getMenu = (role) => {
  if (role === true) {
    return {
      code: 200,
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
            label: "固件管理",
            icon: "el-icon-s-tools",
            children: [
              {
                path: "/FuzzManage/Monitor",
                name: "fuzzMonitor",
                label: "监控窗口",
                icon: "el-icon-cpu",
                url: "FuzzManage/FuzzMonitor.vue",
              },
              {
                path: "/FuzzManage/SolidWareUpload",
                name: "solidWareUpload",
                label: "固件上传",
                icon: "el-icon-document-add",
                url: "FuzzManage/SolidWareUpload.vue",
              },
              {
                path: "/FuzzManage/Analyze",
                name: "analyze",
                label: "测试分析",
                icon: "el-icon-aim",
                url: "FuzzManage/Analyze.vue",
              },
            ],
          },
          {
            path: "/UserManage",
            label: "用户管理",
            icon: "el-icon-user-solid",
            children: [
              {
                path: "/UserManage/SuperUser",
                name: "superUser",
                label: "超级用户",
                icon: "el-icon-star-off",
                url: "UserManage/components/SuperUser.vue",
              },
              {
                path: "/UserManage/OrdinaryUser",
                name: "ordinaryUser",
                label: "个人中心",
                icon: "el-icon-user",
                url: "UserManage/components/OrdinaryUser.vue",
              },
            ],
          },
        ],
        message: "管理用户",
      },
    };
  } else if (role === false) {
    return {
      code: 200,
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
            label: "固件管理",
            icon: "el-icon-s-tools",
            children: [
              {
                path: "/FuzzManage/Monitor",
                name: "fuzzMonitor",
                label: "监控窗口",
                icon: "el-icon-cpu",
                url: "FuzzManage/FuzzMonitor.vue",
              },
              {
                path: "/FuzzManage/SolidWareUpload",
                name: "solidWareUpload",
                label: "固件上传",
                icon: "el-icon-document-add",
                url: "FuzzManage/SolidWareUpload.vue",
              },
              {
                path: "/FuzzManage/SolidWareUpload",
                name: "solidWareUpload",
                label: "固件上传",
                icon: "el-icon-document-add",
                url: "FuzzManage/SolidWareUpload.vue",
              },
            ],
          },
          {
            path: "/UserManage",
            label: "用户管理",
            icon: "el-icon-user-solid",
            children: [
              {
                path: "/UserManage/OrdinaryUser",
                name: "ordinaryUser",
                label: "个人中心",
                icon: "el-icon-user",
                url: "UserManage/components/OrdinaryUser.vue",
              },
            ],
          },
        ],
        message: "普通用户",
      },
    };
  } else {
    return {
      code: 404,
      data: {
        message: "不存在该权限",
      },
    };
  }
};
