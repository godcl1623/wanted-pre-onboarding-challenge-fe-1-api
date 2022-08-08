import { HttpRequest } from 'api/httpRequest';

const signUpController = async (emailValue: string, passwordValue: string) => {
  const httpRequest = new HttpRequest();

  try {
    const response = await httpRequest.post<string, string>(
      '/users/create',
      `email=${emailValue}&password=${passwordValue}`,
    );
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export default signUpController;
