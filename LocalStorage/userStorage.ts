export const addUserToLocal = (user) => {
  const getUser = getUserFromLocal();

  if (getUser.indexOf(user) === -1 && user !== {}) {
    getUser.push(user);
  }

  window.localStorage.setItem('User', JSON.stringify(getUser));
};

export const getUserFromLocal = () => {
  let user;
  if (window.localStorage.getItem('User') === null) {
    user = [];
  } else {
    user = JSON.parse(window.localStorage.getItem('User'));
  }
  return user;
};

export const deleteUserFromLocal = () => {
  window.localStorage.removeItem('User');
};
