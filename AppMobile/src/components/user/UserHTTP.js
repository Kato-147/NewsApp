import AxiosInstance from '../../helper/AxiosInstance';

export const login = async (email, password) => {
  try {
    const url = 'users/login';
    const body = {email, password};
    const res = await AxiosInstance().post(url, body);
    return res;
  } catch (err) {
    return err;
  }
};

export const register = async (email, password, name, address) => {
  try {
    const url = 'users/register';
    const body = {email, password, name, address};
    const res = await AxiosInstance().post(url, body);
    return res;
  } catch (err) {
    console.log('Loi goi ham dang ky', err);
  }
};