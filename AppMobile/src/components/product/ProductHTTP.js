import AxiosInstance from '../../helper/AxiosInstance';

export const getAllProducts = async () => {
  try {
    const url = '/products/';
    const res = await AxiosInstance().get(url);
    console.log("res=>>>>>>>>>>",res);
    return res;
  } catch (err) {
    console.log('Loi goi ham lay danh sach san pham', err);
  }
};

export const getTickets = async () => {
  try {
    const url = '/tickets/';
    const res = await AxiosInstance().get(url);
    console.log("res=>>>>>>>>>>",res);
    return res;
  } catch (err) {
    console.log('Loi goi ham lay danh sach ve', err);
  }
};

export const addTickets = async (nameUser, nameMovie, quantity, chair) => {
  try {
    const url = '/tickets/add';
    const body = {nameUser, nameMovie, quantity, chair};
    const res = await AxiosInstance().post(url,body);
    console.log("res=>>>>>>>>>>",res);
    return res;
  } catch (err) {
    console.log('Loi goi ham them ve', err);
  }
};