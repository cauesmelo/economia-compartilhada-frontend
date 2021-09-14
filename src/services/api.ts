import axios from 'axios';

const URL = 'http://localhost:8080';

interface ILoginResponse {
  administrador: boolean;
  nome: string;
  token: string;
}

export interface IItem {
  id: number;
  nome: string;
  descricao: string;
  tipo: 'MULTIPLO' | 'UNICO';
}

interface IGetItemsResponse {
  data: IItem[];
  total: number;
  current_page: number;
  per_page: number;
  from: number;
  last_page: number;
  to: number;
}

export const login = async (
  username: string,
  password: string
): Promise<ILoginResponse> => {
  const { data } = await axios.post(URL + '/auth', {
    email: username,
    senha: password,
  });
  return data.data;
};

export const getItems = async (
  page: number,
  token: string
): Promise<IGetItemsResponse> => {
  const { data } = await axios.get(
    URL + `/api/item/lista?sort=&per_page=10&page=${page}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data.data;
};
