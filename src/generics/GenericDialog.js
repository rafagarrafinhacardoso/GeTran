import React from "react";
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Theme from "../Theme";

export default function GenericDialog(props) {
    const { dialogClose, setDialogClose, dialogText, dialogTitle, onPress } = props;

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
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                // marginTop: 22,
                backgroundColor: "rgba(10, 23, 38, 0.9)",
                height: "100%",
            }}>
                <View style={styles.modalView}>
                    <Text style={{ fontSize: 23, fontWeight: 'bold' }}>{dialogTitle}</Text>
                    <Text style={{ fontSize: 16 }}>{dialogText}</Text>
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
                        style={Theme.button.primary}
                        onPress={() => enviarEmail()}
                    >
                        <Text style={Theme.textButton}>ENVIAR E-MAIL</Text>
                    </Pressable>
                    <Pressable
                        style={Theme.button.secundary}
                        onPress={() => onPress()}
                    >
                        <Text style={Theme.textButton}>CANCELAR</Text>
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
    modalView: {
        display: 'flex',
        width: '90%',
        height: 280,
        margin: 20,
        marginTop: '25%',
        backgroundColor: "white",
        borderRadius: 8,
        padding: 10,
        alignContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }
})