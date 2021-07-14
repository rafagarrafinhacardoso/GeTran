import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { ImageBackground, Platform, StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from 'react-native';
import CnpjUtils from "../Utils/CnpjUtils";
import CpfUtils from '../Utils/CpfUtils';
import roadImage from "../pages/assets/img/road.jpg";
import logoImage from "../pages/assets/img/logo-getran.png";
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
                <Text style={{
                    fontSize: 18, color: "#000",
                    fontWeight: "bold",
                }}>Sistema de Gestão{'\n'}de Trânsito do DF</Text>


                <TextInput
                    selectionColor={'black'}
                    theme={{ colors: { text: '#8E9BA2', primary: '#fff' } }}
                    underlineColor='#fff'
                    style={{
                        width: '100%',
                        height: 48,
                        paddingLeft: 15,
                        fontSize: 16,
                        letterSpacing: 1,
                        borderColor: '#181926',
                        borderWidth: 2,
                        borderRadius: 3,
                        marginTop: 10
                    }}
                    placeholder='DIGITE SEU CPF'
                    value={usuario || ''}
                    keyboardType={"numeric"}
                    onChangeText={(usuario) => handlechange(usuario)}
                />

                <TextInput
                    selectionColor={'black'}
                    theme={{ colors: { text: '#8E9BA2', primary: '#fff' } }}
                    underlineColor='#fff'
                    style={{
                        width: '100%',
                        height: 48,
                        paddingLeft: 15,
                        fontSize: 16,
                        letterSpacing: 1,
                        borderColor: '#181926',
                        borderWidth: 2,
                        borderRadius: 3,
                        marginTop: 10
                    }}
                    placeholder='SENHA'
                    autoCorrect={false}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    onChangeText={(senha) => setSenha(senha)}
                />

                <TouchableOpacity
                    style={{
                        width: '100%',
                        height: 48,
                        backgroundColor: '#0077ff',
                        marginTop: 10,
                        letterSpacing: 2,
                        borderRadius: 3,
                        alignItems: 'center',
                        alignSelf: 'center'


                    }}
                >
                    <Text style={{
                        // fontFamily: Theme.fonts.primaryBold,
                        fontSize: 14,
                        color: "#FFf",
                        alignItems: 'center',
                        alignSelf: 'center',
                        marginTop: '4%',
                    }}>ENTRAR</Text>
                </TouchableOpacity>
                <View
                    style={{
                        width: '100%',
                        height: 48,
                        flexDirection: "row",
                        justifyContent: 'space-between',
                        backgroundColor: '#fff',
                    }}
                >
                    <TouchableOpacity
                        // onPress={() => navigation.navigate("Login")}
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
                        // onPress={() => navigation.navigate("Login")}
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
        backgroundColor: '#fff',
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
    // imgBackground: {
    //     alignSelf: "center",
    //     width: "105%",
    //     height: "150%",
    //     flex: 1,
    // },
    // textOla: {
    //     // fontFamily: Theme.fonts.primary,
    //     textAlign: "center",
    //     lineHeight: 35,
    //     marginTop: "12%",
    //     color: "#fff",
    //     fontSize: 25,
    //     alignSelf: "center",
    // },
    // textOlaIos: {
    //     // fontFamily: Theme.fonts.primary,
    //     textAlign: "center",
    //     marginTop: "12%",
    //     color: "#fff",
    //     fontSize: 25,
    //     alignSelf: "center",
    // },
    // loginScreenButton: {
    //     // width: "40%",
    //     // height: 35,
    //     minWidth: "40%",
    //     width: 159,
    //     padding: 12,
    //     paddingLeft: 18,
    //     alignSelf: "center",
    //     borderRadius: 4,
    //     backgroundColor: '#FFA015',
    // },
    // primeiroAcessoButton: {

    //     marginTop: 16,
    //     // width: "40%",
    //     // height: 35,
    //     minWidth: "40%",
    //     width: 159,
    //     padding: 12,
    //     paddingLeft: 18,
    //     alignSelf: "center",
    //     borderRadius: 4,
    //     backgroundColor: Theme.colors.primary,
    //     borderColor: "#fff",
    //     borderWidth: 1,
    // },
});
