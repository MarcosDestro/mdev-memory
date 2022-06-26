import * as C from './styles'

interface ButtonProps {
    label: string;
    icon?: any;
    onClick: React.MouseEventHandler<HTMLDivElement>;
}

export function Button({ label, icon, onClick }: ButtonProps) {
    return (
        <C.Container onClick={onClick}>
            { icon &&
                <C.IconArea>
                    <C.Icon src={icon}/>
                </C.IconArea>
            }
            <C.Label>
                {label}
            </C.Label>
        </C.Container>
    );
};