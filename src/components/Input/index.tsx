import { styles } from '@/components/Input/styles'

import { TextInput, TextInputProps } from 'react-native'

export function Input({...res}: TextInputProps) {
    return (
        <TextInput 
            style={styles.container} {...res}
            placeholderTextColor="#74798B"
        /> 
    )
}