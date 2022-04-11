import {GetServerSideProps} from 'next';
import {useRouter} from 'next/router';
import style from './styles.module.scss';

interface Time { 
    id: string;
    nome: string;
    cidade:string;
    estado:string;
    estadio: string;
    capacidade: number;
    logo: string;
    imagemEstadio: string;
}
  
interface Times2 {
times: Time[]
}

export default function Post({times}: Times2){
    const router = useRouter()
    if(router.isFallback) {
        return <p> Loading ... </p>
    }
    return (
        <div className={style.container}>
            {times.map(time => (
                <h1 className={style.title} key={time.id}> {time.nome} </h1>
            ))}
            <div>
                {
                    times.map(time => (
                        <div className={style.teamContent} key={time.id}>
                            <img src={time.logo}
                                alt={"Logo "+ time.nome}
                                className={style.teamLogo}
                            />
                            <div className={style.text}>
                                <ul>
                                    <li><span>Cidade:</span> {time.cidade}</li>
                                    <li><span>Estado:</span> {time.estado}</li>
                                    <li><span>Estadio:</span> {time.estadio}</li>
                                    <li><span>Capacidade:</span> {time.capacidade}</li>
                                </ul>
                                <img src={time.imagemEstadio}
                                    alt={"Imagem "+ time.estadio}
                                    className={style.teamEstadio}
                                />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<Times2> = async (context) => {
    const {id} = context.params;
    const response = await fetch(`http://localhost:3333/times?id=${id}`)
    const times = await response.json()
    return {
        props: {
            times
        }
    }
}