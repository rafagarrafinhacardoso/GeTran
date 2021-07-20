import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { ImageBackground, Platform, StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from 'react-native';
import CnpjUtils from "../Utils/CnpjUtils";
import CpfUtils from '../Utils/CpfUtils';
import roadImage from "../pages/assets/img/road.jpg";
import logoImage from "../pages/assets/img/logo-getran.png";
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import Theme from '../Theme'
// import { createIconSetFromIcoMoon } from "react-native-vector-icons";
import icoMoonConfig from "../../selection.json";
import Service from '../services/Service';
// const Linericon = createIconSetFromIcoMoon(
//     icoMoonConfig,
//     "icomoon",
//     "icomoon.ttf"
// );

export default function PrimeiroAcesso(props) {
    const { navigation } = props;
    const [usuario, setUsuario] = useState();
    // const [usernameBiometria, setUsernameBiometria] = useState();
    // const [senha, setSenha] = useState(null);
    const [errorCpf, setErrorCpf] = useState(false);
    // const [usernameBiometria, setUsernameBiometria] = useState();

    // const [texto, setTexto] = useState('Olá, \n  Seja bem-vindo \n ao ');


    // useEffect(() => {
    //     console.log("------------->>>TelaInicial<<<", Service.apiSSO);
    //     Service.createApis();
    // }, []);


    const handlechange = (e) => {
        const doc = mascaraDocumento(e);

        // setUsernameBiometria(doc);

        setUsuario(doc);
        console.log("handlechange :", doc);
        if (doc.length == 18) {
            digitaCPF(doc, false)
        } else if (doc.length == 14) {
            digitaCPF(doc, true)
        } else {
            setErrorCpf(true);
        }
    }

    const handleLostFocus = (e) => {
        console.log("handleLostFocus------>>>> errorCpf: ", errorCpf);
        if (errorCpf) {
            showMessage({
                message: "Digite um CPF/CNPJ valido",
                type: "danger",
            });
        }
    }

    const digitaCPF = (cpf, isCpf) => {
        if (isCpf) {
            if (CpfUtils.validateCpf(cpf)) {
                setErrorCpf(false);
            } else {
                setErrorCpf(true);
            }
        } else {
            if (CnpjUtils.validateCnpj(cpf)) {
                setErrorCpf(false);
            } else {
                setErrorCpf(true);
            }
        }
    }

    const mascaraDocumento = (documento) => {
        let doc = documento?.replace(/\D/g, "") || '';
        let masked = doc;
        if (doc?.length > 11) {
            masked = CnpjUtils.maskCnpj(doc);
        } else {
            masked = CpfUtils.maskCpf(doc);
        }
        return masked;
    }
    const onClickIniciarCadastro = () => {
        console.log("Iniciar Cadastro -> CPF/CNPJ valido ? ", !errorCpf);
        if (errorCpf) {
            showMessage({
                message: "Digite um CPF/CNPJ valido",
                type: "danger",
            });
        }
    }

    return (
        <View style={styles.container} >


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
                    Primeiro Acesso
                </Text>
                <Text style={styles.textDescricao}>
                    Digite seu CPF para iniciar o cadastro no aplicativo do GETRAN DF
                </Text>

                <TextInput
                    selectionColor={'black'}
                    style={styles.textInp}
                    placeholder='DIGITE SEU CPF'
                    value={usuario || ''}
                    keyboardType={"numeric"}
                    onChangeText={(usuario) => handlechange(usuario)}
                    onBlur={(a) => handleLostFocus(a)}
                />
                <TouchableOpacity
                    style={Theme.button.primary}
                    onPress={() => onClickIniciarCadastro()}
                    // disabled={true}
                >
                    <Text style={Theme.textButton}>INICIAR CADASTRO</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={Theme.button.secundary}
                    onPress={() => navigation.setParams({
                        primAcess: false
                    })}
                >
                    <Text style={Theme.textButton}>VOLTAR</Text>
                </TouchableOpacity>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
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
    containeImage: {
        position: "relative",
        flexDirection: "row",
        height: "70%",
    },
    textTitulo: {
        fontSize: 26,
        color: "#000",
        fontWeight: "bold",
    },
    textDescricao: {
        fontSize: 15,
        color: "#000",
        fontWeight: "normal",
    },
    textInp: {
        width: '100%',
        height: 48,
        paddingLeft: 15,
        fontSize: 16,
        letterSpacing: 1,
        borderColor: '#181926',
        borderWidth: 2,
        borderRadius: 3,
        marginTop: 10,
        fontWeight: 'bold',
        color: '#181926'
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
    textButtonPrimary: {
        fontSize: 16,
        color: "#FFf",
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: '4%',
        fontWeight: 'bold',
        letterSpacing: 2,
    },
    containeTwoButtonText: {
        width: '100%',
        height: 48,
        flexDirection: "row",
        justifyContent: 'space-between',
        // backgroundColor: '#fff',
    }
});
