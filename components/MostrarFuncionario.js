// import {View,TextInput,TouchableOpacity,Text,FlatList} from 'react-native'
// export function MostarFuncionario() {
//   return <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Funcionários Cadastrados</Text>
//             {funcionarios.length === 0 ? (
//               <Text>Nenhum funcionário cadastrado.</Text>
//             ) : (
//               <FlatList
//                 data={funcionarios}
//                 keyExtractor={(item) => item.nome}
//                 renderItem={({ item }) => (
//                   <TouchableOpacity onPress={() => handleMostrar(item)}>
//                     <Text style={styles.funcionarioText}>{item.nome}</Text>
//                   </TouchableOpacity>
//                 )}
//               />
//             )}
//             <TouchableOpacity 
//               style={styles.closeButton} 
//               onPress={() => setModalVisibleMostrar(false)}
//             >
//               <Text style={styles.buttonText}>Fechar</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
// }