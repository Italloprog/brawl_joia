import { useContext, useEffect, useState } from 'react';
import './App.css'
import { useForm } from 'react-hook-form';
import BrawlerProvider from './context/brawler_provider';
import BrawlerContext from './context/brawler_context';


export default function App() {
  return (
    <>
      <Header title={"brawl joia 👍"} />

      <BrawlerProvider>
        <Body />
      </BrawlerProvider>

      <Footer />
    </>
  )
}

function Header({ title }: { title: string }) {

  return (
    <header>
      <h1>{title}</h1>
    </header>
  );
}

function Body() {
  let { brawlers, SetBrawlers } = useContext(BrawlerContext);

  useEffect(() => {
    const fetchData = async () => {
      await fetch('http://localhost:3000/listar')
        .then(response => response.json())
        .then(data => SetBrawlers(data));
    };
    fetchData();
  }, [brawlers]);

  return (
    <body>

      <ComponenteAdicionar />

      <div className='cards'>
        {brawlers && brawlers.map((brawler) => (
          <Card id={brawler.id} title={brawler.name} description={brawler.descricao} imagem={brawler.imagem} />
        ))}
        <Card id={123} title={'elprimo'} description={'hahahaha'} imagem={'https://media.tenor.com/DGrNbS7QC3kAAAAM/el-primo.gif'} />
        <Card id={123} title={'spike'} description={'MUAHAHAHAHAAH'} imagem={'https://pa1.aminoapps.com/7483/5c6dc7b3c08c6d02cfd499f264661e9cd1e58643r1-510-510_hq.gif'} />
      </div>
    </body>
  )
}

function Footer() {
  return (
    <footer>
      <p>Feito com ❤ pela equipe joia</p>
    </footer>
  )
}

function Card({ id, title, description, imagem }: { id: number, title: string, description: string, imagem: string }) {
  return (
    <div className='card'>
      <img src={imagem} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
      <ComponenteAlterar id_brawler={id} />
      <DeletarButton id_brawler={id} />
    </div>
  )
}

function ComponenteAlterar({ id_brawler }: { id_brawler: number }) {
  let [form_alterar, SetForm_alterar] = useState(false);

  return (
    <>
      <button onClick={() => SetForm_alterar(!form_alterar)}> Alterar </button>
      {form_alterar && <FormUpt SetForm_alterar={SetForm_alterar} id_brawler={id_brawler} />}
    </>
  )
}

function FormUpt({ SetForm_alterar, id_brawler }: { SetForm_alterar: React.Dispatch<React.SetStateAction<boolean>>, id_brawler: number }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  let { brawlers } = useContext(BrawlerContext);

  const onSubmit = async (data: any) => {
    await fetch(`http://localhost:3000/atualizar/${id_brawler}`, {
      method: 'PUT',
      body: JSON.stringify({
        nome: data.nome,
        descricao: data.descricao,
        image: data.imagem
      }),
    });

    SetForm_alterar(false);
    brawlers.pop();
  };

  return (

    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <p>digite os atributos atualizados</p>
        <input type='text' placeholder='digite o nome...' {...register("nome", { required: true })}></input>
      </div>
      <div>
        <input type='text' placeholder='digite a descricao...' {...register("descricao", { required: true })}></input>
      </div>
      <div>
        <input type='text' placeholder='digite a Url da imagem...' {...register("imagem", { required: true })}></input>
      </div>

      {errors.exampleRequired && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
}

function DeletarButton({ id_brawler }: { id_brawler: number }) {
  let { brawlers } = useContext(BrawlerContext);

  async function handleDelete() {
    let confirmado = confirm('Deseja realmente deletar?');
    if (confirmado) {
      await fetch(`http://localhost:3000/remover/${id_brawler}`, {
        method: 'DELETE',
      });
      brawlers.pop();
    }
  }

  return (
    <button onClick={handleDelete}>Deletar</button>
  )
}

function ComponenteAdicionar() {
  let [form_adicionar, SetForm_adicionar] = useState(false);

  return (
    <div className='addBox'>
    <div className='add'>
      <button className='addButton' onClick={() => { SetForm_adicionar(!form_adicionar) }}>Adicionar</button>

      <div className='formAdd'>
        {form_adicionar &&
          <FormAdd SetForm_adicionar={SetForm_adicionar} />}
      </div>

    </div>
  </div>
  )
}

function FormAdd({ SetForm_adicionar }: { SetForm_adicionar: React.Dispatch<React.SetStateAction<boolean>> }) {
  let { brawlers } = useContext(BrawlerContext);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    await fetch('http://localhost:3000/criar', {
      body: JSON.stringify({
        nome: data.nome,
        descricao: data.descricao,
        imagem: data.imagem
      }),
      method: 'POST',
    });

    SetForm_adicionar(false);
    brawlers.pop();
  };


  return (

    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <p>digite os atributos</p>
        <input type='text' placeholder='digite o nome...' {...register("nome", { required: true })}></input>
      </div>
      <div>
        <input type='text' placeholder='digite a descricao...' {...register("descricao", { required: true })}></input>
      </div>
      <div>
        <input type='text' placeholder='digite a Url da imagem...' {...register("imagem", { required: true })}></input>
      </div>

      {errors.exampleRequired && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
}