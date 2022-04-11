import {GetServerSideProps} from 'next';
import Link from 'next/link';
import style from './styles.module.scss';

interface Time { 
    id: string;
    nome: string;
    logo: string;
}
  
interface Times { 
    times: Time[]
}

export default function Times({times}: Times){
    return (
        <div>
            <h1 className={style.title} style={{paddingLeft: 30 + "%"}}> TIMES DO BRASILEIRÃO </h1>
            
            <div className={style.containerTimes}>
                {times.map( time => (
                    <div className={style.rowTime} key={time.id}>
                        <img src={time.logo}
                            alt={"Logo "+ time.nome}
                            className={style.rowLogo}
                            width="40px"
                        />
                        <Link href={`/times/`+time.id}>
                            <a>{time.nome}</a>
                        </Link>
                    </div>
                ))}
            </div>
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