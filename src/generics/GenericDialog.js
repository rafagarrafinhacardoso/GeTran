import React from "react";
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Theme from "../Theme";

export default function GenericDialog(props) {
    const { dialogClose, setDialogClose, dialogText, dialogTitle, onPress } = props;

    console.log('---------')
    function enviarEmail(){
        console.log('mateus')
    }
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={dialogClose}
            onRequestClose={() => {
                // Alert.alert("Modal has been closed.");
                setDialogClose(!dialogClose);
            }}
        >
            <View style={styles.modalView}>
                <View >
                    <Text style={{ fontSize: 23, fontWeight: 'bold' }}>{dialogTitle}</Text>
                    <Text >{dialogText}</Text>
                    <TextInput
                        selectionColor={'black'}
                        style={styles.textInp}
                        placeholder='DIGITE SEU CPF'
                        // value={usuario || ''}
                        keyboardType={"numeric"}
                    // onChangeText={(usuario) => handlechange(usuario)}
                    // onBlur={(a) => handleLostFocus(a)}
                    />
                    <Pressable
                        style={styles.buttonPrimary}
                        onPress={() => enviarEmail()}
                    >
                        <Text style={styles.textButtonSecundary}>Enviar E-mail</Text>
                    </Pressable>
                    <Pressable
                        style={styles.buttonSecondary}
                        onPress={() => onPress()}
                    >
                        <Text style={styles.textButtonSecundary}>Cancelar</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    textInp: {
        width: '100%',
        height: 48,
        paddingLeft: 15,
        fontSize: 16,
        letterSpacing: 1,
        borderColor: '#181926',
        borderWidth: 2,
        borderRadius: 3,
        marginTop: 10
    },
    buttonPrimary: {
        width: '100%',
        height: 48,
        backgroundColor: '#0077ff',
        marginTop: 10,
        letterSpacing: 2,
        borderRadius: 3,
        alignItems: 'center',
        alignSelf: 'center'
    },

    buttonSecondary: {
        width: '100%',
        height: 48,
        backgroundColor: '#181926',
        marginTop: 10,
        letterSpacing: 2,
        borderRadius: 3,
        alignItems: 'center',
        alignSelf: 'center'
    },
    textButtonSecundary: {
        fontSize: 16,
        color: "white",
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: '3%',
        fontWeight: 'bold',
        letterSpacing: 2,

    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        display: 'flex',
        width: '90%',
        height: '36%',
        margin: 20,
        marginTop: '25%',
        backgroundColor: "white",
        borderRadius: 8,
        padding: 10,

        // justifyContent: "center",
        alignContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },

        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }




})