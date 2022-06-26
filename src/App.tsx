import * as C from './styles';
import LogoImg from './assets/logo.png';
import { InfoItem } from './components/InfoItem';
import { Button } from './components/Button';
import restartIcon from './svgs/restart.svg'


export function App() {

  function resetAndCreateGrid() {

  }

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
        <Button
          label='Reiniciar'
          icon={restartIcon}
          onClick={resetAndCreateGrid}
        />
      </C.Info>
      <C.GridArea>
        ...
      </C.GridArea>

    </C.Container>
  )
}