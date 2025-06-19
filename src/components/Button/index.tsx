import { styles } from '@/components/Button/styles';
import { TouchableOpacity, Text } from 'react-native';

type Props = {
    title: string;
}

export function Button({title}: Props) {
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.8}>
            <Text style={styles.title}>{ title }</Text>
        </TouchableOpacity>
    )
}