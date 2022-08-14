// polling-utils.js

/**
 * @descripting 轮询功能
 * @param {String} type 请求类型
 * @param {String} url 地址
 * @param {Object} data 请求数据
 * @param {Number} delay 轮询间隔时间
 */
import axios from "axios";

export default function polling(type, url, data, delay = 5000) {
  return new Promise((resolve) => {
    axios({
      method: type,
      url: url,
      data: data,
    }).then(() => {
      setTimeout(() => {
        resolve(polling(type, url, data, delay));
      }, delay);
    })
  });
}
