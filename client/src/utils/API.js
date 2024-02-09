// route to get logged in user's info (needs the token)
export const getMe = (token) => {
    return fetch('/api/users/me', {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });
  };
  
  export const createUser = (userData) => {
    return fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  };
  
  export const loginUser = (userData) => {
    return fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  };
  
  // save plant data for a logged in user
  export const savePlant = (plantData, token) => {
    return fetch('/api/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(plantData),
    });
  };
  
  // remove saved plant data for a logged in user
  export const deletePlant = (plantId, token) => {
    return fetch(`/api/users/plants/${plantId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  };
  
  // make a search to perenual api
  // https://perenual.com/api/species-list?key=sk-S9zG65c4f45dab87a4077&page=1=purpleheart
  export const searchPerenual = (query) => {
    return fetch(`https://perenual.com/api/species-list?key=sk-S9zG65c4f45dab87a4077&page=1${query}`);
  };