import {useState, useCallback} from 'react';
import {generateTestAddresses} from '../helpers/gerarTarefas'
export function useEndereco() {

  const [enderecos,setEnderecos] = useState([])
  const loadEnderecos = useCallback(()=>{
    setEnderecos(generateTestAddresses(20))
  },[])
  return {enderecos,loadEnderecos}
}