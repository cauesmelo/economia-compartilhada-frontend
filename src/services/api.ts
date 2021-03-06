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

interface Response {
  message: string;
  type: 'SUCCESS' | 'FAIL';
}

export interface IUserInsert {
  email: string;
  name: string;
  password: string;
  repeatedPassword: string;
}

export interface IItemComplete {
  nome: string;
  descricao: string;
  tipo: 'UNICO' | 'MULTIPLO';
  compartilhamentos: any;
}

export interface IShare {
  itemId: number;
  recipient: string;
  startDate: string;
  endDate: string;
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
): Promise<Response> => {
  const response = {} as Response;

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

export const search = async (
  searchQuery: string,
  pageNumber: number,
  token: string
): Promise<IGetItemsResponse> => {
  const { data } = await axios.get(
    URL +
      `/api/item/listatermo?sort=&per_page=10&page=${pageNumber}&termo=${searchQuery}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data.data;
};

export const createAccount = async (user: IUserInsert): Promise<Response> => {
  const response = {} as Response;

  try {
    await axios.post(
      URL + `/api/usuario/novo`,
      {
        email: user.email,
        nome: user.name,
        senha: user.password,
        senhaRepetida: user.repeatedPassword,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    response.message = 'Usu??rio criado com sucesso';
    response.type = 'SUCCESS';
  } catch (err: any) {
    response.message = Object.values(err.response.data.errors)[0] as string;
    response.type = 'FAIL';
  }

  return response;
};

export const getItem = async (
  id: number,
  token: string
): Promise<IItemComplete> => {
  const { data } = await axios.get(URL + `/api/item/listaunico?itemId=${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log(data);
  return data.data;
};

export const shareItem = async (
  share: IShare,
  token: string
): Promise<void> => {
  const response = await axios.put(
    URL + `/api/compartilhamento/novo`,
    {
      item: {
        id: share.itemId,
      },
      dataInicio: share.startDate,
      dataTermino: share.endDate,
      email: share.recipient,
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log(response);
};
