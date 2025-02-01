import axios from 'axios';

export const fetchPhotosByQuery = (searchedQuery, currentPage) => {
  const axiosOptions = {
    params: {
    key: '48304744-eb473523a8629254a32e0d9a6',
    q: searchedQuery,
    page: currentPage,
    per_page: 15,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    }
  };
  return axios.get(`https://pixabay.com/api/`, axiosOptions);
};

