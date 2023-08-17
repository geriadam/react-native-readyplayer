export type AuthData = {
  email: string;
  password: string;
};
const signIn = (email: string, password: string): Promise<AuthData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        email,
        password
      });
    }, 1000);
  });
};

export const authService = {
  signIn,
};