import axiosInstance from '@services/axiosConfig';

//  GET
export const getData = async (url: string, id: string | number = '') => {
  try {
    const response = await axiosInstance.get(`${url}${id}`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// POST
export const postData = async (url: string, data?: unknown) => {
  try {
    const response = await axiosInstance.post(url, data);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// PUT
export const putData = async (
  url: string,
  id: string | number,
  data: unknown
) => {
  try {
    const response = await axiosInstance.put(`${url}${id}`, data);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// PATCH
export const patchData = async (
  url: string,
  id: string | number,
  data: unknown
) => {
  try {
    const response = await axiosInstance.patch(`${url}${id}`, data);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// DELETE
export const deleteData = async (url: string, id: string | number) => {
  try {
    const response = await axiosInstance.delete(`${url}${id}`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
