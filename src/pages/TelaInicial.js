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

export default function TelaInicial(props) {
    const { navigation } = props;
    const [usuario, setUsuario] = useState();
    const [usernameBiometria, setUsernameBiometria] = useState();
    const [senha, setSenha] = useState(null);
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
                    Sistema de Gestão{'\n'}de Trânsito do DF
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

                <TextInput
                    selectionColor={'black'}
                    // theme={{ colors: { text: '#8E9BA2', primary: '#fff' } }}
                    // underlineColor='#fff'
                    style={styles.textInp}
                    placeholder='SENHA'
                    autoCorrect={false}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    onChangeText={(senha) => setSenha(senha)}
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
                        console.log("Entrar --------------->", navigation)
                        showMessage({
                            message: "Digite um CPF/CNPJ valido",
                            // description: "Digite um CPF/CNPJ valido ",
                            type: "danger",
                            // backgroundColor: "purple", // background color
                            // color: "#606060", // text color
                        });
                    }}
                >
                    <Text style={styles.textButtonPrimary}>ENTRAR</Text>
                </TouchableOpacity>


                <View
                    style={styles.containeTwoButtonText}
                >
                    <TouchableOpacity
                        onPress={() => navigation.setParams({
                            primAcess: true
                        })}
                        style={{
                            paddingTop: 10,
                        }}
                    >
                        <Text style={{
                            // fontFamily: Theme.fonts.primaryBold,
                            fontSize: 14,
                            color: "#000",
                            fontWeight: "bold",
                        }}>PRIMEIRO ACESSO</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                         onPress={() => navigation.navigate("MaisOpcoes")}
                        style={{
                            padding: 10,
                            paddingEnd: 0
                        }}
                    >
                        <Text style={{
                            // fontFamily: Theme.fonts.primaryBold,
                            fontSize: 14,
                            color: "#000",
                            fontWeight: "bold",
                            textAlign: 'right'
                        }}>MAIS OPÇÕES</Text>
                    </TouchableOpacity>
                </View>
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
        fontSize: 18,
        color: "#000",
        fontWeight: "bold",
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
    textButtonPrimary: {
        fontSize: 14,
        color: "#FFf",
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: '4%',
    },
    containeTwoButtonText: {
        width: '100%',
        height: 48,
        flexDirection: "row",
        justifyContent: 'space-between',
        // backgroundColor: '#fff',
    }
});
