export const environment = {
  production: true
};

export const localhostUrl = `http://localhost:3000/api/`;

export const user = {
  name: '',
  settings: {}
};

export const baseUrl = `${localhostUrl}${user.name}/`;
export const recordUrl = `${baseUrl}records`;

export const publicKey =
  'BNsTGbCeYfPwet42DdxaJYbuDfJQUwMjASNHfbWdIk0ian-e0v6t13iKyIyJbtjdPLOkNFSe-fBneIgR8PvmqV0';
