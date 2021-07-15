import React, { useState } from 'react'
import logoImage from "../pages/assets/img/logo-getran.png";
import roadImage from "../pages/assets/img/road.jpg";
import { ImageBackground, Platform, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Pressable, Modal } from 'react-native';

export default function MaisOpcoes(props) {
    const { navigation } = props;
    const [reenvioEmail, setReenvioEmail] = useState(false);




    function OpenDialog() {
        console.log('---------')
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={reenvioEmail}
                onRequestClose={() => {
                    // Alert.alert("Modal has been closed.");
                    setReenvioEmail(!reenvioEmail);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{ fontSize: 16, textAlign: 'left' }}>Validação de Cadastro</Text>
                        <Text style={styles.textButtonPrimary}>Informe seu CPF para receber um novo e-mail de validação</Text>

                        <Pressable
                            style={styles.buttonSecondary}
                            onPress={() => setReenvioEmail(!reenvioEmail)}
                        >
                            <Text style={styles.textButtonSecundary}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.containeImage}>
                <ImageBackground
                    style={{
                        alignSelf: "center",
                        width: "100%",
                        height: "100%",
                        flex: 1,
                    }}
                    resizeMode="cover"
                    source={roadImage}
                >
                    <Image
                        style={{
                            alignSelf: "center",
                            marginTop: 60,
                        }}
                        source={logoImage}
                    />
                </ImageBackground>
            </View>


            <View style={styles.containeFormMed}>
                <Text style={styles.textTitulo}>
                    Mais Opções
                </Text>
            </View>


            <View style={{ marginTop: '-10%' }}>
                <TouchableOpacity
                    style={styles.buttonPrimary}
                    onPress={() => setReenvioEmail(true)}
                >
                    <Text style={styles.textButtonPrimary}>REENVIO DE E-MAIL E VALIDAÇÃO</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonPrimary}

                >
                    <Text style={styles.textButtonPrimary}>RECUPERAÇÃO DE SENHA</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonPrimary}

                >
                    <Text style={styles.textButtonPrimary}>ALTERAÇÃO DE E-MAIL</Text>
                </TouchableOpacity>


                <TouchableOpacity
                    style={styles.buttonSecondary}
                    onPress={() => navigation.navigate("Home")}
                >
                    <Text style={styles.textButtonSecundary}>VOLTAR</Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={reenvioEmail}
                onRequestClose={() => {
                    // Alert.alert("Modal has been closed.");
                    setReenvioEmail(!reenvioEmail);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{ fontSize: 16, textAlign: 'left' }}>Validação de Cadastro</Text>
                        <Text style={styles.textButtonPrimary}>Informe seu CPF para receber um novo e-mail de validação</Text>

                        <Pressable
                            style={styles.buttonSecondary}
                            onPress={() => setReenvioEmail(!reenvioEmail)}
                        >
                            <Text style={styles.textButtonSecundary}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containeImage: {
        position: "relative",
        flexDirection: "row",
        height: "70%",
    },
    containeFormMed: {
        width: '100%',
        height: 320,
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        overflow: 'hidden',
        padding: 15,
    },
    textTitulo: {
        fontSize: 26,
        color: "#000",
        fontWeight: "bold",
    },
    buttonPrimary: {
        width: '90%',
        height: 48,
        backgroundColor: '#fff',
        marginTop: 10,
        letterSpacing: 2,
        borderRadius: 3,
        borderWidth: 3,
        borderColor: 'black',
        alignItems: 'center',
        alignSelf: 'center'
    },
    textButtonPrimary: {
        fontSize: 16,
        color: "black",
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: '3%',
        fontWeight: 'bold',
        letterSpacing: 2,
    },
    buttonSecondary: {
        width: '90%',
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
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
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