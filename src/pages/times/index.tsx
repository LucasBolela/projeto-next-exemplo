import {GetServerSideProps} from 'next';

interface Time { 
    id: string;
    nome: string;
    cidade: string;
    estado: string;
    estadio: string;
    capacidade: string;
}
  
interface Times { 
    times: Time[]
}

export default function Times({times}: Times){
    return (
        <div>
            <h1> Times do Brasileirão </h1>
                <ul>
                {times.map( time => (
                    <li key={time.id}> Nome: {time.nome} -  Cidade: {time.cidade} - Estado: {time.estado} -  Estádio: {time.estadio} - Capacidade:{time.capacidade} </li>
                ))}
            </ul>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<Times> = async () => {
  const response = await fetch('http://localhost:3333/times')
  const times = await response.json()
  return {
    props: {
      times 
    }
  }
}