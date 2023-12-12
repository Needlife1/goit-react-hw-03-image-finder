import { api } from '../api/api';

const KEY = 'key=39241536-66dae2114b9b26bf6aee96b4f';
export const getAllPictures = async (inputValue, per_page) => {
  const { data } = await api.get(
    `?${KEY}&q=${inputValue}&image_type=photo&orientation=horizontal&per_page=${per_page}`
  );
  return data;
};
