import { GridItemType } from '../../types/GridItemType';
import * as C from './styles';
import b7Svg from '../../svgs/b7.svg';
import { items } from '../../data/items';

interface Props {
    item: GridItemType;
    onClick: () => void;
}

export function GridItem({ item, onClick }: Props) {
    return (
        <C.Container
            showBackground={item.permanentShown || item.shown}
            onClick={onClick}
        >
            {/* Se não pode mostrar */}
            { !item.permanentShown && !item.shown &&
                <C.Icon src={b7Svg} opacity={0.1} />
            }

            { (item.permanentShown || item.shown) && item.item !== null &&
                <C.Icon src={items[item.item].icon} />
            }
        </C.Container>
    );
}