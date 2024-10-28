import {TextInput, StyleSheet,TextInputProps} from 'react-native'
export function Input({...rest}:TextInputProps) {
  return <TextInput {...rest} style={styles.input}/>
}

const styles = StyleSheet.create({
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 7,
    paddingHorizontal: 16,
  }
})