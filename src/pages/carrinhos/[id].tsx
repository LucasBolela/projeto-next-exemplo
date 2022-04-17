import { GetStaticPaths, GetStaticProps } from 'next';
import {useRouter} from 'next/router';
import style from './styles.module.scss';

interface Item {
    id: string,
    produto: string
    valor: string;
    titulo: string;
    descricao: string;
}

interface Itens {
    itens: Item[]
}

export default function Itens(props){
    const router = useRouter()
    if(router.isFallback) {
        return <p> Loading ... </p>
    }
    return (
        <>
            <div className={style.container}>
                <h1 className={style.title} > {props.carrinho.titulo}</h1>
                <p className={style.titleDescription}>{props.carrinho.descricao}</p>
                <h1 className={style.titleBackground} > Lista de Carrinhos </h1>
            </div>
            <div className={style.container}>
                {
                    props.itens.map(item => (
                        <li className={style.itens} key={item.id}> {item.produto} </li>
                        
                    ))
                }
            </div>
        </>
    )
}

export const getStaticProps: GetStaticProps<Itens> = async(context) => {
    const {id} = context.params;
    const responseItens = await fetch(`http://localhost:3333/itens?carrinhoId=${id}`);
    const responseCarrinho = await fetch(`http://localhost:3333/carrinhos?id=${id}`);
    
    const itens = await responseItens.json();
    const carrinho = await responseCarrinho.json();
    
    return {
        props: {
            carrinho: carrinho[0],
            itens,
        },
        revalidate: 5
    }
}

// vai ser executado antes de carregar o componente
// recupera todos os posts
export const getStaticPaths:GetStaticPaths = async() => {
    return {
        paths: [],
        fallback: true
    }
}