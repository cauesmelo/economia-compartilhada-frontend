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

export type IItemInsert = Omit<IItem, 'id'>;

interface IGetItemsResponse {
  data: IItem[];
  total: number;
  current_page: number;
  per_page: number;
  from: number;
  last_page: number;
  to: number;
}

interface IPasswordChange {
  oldPassword: string;
  newPassword: string;
  repeatedNewPassword: string;
}

interface IPasswordChangeResponse {
  message: string;
  type: 'SUCCESS' | 'FAIL';
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

export const postItem = async (
  item: IItemInsert,
  token: string
): Promise<void> => {
  await axios.put(
    URL + `/api/item/novo`,
    { ...item },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteItem = async (id: number, token: string): Promise<void> => {
  await axios.delete(URL + `/api/item/${id}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateItem = async (item: IItem, token: string): Promise<void> => {
  await axios.post(
    URL + `/api/item/atualiza/`,
    { ...item },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const updatePassword = async (
  password: IPasswordChange,
  token: string
): Promise<IPasswordChangeResponse> => {
  const response = {} as IPasswordChangeResponse;

  try {
    await axios.post(
      URL + `/api/usuario/trocaSenha`,
      {
        senhaAntiga: password.oldPassword,
        senhaNova: password.newPassword,
        senhaNovaRepetida: password.repeatedNewPassword,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    response.message = 'Senha alterada com sucesso';
    response.type = 'SUCCESS';
  } catch (err: any) {
    response.message = Object.values(err.response.data.errors)[0] as string;
    response.type = 'FAIL';
  }

  return response;
};
