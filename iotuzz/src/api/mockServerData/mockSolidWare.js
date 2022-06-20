// 引入mock.js
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

// 存放之后mock的数据
let List = [];
const count = 200;

for (let i = 0; i < count; i++) {
    List.push(
        Mock.mock({
            id: Mock.Random.guid(),
            'firmwareName|1': ['FT800', 'HIT16K33 LED', 'BBC micro:bit display', 'BBC micro:bit pong game', 'LP5562: 4-Channel RGB', 'Sample_mailbox_app', 'I2S Echo Sample','Controller Area Network','DMIC SAMPLE','LP5562: 4-Channel RGB','UART_DRIVER','Maxim DS3231 TCXO RTC Sample Application','Digital_to_Analog_Converter_(DAC)', 'I2C Fujitsu FRAM', 'Kukui general features', 'adt7420', 'FXOS8700', 'NXP MCUX Analog Comparator (ACMP)' ],
            name: Mock.Random.cname(),
            testType: Mock.Random.integer(0, 3),
        })
    );
}

export default {
    /**
     * 获取列表
     * 要带参数 firmwareName, page, limit; projectName可以不填, page,limit有默认值。
     * @param firmwareName, page, limit
     * @return {{code: number, count: number, data: *[]}}
     */
    getSolidWareList: (config) => {
        const { firmwareName, page = 1, limit = 20 } = param2Obj(config.url);
        console.log("firmwareName:" + firmwareName, "page:" + page, "分页大小limit:" + limit);
        const mockList = List.filter((solidWare) => {
            if (
              firmwareName &&
                solidWare.firmwareName.indexOf(firmwareName) === -1
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
     * @param 
     * @return {{code: number, data: {message: string}}}
     */
    addSolidWare: (config) => {
        const { firmwareName, name, testType} = JSON.parse(config.body);
        console.log(JSON.parse(config.body));
        List.unshift({
            id: Mock.Random.guid(),
            firmwareName: firmwareName,
            name: name,
            testType: testType,
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
     * @param id, firmwareName, name, testType
     * @return {{code: number, data: {message: string}}}
     */
    updateSolidWare: (config) => {
        const { id, firmwareName, name, testType} = JSON.parse(config.body);
        List.some((u) => {
            if (u.id === id) {
                u.firmwareName = firmwareName;
                u.name = name;
                u.testType = testType;
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
