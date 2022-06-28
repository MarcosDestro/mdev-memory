import { useEffect, useState } from 'react';

import { InfoItem } from './components/InfoItem';
import { Button } from './components/Button';
import { GridItemType } from './types/GridItemType';
import { items } from './data/items';

import restartIcon from './svgs/restart.svg'
import LogoImg from './assets/logo.png';

import * as C from './styles';
import { GridItem } from './components/GridItem';
import { formatTimeElapsed } from './helpers/formatTimeElapsed';


export function App() {
    const [ playing, setPlaying ] = useState<boolean>(false);
    const [ timeElapsed, setTimeElapsed ] = useState<number>(0);
    const [ moveCount, setMoveCount ] = useState<number>(0);
    const [ shownCount, setShownCounter ] = useState<number>(0);
    const [ gridItems, setGridItems ] = useState<GridItemType[]>([]);

    useEffect(()=> resetAndCreateGrid(), []);

    useEffect(()=>{
        const timer = setInterval(()=>{
            if(playing){
                setTimeElapsed(timeElapsed + 1);
            };
        }, 1000);
        return ()=> clearInterval(timer);
    }, [playing, timeElapsed]);

    // Verify if opened are equals
    useEffect(()=>{
        if(shownCount === 2){
            let opened = gridItems.filter(item => item.shown === true);
            if(opened.length === 2){
                
                // If both are equal, make every permanent
                if(opened[0].item === opened[1].item){
                    let tempGrid = [...gridItems]
                    for(let i in tempGrid){
                        if(tempGrid[i].shown){
                            tempGrid[i].permanentShown = true;
                            tempGrid[i].shown = false;
                        }
                    }
                    setGridItems(tempGrid);
                    setShownCounter(0);
                } 
                // If they are not equal, close all "shown"
                else {
                    setTimeout(()=>{
                        let tempGrid = [...gridItems]
                        for(let i in tempGrid){
                            tempGrid[i].shown = false;
                        }
                        setGridItems(tempGrid);
                        setShownCounter(0);
                    }, 1000);
                }
                
                setMoveCount(moveCount => moveCount + 1);
            }
        }
    }, [shownCount, gridItems]);

    // Verify if game is over
    useEffect(()=>{
        if(moveCount > 0 && gridItems.every(item => item.permanentShown === true)){
            setPlaying(false);
        }
    }, [moveCount, gridItems]);

    // Cria a estrutura inicial do jogo
    function resetAndCreateGrid() {
        setTimeElapsed(0);
        setMoveCount(0);
        setShownCounter(0);        

        // Cria um Grid vazio
        let tempGrid: GridItemType[] = [];
        for(let i = 0; i < (items.length * 2); i++){
            tempGrid.push({
                item: null,
                shown: false,
                permanentShown: false
            });
        }

        // Espalhando os items 2 vezes
        for(let j = 0; j < 2; j++){
            for(let k = 0; k < items.length; k++){

                let position = -1;
                // Enquanto menor ou posição preenchida do array...
                while(position < 0 || tempGrid[position].item !== null){
                    // Cria um número aleatório entre 0 e 12
                    position = Math.floor(Math.random() * (items.length * 2));
                }
                tempGrid[position].item = k;
            }
        }
        // Insere o grid na state
        setGridItems(tempGrid);
        // Começa o jogo
        setPlaying(true);
    }

    function handleItemClick(index: number){
        if(playing && index !== null && shownCount < 2){
            let tempGrid = [...gridItems];

            if(tempGrid[index].permanentShown === false && tempGrid[index].shown === false){
                tempGrid[index].shown = true;
                setShownCounter(shownCount + 1);
            }

            setGridItems(tempGrid);
        }
    }

  return (
    <C.Container>
      <C.Info>
        <C.LogoLink>
            <img src={LogoImg} />
        </C.LogoLink>

        <C.InfoArea>
            <InfoItem label="Tempo" value={formatTimeElapsed(timeElapsed)}/>
            <InfoItem label='Movimentos' value={moveCount.toString()}/>
        </C.InfoArea>
        <Button
            label='Reiniciar'
            icon={restartIcon}
            onClick={resetAndCreateGrid}
        />
      </C.Info>
      <C.GridArea>
        <C.Grid>
            {gridItems.map((item, index)=>(
                <GridItem 
                    key={index}
                    item={item}
                    onClick={() => handleItemClick(index)}
                />
            ))}
        </C.Grid>
      </C.GridArea>

    </C.Container>
  )
}