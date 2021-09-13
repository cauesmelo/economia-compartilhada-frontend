import axios from 'axios';

const URL = 'http://localhost:8080';

interface ILoginResponse {
  administrador: boolean;
  nome: string;
  token: string;
}

export const login = async (username: string, password: string): Promise<ILoginResponse> => {
  const { data } = await axios.post(URL + "/auth", {
    email: username,
    senha: password,
  });

  return data.data;
}
