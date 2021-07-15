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


    useEffect(() => {
        console.log(">>>TelaInicial<<<", process.env.API_HOST_SSO);
        Service.createApis();
    }, []);


    const handlechange = (e) => {
        const doc = mascaraDocumento(e);
        console.log(e);
        // setUsernameBiometria(doc);

        setUsuario(doc);
        if (e.length > 14) {
            digitaCPF(e, false)
        } else {
            digitaCPF(e, true)
        }
    }

    const digitaCPF = (cpf, isCpf) => {
        if (isCpf) {
            if (CpfUtils.validateCpf(cpf)) {
                // setState({ errorCpf: false })
                setErrorCpf(false);
            } else {
                setErrorCpf(true);
                // setState({ errorCpf: true })
            }
        } else {
            if (CnpjUtils.validateCnpj(cpf)) {
                // setState({ errorCpf: false });
                setErrorCpf(false);
            } else {
                // setState({ errorCpf: true });
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
                    // theme={{ colors: { text: '#ffffA2', primary: '#f0f' } }}
                    // underlineColor='#f0f'
                    style={styles.textInp}
                    placeholder='DIGITE SEU CPF'
                    value={usuario || ''}
                    keyboardType={"numeric"}
                    onChangeText={(usuario) => handlechange(usuario)}
                />
                {/* {
                    showMessage({
                        message: "Digite um CPF/CNPJ valido",
                        // description: "Digite um CPF/CNPJ valido ",
                        type: "danger",
                        // backgroundColor: "purple", // background color
                        // color: "#606060", // text color
                    })
                } */}

                <TouchableOpacity
                    style={styles.buttonPrimary}
                    onPress={() => {
                        /* HERE WE GONE SHOW OUR FIRST MESSAGE */
                        console.log("---------------------->OI")
                        showMessage({
                            message: "Digite um CPF/CNPJ valido",
                            // description: "Digite um CPF/CNPJ valido ",
                            type: "danger",
                            // backgroundColor: "purple", // background color
                            // color: "#606060", 
                        });
                    }}
                >
                    <Text style={styles.textButtonPrimary}>INICIAR CADASTRO</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonSecondary}
                    onPress={() => navigation.setParams({
                        primAcess: false
                    })}
                >
                    <Text style={styles.textButtonPrimary}>VOLTAR</Text>
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
