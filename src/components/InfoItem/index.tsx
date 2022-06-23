import * as C from './styles';

interface InfoItemProps {
    label: string;
    value: string;
}

export function InfoItem({ label, value }: InfoItemProps) {
    return (
        <C.Container>
            <C.Label>{ label }</ C.Label>
            <C.Value>{ value }</C.Value>
        </C.Container>
    );
}