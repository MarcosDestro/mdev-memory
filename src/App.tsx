import * as C from './styles';
import LogoImg from './assets/logo.png';
import { InfoItem } from './components/InfoItem';


export function App() {
  return (
    <C.Container>
      <C.Info>
        <C.LogoLink>
          <img src={LogoImg} />
        </C.LogoLink>

        <C.InfoArea>
          <InfoItem label='Tempo' value='00:00'/>
          <InfoItem label='Movimentos' value='0'/>
        </C.InfoArea>
        <button>Reiniciar</button>
      </C.Info>
      <C.GridArea>
        ...
      </C.GridArea>

    </C.Container>
  )
}