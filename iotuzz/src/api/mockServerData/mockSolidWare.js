import Mock from "mockjs";

// get请求从config.url获取参数，post从config.body中获取参数
function param2Obj(url) {
    const search = url.split("?")[1];
    if (!search) {
        return {};
    }
    return JSON.parse(
        '{"' +
        decodeURIComponent(search)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
        '"}'
    );
}

let List = [];
const count = 200;

for (let i = 0; i < count; i++) {
    List.push(
        Mock.mock({
            id: Mock.Random.guid(),
            projectName: Mock.Random.string('lower', 7),
            name: Mock.Random.cname(),
            email: Mock.Random.email(),
        })
    );
}

export default {
    /**
     * 获取列表
     * 要带参数 projectName, page, limit; projectName可以不填, page,limit有默认值。
     * @param projectName, page, limit
     * @return {{code: number, count: number, data: *[]}}
     */
    getSolidWareList: (config) => {
        const { projectName, page = 1, limit = 20 } = param2Obj(config.url);
        console.log("projectName:" + projectName, "page:" + page, "分页大小limit:" + limit);
        const mockList = List.filter((solidWare) => {
            if (
              projectName &&
                solidWare.projectName.indexOf(projectName) === -1
            )
                return false;
            return true;
        });
        const pageList = mockList.filter(
            (item, index) => index < limit * page && index >= limit * (page - 1)
        );
        return {
            code: 20000,
            count: mockList.length,
            list: pageList,
        };
    },
    /**
     * 添加固件
     * @param name, addr, email, type
     * @return {{code: number, data: {message: string}}}
     */
    addSolidWare: (config) => {
        const { projectName, name, email} = JSON.parse(config.body);
        console.log(JSON.parse(config.body));
        List.unshift({
            id: Mock.Random.guid(),
            projectName: projectName,
            name: name,
            email: email,
        });
        return {
            code: 20000,
            data: {
                message: "添加成功",
            },
        };
    },
    /**
     * 删除固件
     * @param id
     * @return {*}
     */
    deleteSolidWare: (config) => {
        const { id } = JSON.parse(config.body);
        if (!id) {
            return {
                code: -999,
                message: "参数不正确",
            };
        } else {
            List = List.filter((u) => u.id !== id);
            return {
                code: 20000,
                message: "删除成功",
            };
        }
    },
    /**
     * 批量删除
     * @param config
     * @return {{code: number, data: {message: string}}}
     */
    batchremove: (config) => {
        let { ids } = param2Obj(config.url);
        ids = ids.split(",");
        List = List.filter((u) => !ids.includes(u.id));
        return {
            code: 20000,
            data: {
                message: "批量删除成功",
            },
        };
    },
    /**
     * 修改固件
     * @param id, name, addr, email, type
     * @return {{code: number, data: {message: string}}}
     */
    updateSolidWare: (config) => {
        const { id, projectName, name, email} = JSON.parse(config.body);
        List.some((u) => {
            if (u.id === id) {
                u.projectName = projectName;
                u.name = name;
                u.email = email;
                return true;
            }
        });
        return {
            code: 20000,
            data: {
                message: "编辑成功",
            },
        };
    },
};
