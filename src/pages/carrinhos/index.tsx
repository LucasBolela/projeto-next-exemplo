import {GetStaticProps} from 'next';
import Link from 'next/link';
import style from './styles.module.scss';

interface Carrinho {
    id: string;
    data: Date;
    valor: string;
    titulo: string;
    descricao: string;
}
  
interface Carrinhos {
    carrinhos: Carrinho[]
}

export default function Caarinhos({carrinhos}: Carrinhos){
    return (
        <div>
            <div className={style.container}>
                <h1 className={style.title} > Lista de Carrinhos </h1>
                <h1 className={style.titleBackground} > Lista de Carrinhos </h1>
            </div>
            <div className={style.container}>
                {carrinhos.map( carrinho => (
                    <Link key={carrinho.id} href={`/carrinhos/`+ carrinho.id}>
                        <div className={style.cart}>
                            <img src="https://www.freeiconspng.com/thumbs/cart-icon/basket-cart-icon-27.png"
                                alt={"Chart"}
                                className={style.rowLogo}
                                width="40px"
                            />
                            <div className={style.description}>
                                <h1>{carrinho.titulo}</h1>
                                <p>{carrinho.descricao}</p>
                            </div>

                            <div className={style.price}>
                                <h3>R$ {carrinho.valor}</h3>
                                <p>{new Date(carrinho.data).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </Link>
                
                ))}
            </div>
    </div>
    )
}

export const getStaticProps: GetStaticProps<Carrinhos> = async() => {
  const response = await fetch('http://localhost:3333/carrinhos')
  const carrinhos = await response.json()
  return {
    props: {
      carrinhos
    },
    revalidate: 5
  }
}