import React, { useState, useEffect } from "react";
import { ImageBackground, Platform, StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from 'react-native';
import CnpjUtils from "../Utils/CnpjUtils";
import CpfUtils from '../Utils/CpfUtils';
import roadImage from "../pages/assets/img/road.jpg";
import logoImage from "../pages/assets/img/logo-getran.png";
import { showMessage } from "react-native-flash-message";
import Theme from '../Theme'
import Service from '../services/Service';
import Auth from "../services/Auth";
import * as Constants from "../config/constantes";
import ServiceConfig from "../config/ServiceConfig";
import Usuario from "../daos/Usuario";
import Alert from "../helper/Alert";
import qs from "qs";
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
    // const [loading, setLoading] = useState(false);
    // const [usernameBiometria, setUsernameBiometria] = useState();

    // const [texto, setTexto] = useState('Olá, \n  Seja bem-vindo \n ao ');


    useEffect(() => {
        console.log("------------>>>TelaInicial<<<", Service.apiSSO);
        if (Service.apiSSO == null) {
            Service.createApis();
        }
    }, []);


    const handlechange = (e) => {
        const doc = mascaraDocumento(e);
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
    const onClickIniciarCadastro = (pass) => {
        console.log("Iniciar Cadastro -> CPF/CNPJ valido ? ", !errorCpf);
        if (errorCpf) {
            showMessage({
                message: "Digite um CPF/CNPJ valido",
                type: "danger",
            });
        } else {
            // setLoading(true);

            // if (loginBiometria) {
            //     // Decrypt
            //     var CryptoJS = require("crypto-js");

            //     if (hashPassword) {
            //         var bytes = CryptoJS.AES.decrypt(hashPassword.toString(), 'password');
            //         senha = bytes.toString(CryptoJS.enc.Utf8);
            //     }

            //     var jwtDecode = require("jwt-decode");

            //     const data = qs.stringify({
            //         grant_type: Constants.GRANT_TYPE,
            //         username: usernameBiometria
            //             .replace(/\D/g, ""),
            //         password: pass ? pass : senha,
            //         client_id: Constants.CLIENT_ID,
            //         client_secret: ServiceConfig.clientSecret,
            //         scope: Constants.SCOPE,
            //     });
            //     console.log('>>>>acessarSSO<<<<<')
            //     Auth.logarSSO(data)
            //         .then((response) => {
            //             Usuario.token = response.data.access_token;
            //             Usuario.refresh_token = response.data.refresh_token;
            //             Usuario.username = usernameBiometria
            //                 .replace(/\D/g, "");
            //             Usuario.password = senha;
            //             var decoded = jwtDecode(response.data.access_token);
            //             Usuario.roles = decoded.realm_access.roles;
            //             // this.setState({ loading: false }
            //             // setLoading(false);
            //             let user = {
            //                 cpf: Usuario.cpf,
            //                 userName: usernameBiometria,
            //                 password: pass ? pass : senha,
            //                 lembrar: Usuario.lembrar
            //             }
            //             Usuario.set(user);
            //             navigation.navigate("HomeLogado");
            //         })
            //         .catch((error) => {
            //             console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>", error);
            //             // let erroMsg;
            //             // if (error == "Error: Request failed with status code 401") {
            //             //     erroMsg = "Usuário e/ou senha inválidos.";
            //             // } else if (error == "Error: Request failed with status code 503") {
            //             //     erroMsg =
            //             //         "O serviço de autenticação está fora do ar, tente novamente mais tarde.";
            //             // } else if (error == "Error: Network Error") {
            //             //     erroMsg = "Verifique sua conexão com a internet e tente novamente.";
            //             // } else if (error == "Error: Request failed with status code 400") {
            //             //     erroMsg = "A conta não está totalmente configurada.";
            //             // } else {
            //             //     erroMsg = error.message;
            //             // }
            //             // Alert.aviso(erroMsg);

            //             // setLoading(false);
            //         });
            // } else {
            var jwtDecode = require("jwt-decode");
            if (!usuario) {
                showMessage({
                    message: "Digite um CPF/CNPJ",
                    type: "danger",
                });
                return;
            } 
            const data = qs.stringify({
                grant_type: Constants.GRANT_TYPE,
                username: usuario
                    .replace(/\D/g, ""),
                password: pass ? pass : senha,
                client_id: Constants.CLIENT_ID,
                client_secret: ServiceConfig.clientSecret,
                scope: Constants.SCOPE,
            });

            Auth.logarSSO(data)
                .then((response) => {
                    Usuario.token = response.data.access_token;
                    Usuario.refresh_token = response.data.refresh_token;
                    Usuario.username = usuario
                        .replace(/\D/g, "");
                    Usuario.password = senha;
                    var decoded = jwtDecode(response.data.access_token);
                    Usuario.roles = decoded.realm_access.roles;
                    // this.setState({ loading: false }, () => 
                    // setLoading(false);

                    let user = {
                        cpf: Usuario.cpf,
                        userName: usernameBiometria,
                        password: pass ? pass : senha,
                        lembrar: Usuario.lembrar
                    }
                    Usuario.set(user);

                    navigation.navigate("HomeLogado");
                    console.log('Auth.logarSSO -------->>>>> logado!')
                })
                .catch((error) => {
                    console.log(" Auth.logarSSO -------->>>>> error :", error);
                    let erroMsg;
                    if (error == "Error: Request failed with status code 401") {
                        erroMsg = "Usuário e/ou senha inválidos.";
                    } else if (error == "Error: Request failed with status code 503") {
                        erroMsg =
                            "O serviço de autenticação está fora do ar, tente novamente mais tarde.";
                    } else if (error == "Error: Network Error") {
                        erroMsg = "Verifique sua conexão com a internet e tente novamente.";
                    } else if (error == "Error: Request failed with status code 400") {
                        erroMsg = "A conta não está totalmente configurada.";
                    } else {
                        erroMsg = error.message;
                    }
                    Alert.aviso(erroMsg);
                    this.setState({ loading: false });
                    setLoading(false);
                });
            // }
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
                    Sistema de Gestão{'\n'}de Trânsito do DF
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

                <TextInput
                    selectionColor={'black'}
                    style={styles.textInp}
                    placeholder='SENHA'
                    autoCorrect={false}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    onChangeText={(senha) => setSenha(senha)}
                />

                <TouchableOpacity
                    style={styles.buttonPrimary}
                    onPress={() => onClickIniciarCadastro()}
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
