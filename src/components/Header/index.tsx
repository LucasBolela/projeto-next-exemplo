import Link from 'next/link'
import { useRouter } from 'next/router'
import style from './styles.module.scss'

export function Header() {
    // estamos recuperando o caminho rota atual
    const {asPath} = useRouter()

    return (
        <header className={style.container}>
            <div className={style.content}>
                <img src="/logo.svg" alt="Dev News"/>
                <nav>
                    <Link href="/"> 
                        <a className={asPath == "/" ? style.active : ''}>  Home </a>
                    </Link>
                    <Link href="/posts"> 
                        <a className={asPath == "/posts"? style.active: ''}> Posts </a>
                    </Link>
                    <Link href="/times"> 
                        <a className={asPath == "/times"? style.active: ''}> Times do Brasileirão</a>
                    </Link>
                    <Link href="/carrinhos"> 
                        <a className={asPath == "/carrinhos"? style.active: ''}> Carrinho de compra</a>
                    </Link>
                </nav>
            </div>
        </header>
    )
}