import axios from 'axios';

const URL = 'http://localhost:8080'

interface User {
  name: string;
  admin: boolean;
  token: string;
}

export async function login(username: string, password: string): Promise<void> {
  try {
    const data = axios.post(URL + "/auth", {
      email: username,
      senha: password,
    });

    console.log(data);


  } catch (err) {
    console.log('Erro');
  }
}