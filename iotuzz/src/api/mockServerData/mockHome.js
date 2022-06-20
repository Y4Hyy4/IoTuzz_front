// mock数据模拟
import Mock from "mockjs";

// 图表数据
let List = [];
export default {
  getStatisticalData: () => {
    //Mock.Random.float 产生随机数100到8000之间 保留小数 最小0位 最大0位
    for (let i = 0; i < 7; i++) {
      List.push(
        Mock.mock({
          测试用户A: Mock.Random.float(1, 10, 0, 0),
          测试用户B: Mock.Random.float(1, 10, 0, 0),
          测试用户C: Mock.Random.float(1, 10, 0, 0),
          测试用户D: Mock.Random.float(1, 10, 0, 0),
          测试用户E: Mock.Random.float(1, 10, 0, 0),
          测试用户F: Mock.Random.float(1, 10, 0, 0),
        })
      );
    }
    return {
      code: 200,
      data: {
        // 饼图
        videoData: [
          {
            name: "测试用户A",
            value: 3,
          },
          {
            name: "测试用户B",
            value: 2,
          },
          {
            name: "测试用户C",
            value: 1,
          },
          {
            name: "测试用户D",
            value: 0,
          },
          {
            name: "测试用户E",
            value: 3,
          },
          {
            name: "测试用户F",
            value: 2,
          },
        ],
        // 柱状图
        userData: [
          {
            date: "周一",
            new: 1,
            active: 1,
          },
          {
            date: "周二",
            new: 3,
            active: 4,
          },
          {
            date: "周三",
            new: 1,
            active: 3,
          },
          {
            date: "周四",
            new: 0,
            active: 2,
          },
          {
            date: "周五",
            new: 2,
            active: 5,
          },
          {
            date: "周六",
            new: 1,
            active: 6,
          },
          {
            date: "周日",
            new: 4,
            active: 9,
          },
        ],
        // 折线图
        orderData: {
          date: [
            "20191001",
            "20191002",
            "20191003",
            "20191004",
            "20191005",
            "20191006",
            "20191007",
          ],
          data: List,
        },
        tableData: [
          {
            name: "测试用户A",
            todayUpload: 3,
            todayTest: 3,
          },
          {
            name: "测试用户B",
            todayUpload: 4,
            todayTest: 2,
          },
          {
            name: "测试用户C",
            todayUpload: 1,
            todayTest: 1,
          },
          {
            name: "测试用户D",
            todayUpload: 0,
            todayTest: 0,
          },
          {
            name: "测试用户E",
            todayUpload: 5,
            todayTest: 3,
          },
          {
            name: "测试用户F",
            todayUpload: 6,
            todayTest: 2,
          },
        ],
      },
    };
  },
};
