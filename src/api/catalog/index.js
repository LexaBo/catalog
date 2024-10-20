import axios from 'axios';

export const getUsers = () => axios.get('https://json.medrocket.ru/users/');
export const getAlbums = (idUser) => axios.get(`https://json.medrocket.ru/albums?userId=${idUser}`);
export const getPhotos = (idAlbum) => axios.get(`https://json.medrocket.ru/photos?albumId=${idAlbum}`);
