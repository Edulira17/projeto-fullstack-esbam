import bgImage from '/bg-layout.jpg'
import { useState, useEffect } from 'react'
import type { FormEvent } from 'react';
import {
  listarAlunos,
  cadastrarAluno,
  atualizarAluno,
  deletarAluno,
} from './services/alunoService';
import type { Aluno } from './services/alunoService';
import { GraduationCap, Mail, Pencil, Trash, User } from 'lucide-react';


function App() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [curso, setCurso] = useState("");
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    listarAlunos();
  }, [])

  // const buscarAlunos = async () => {
  //   setLoading(true);
  //   try {
  //     const lista = await listarAlunos();
  //     setAlunos(lista)
  //   } catch (error) {
  //     console.error("Erro ao listar Alunos: ", error)
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const limparCampos = () => {
    setNome("");
    setEmail("");
    setCurso("");
    setEditandoId(null);
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!nome || !email || !curso) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      if (editandoId !== null) {
        const alunoAtualizado = await atualizarAluno(editandoId, {
          nome,
          email,
          curso
        });
        setAlunos((prev) => prev.map((aluno) => aluno.id === editandoId ? alunoAtualizado : aluno))
        setEditandoId(null);
      } else {
        const novoAluno = await cadastrarAluno({ nome, email, curso });
        setAlunos((prev) => [...prev, novoAluno])
        setLoading(false);
      }
      limparCampos();
    } catch (error) {
      console.error("Erro ao cadastrar o Aluno: ", error)
    }
  }

  const handlerEditar = (aluno: Aluno) => {
    setEditandoId(aluno.id!);
    setNome(aluno.nome);
    setEmail(aluno.email);
    setCurso(aluno.curso);
  }

  const excluirAluno = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir o Aluno ?")) {
      try {
        await deletarAluno(id);
        setAlunos((prev) => prev.filter((aluno) => aluno.id !== id));
      } catch (error) {
        console.error("Erro ao tentar excluir o Aluno ", error)
      }
    }
  }


  return (
    <div className="relative min-h-screen">
      <div
        className="fixed inset-0 bg-cover bg-center blur-sm -z-10"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4">
        <div className='w-full max-w-3xl mx-auto flex flex-col items-center gap-6'>
          <h1 className=" text-white font-extrabold p-5 mb-2 text-5xl">Cadastro de Alunos</h1>
          <form className="p-8 bg-white rounded shadow-md w-2xl  flex flex-col items-center gap-2" onSubmit={handleSubmit}>
            <h2 className='text-gray-800 text-2xl font-bold mb-5' >
              {editandoId ? "Editar Aluno" : "Adicionar Novo Aluno"}
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Nome do Aluno:</label>
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                type="text"
                required
                className="px-4 py-2 mb-4 border border-blue-500 rounded-md focus:outline-none focus:ring-blue-500 placeholder:text-sm w-80"
                placeholder="Nome Completo"
              />

              <label className="block text-sm font-medium text-gray-700 mb-1">E-mail do Aluno:</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                className="shadow appearance-none border border-blue-500 rounded  py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline placeholder:text-sm w-80"
                placeholder="Digite um e-mail"
              />

              <label className="block text-sm font-medium text-gray-700 mb-1 ">Curso do Aluno:</label>
              <input
                value={curso}
                onChange={(e) => setCurso(e.target.value)}
                type="text"
                className="shadow appearance-none border border-blue-500 rounded  py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline placeholder:text-sm w-80"
                placeholder="Digite um curso"
              />
            </div>
            <div className='flex gap-4'>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-400 text-white font-semibold py-2 px-4  border-blue-700 hover:border-blue-500 rounded-full cursor-pointer"
              >
                {editandoId ? "Atualizar" : "Cadastrar"}
              </button>

              {editandoId && (
                <button type='button' onClick={limparCampos} className='bg-gray-400 hover:bg-gray-300 text-white font-semibold py-2 px-4 rounded-full'>Cancelar</button>
              )}
            </div>
          </form>

          <div className='p-8 bg-white rounded shadow-md w-2xl  flex flex-col items-center gap-2 mb-10'>
            <h1 className='font-bold text-xl mb-4'>Lista de Alunos</h1>
            {loading ? (
              <p>Carregando alunos...</p>
            ) : alunos.length === 0 ? (
              <p>Nenhum aluno cadastrado.</p>
            ) : (
              <ul className='divide-y divide-white border border-white w-90 p-4 rounded-2xl bg-blue-400'>
                {alunos.map((aluno) => (
                  <li key={aluno.id} className='py-2 flex justify-between items-center'>
                    <div className=''>
                      <p className='text-lg font-semibold flex items-center gap-3 text-white'>
                        <User size={18} />
                        {aluno.nome}
                      </p>
                      <p className='text-sm text-white flex items-center gap-3'>
                        <Mail size={18} />
                        {aluno.email}
                      </p>
                      <p className='text-sm text-white flex items-center gap-3'>
                        <GraduationCap size={18} />
                        {aluno.curso}
                      </p>
                    </div>
                    <div className='flex gap-2'>
                      <button
                        onClick={() => handlerEditar(aluno)}
                        className='text-white  hover:text-blue-500'
                        title='Editar'
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => excluirAluno(aluno.id!)}
                        className='text-white  hover:text-red-700'
                        title='Deletar'
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
