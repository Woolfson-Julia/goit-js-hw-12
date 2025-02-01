export const fetchPhotosByQuery = searchedQuery => {
  const searchParams = new URLSearchParams({
    key: '48304744-eb473523a8629254a32e0d9a6',
    q: searchedQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  const url = `https://pixabay.com/api/?${searchParams}`;

  

  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
};
