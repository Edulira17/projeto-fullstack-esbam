import axios from "axios";

export interface Aluno {
  id?: number;
  nome: string;
  email: string;
  curso: string;
}

export const listarAlunos = async (): Promise<Aluno[]> => {
  const res = await axios.get("http://localhost:3000/alunos");
  return res.data;
}

export const cadastrarAluno = async (aluno: Aluno): Promise<Aluno> => {
  const res = await axios.post("http://localhost:3000/alunos", aluno);

  return res.data;
}

export const atualizarAluno = async (id: number, aluno: Partial<Aluno>): Promise<Aluno> => {
  const res = await axios.put(`http://localhost:3000/alunos/${id}`, aluno);

  return res.data;
}

export const deletarAluno = async(id: number): Promise<void> => {
  await axios.delete(`http://localhost:3000/alunos/${id}`);
}