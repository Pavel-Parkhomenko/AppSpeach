import axios from 'fetch';

const API_BASE_URL = 'http://localhost:3000';

export const getDataFromServer = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/anyy`, {
      method: "POST",
      headers: {
      'Content-Type': 'application/json',
    }
  })

  if(!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data = await response.json()
  return data

  } catch(error) {
    console.error('Ошибка при обработке изображений:', error);
    throw error;
  }
}