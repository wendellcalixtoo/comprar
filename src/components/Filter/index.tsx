import {
    Text,
    TouchableOpacity,
    TouchableOpacityProps,
} from 'react-native'

import { FilterStatus } from '@/types/FilterStatus'
import { styles } from '@/components/Filter/styles'
import { StatusIcon } from '@/components/StatusIcon'


type Props = TouchableOpacityProps & {
    status: FilterStatus,
    isActive: boolean
}

export function Filter ({ status, isActive, ...rest }: Props) {
    return (
        <TouchableOpacity style={[styles.container, { opacity: isActive ? 1 : 0.5 }]} {...rest}>
            <StatusIcon status={status} />
            <Text style={styles.title}>{status === FilterStatus.DONE ? "Comprados" : "Pendentes"}</Text>
        </TouchableOpacity>
    )
}
