import axios from "./axios";

export const getData = () => {
  return axios.request({
    url: "/home/getData",
    method: "get",
  });
};

export const getMenu = (param) => {
  return axios.request({
    url: "/permission/getMenu",
    method: "post",
    data: param,
  });
};

export const getUser = (params) => {
  return axios.request({
    url: "/api/profile/",
    method: "get",
    params,
  });
};

export const postUser = (params) => {
  return axios.request({
    url: "/api/user/",
    method: "post",
    data: params,
  });
};

export const patchProfile = (params) => {
  return axios.request({
    url: "/api/profile",
    method: "patch",
    data: params,
  });
};

export const callKit = (params) => {
  return axios.request({
    url: "/api/firmware/call/",
    method: "post",
    data: params,
  });
};

export const getFirmware = () => {
  return axios.request({
    url: "/api/firmware",
    method: "get",
    headers: { 'Authorization': 'Bearer ' + this.$store.state.user.token }
  });
};
