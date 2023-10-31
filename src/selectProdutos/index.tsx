import React, { useEffect, useState } from 'react'
import { TouchableOpacity, TextInput, View, Text, Modal, FlatList, StyleSheet, SafeAreaView } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

export const SelectProdutos = ({ options = [], onChange, initialSelect = [] }) => {
    const [visible, setVisible] = useState(false)
    const [originalOptions, setOriginalOptions] = useState([]);
    const [data, setData] = useState([]);
    const [termo, setTermo] = useState('');
    const [selectedItem, setSelectedItem] = useState([])


   /* useEffect(() => {
        async function busca() {
          try {
            const response = await fetch('http://192.168.237.106:5000/produtos');
            const json = await response.json();
           // setData(json);
          } catch (err) {
            console.error(err);
          }
        }
        busca();
      }, []);
   */
    useEffect(() => {
        setOriginalOptions(options)
        setData(options)
    }, [options])

    useEffect(() => {
        setData(
            originalOptions.filter((item) => {
                return (
                    item.codigo?.toString().includes(termo) ||
                    item.nome.includes(termo)
                );
            })
        );
    }, [termo]);


    function renderItem(item: any) {
        return (
            <TouchableOpacity style={[styles.item, {
                backgroundColor: selectedItem?.findIndex(i => i.codigo === item.codigo) != -1 ? '#cff' : '#fff'
            }]}

                onPress={() => toggleSelection(item)}>
                <Text
                    style={[styles.txt, { fontWeight: selectedItem?.findIndex(i => i.codigo === item.codigo) != -1 ? 'bold' : null }]}
                >codigo: {item.codigo}  nome: {item.nome}</Text>

                {selectedItem?.findIndex(i => i.codigo === item.codigo) != -1 ?
                    <AntDesign name="checkcircle" size={24} color="black" />
                    : null}

            </TouchableOpacity>
        )
    }

    function mostrar() {
        console.log(selectedItem)
    }

    function toggleSelection(item: any) {
        let index = selectedItem.findIndex(i => i?.codigo === item?.codigo);
        let arrSelect = [...selectedItem];
        if (index != -1) {
            arrSelect.splice(index, 1);
        } else {
            arrSelect.push(item)
        }
        setSelectedItem(arrSelect);
    }


    return (
        <TouchableOpacity style={styles.container} onPress={() => setVisible(true)}>
            <Text>
                produtos
            </Text>

            <Text>
                <AntDesign name="down" size={24} color="black" />
            </Text>
            <Modal onRequestClose={() => setVisible(false)} visible={visible} animationType='slide'>

                <SafeAreaView style={{ flex: 1 }}>

                    <View style={styles.header}>
                        <View style={styles.headerR1}>
                            <TouchableOpacity onPress={() => setVisible(false)}>
                                <Text style={styles.actions}>voltar</Text>
                            </TouchableOpacity>
                            <Text style={styles.title}>produtos</Text>

                            <TouchableOpacity onPress={() => {
                                onChange(selectedItem);
                                setVisible(false)
                                setTermo('')
                                setSelectedItem([])
                                mostrar()
                            }}>
                                <Text style={styles.actions}>
                                    concluir
                                </Text>
                            </TouchableOpacity>

                        </View>

                            <TextInput
                                style={styles.input}
                                placeholder='pesquisar'
                                value={termo}
                                onChangeText={setTermo}
                            />
                            <View style={{position:'absolute',marginTop:77,marginLeft:360}}> 
                                <AntDesign name="closecircleo" size={24} color="black" onPress={() => setTermo('')} />
                            </View>
                    </View>
                    <FlatList
                        data={data}
                        renderItem={({ item }) => renderItem(item)}
                    />


                </SafeAreaView>

            </Modal>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        height: 50,
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: '#ccc',
        borderWidth: 2,
        paddingHorizontal: 12,
    },
    header: {
        backgroundColor: '#eee',
        padding: 12
    },
    headerR1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12

    }, actions: {
        color: 'blue',
        fontSize: 18,
        fontWeight: '500'
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        color: "#777"
    },
    input: {
        marginTop: 10,
        backgroundColor: '#fff',
        borderRadius: 4,
        paddingHorizontal: 10,
        height: 35,
    }, item: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderWidth: 1,
        borderColor: 'blue',
        marginTop: 4,
        marginHorizontal: 5,
        borderRadius: 5
    },
    txt: {

    },
    limpar: {
        flexDirection: 'row'
    }

})