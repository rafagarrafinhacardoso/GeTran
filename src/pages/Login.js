import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { ImageBackground, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Background from "../pages/assets/img/background.png";
import Theme from '../Theme'
import { createIconSetFromIcoMoon } from "react-native-vector-icons";
import icoMoonConfig from "../../selection.json";
import { Checkbox } from 'react-native-paper';
import CnpjUtils from "../Utils/CnpjUtils";
import CpfUtils from '../Utils/CpfUtils';
import Auth from "../services/Auth";
import * as Constants from "../config/constantes";
import ServiceConfig from "../config/ServiceConfig";
import Usuario from "../daos/Usuario";
import Alert from "../helper/Alert";
import qs from "qs";



const Linericon = createIconSetFromIcoMoon(
    icoMoonConfig,
    "icomoon",
    "icomoon.ttf"
);



export default function Login(props) {
    const { navigation } = props;
    const [texto, setTexto] = useState('Olá, \n  Seja bem-vindo \n ao ')
    const [usuario, setUsuario] = useState('');
    const [errorCpf, setErrorCpf] = useState(false);
    const [lembrarCpf, setLembrarCpf] = useState(false);
    const [errorCpfCnpj, setErrorCpfCnpj] = useState(false);
    const [senha, setSenha] = useState(null);
    const [usernameBiometria, setUsernameBiometria] = useState();
    const [hashPassword, setHashPassword] = useState();
    const [loading, setLoading] = useState(false);
    const [loginBiometria, setLoginBiometria] = useState(false);

    useEffect(() => {
        console.log(">>>Login<<<", process.env.API_HOST_SSO)

    }, []);
    function limparUsuario() {
        if (usuario.length >= 0) {
            setUsuario('')
        }
    }


    const isShowFaceId = () => {
        // console.log("show face id");
        return false;
    }

    const showEsqueceuSenha = () => {
        // console.log("show forgot password");
        return false;
    }
    const acessarSSO = (pass) => {
        setLoading(true);

        if (loginBiometria) {
            // Decrypt
            var CryptoJS = require("crypto-js");

            if (hashPassword) {
                var bytes = CryptoJS.AES.decrypt(hashPassword.toString(), 'password');
                senha = bytes.toString(CryptoJS.enc.Utf8);
            }

            var jwtDecode = require("jwt-decode");

            const data = qs.stringify({
                grant_type: Constants.GRANT_TYPE,
                username: usernameBiometria
                    .replace(/\D/g, ""),
                password: pass ? pass : senha,
                client_id: Constants.CLIENT_ID,
                client_secret: ServiceConfig.clientSecret,
                scope: Constants.SCOPE,
            });
            console.log('>>>>acessarSSO<<<<<')
            Auth.logarSSO(data)
                .then((response) => {
                    Usuario.token = response.data.access_token;
                    Usuario.refresh_token = response.data.refresh_token;
                    Usuario.username = usernameBiometria
                        .replace(/\D/g, "");
                    Usuario.password = senha;
                    var decoded = jwtDecode(response.data.access_token);
                    Usuario.roles = decoded.realm_access.roles;
                    // this.setState({ loading: false }
                    setLoading(false);
                    let user = {
                        cpf: Usuario.cpf,
                        userName: usernameBiometria,
                        password: pass ? pass : senha,
                        lembrar: Usuario.lembrar
                    }
                    Usuario.set(user);
                    navigation.navigate("HomeLogado");
                })
                .catch((error) => {
                    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>", error);
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

                    setLoading(false);
                });
        } else {
            var jwtDecode = require("jwt-decode");

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
                    setLoading(false);

                    let user = {
                        cpf: Usuario.cpf,
                        userName: usernameBiometria,
                        password: pass ? pass : senha,
                        lembrar: Usuario.lembrar
                    }
                    Usuario.set(user);

                    navigation.navigate("HomeLogado");
                    console.log('logado!')
                })
                .catch((error) => {
                    console.log("--------",error);
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
                    // this.setState({ loading: false });
                    setLoading(false);
                });
        }
    };

    const handlechange = (e) => {
        const doc = mascaraDocumento(e);
        console.log(e);
        setUsernameBiometria(doc);

        setUsuario(doc);
        if (e.length > 14) {
            digitaCPF(e, false)
        } else {
            digitaCPF(e, true)
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
    return (
        <ImageBackground
            style={{
                alignSelf: "center",
                width: "105%",
                height: "150%",
                flex: 1,
            }}
            resizeMode="cover"
            source={Background}
        >
            <View style={{ flex: .3, alignItems: 'center', justifyContent: 'center' }}>
                <Text
                    style={{
                        //   fontFamily: Theme.fonts.primary,
                        fontSize: 32,
                        color: "#fff",
                        alignSelf: "center",
                        textAlign: "center",
                    }}
                >
                    Login
                </Text>
            </View>

            <View style={{ flex: .7, backgroundColor: '#fff', padding: 40, flexDirection: 'column', justifyContent: 'space-between', }}>
                <View>
                    <View style={{ margin: 15 }}>
                        <Text style={{
                            // fontFamily: Theme.fonts.secundary,
                            fontSize: 12,
                            marginBottom: 9,
                            color: "#636E75",
                        }}>CPF/CNPJ</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                selectionColor={'black'}
                                theme={{ colors: { text: '#8E9BA2', primary: '#fff' } }}
                                underlineColor='#fff'
                                style={{
                                    width: '100%',
                                    borderWidth: 0.5,
                                    borderRadius: 4,
                                    borderColor: '#8E9BA2',
                                    backgroundColor: 'white',
                                    height: 32,
                                    padding: 3,
                                    overflow: 'hidden',
                                    backgroundColor: '#fff',
                                    borderTopLeftRadius: 4,
                                    borderTopRightRadius: 4,
                                    borderBottomLeftRadius: 4,
                                    borderBottomRightRadius: 4
                                }}
                                value={usuario || ''}
                                keyboardType={"numeric"}
                                onChangeText={(usuario) => handlechange(usuario)}
                            />

                            {!usuario.length <= 0 &&
                                <View style={{ top: 8, right: 60 }}>
                                    <TouchableOpacity
                                        style={{
                                            height: -40,
                                            marginRight: -10
                                        }}
                                        onPress={limparUsuario}
                                    >
                                        <View >
                                            <Text style={{ color: '#0B77C1', opacity: 0.9, fontWeight: 'bold' }}>Limpar</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>
                        {/* Mensagem para validar cpf/cnpj */}
                        {
                            errorCpf ?
                                <Text style={{ fontSize: 12, marginTop: Platform.OS === 'ios' ? 9 : 11, color: '#A50606', }}>
                                    {usuario ? 'CPF/CNPJ é inválido.' : ''}
                                </Text> :
                                <View></View>
                        }


                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 5, marginBottom: -10 }}>
                            {Platform.OS === 'android' ?
                                (
                                    <Checkbox.Android
                                        status={lembrarCpf ? "checked" : "unchecked"}
                                        style={{ marginBottom: -20 }}
                                        // onPress={() => setLembrarCpf(!lembrarCpf)}
                                        color={"#24A4E3"}
                                    />
                                ) : (
                                    <Checkbox.IOS
                                        status={lembrarCpf ? "checked" : "unchecked"}
                                        style={{ marginBottom: -20 }}
                                        // onPress={() => setLembrarCpf(!lembrarCpf)}
                                        color={"#24A4E3"}
                                    />
                                )
                            }
                            <TouchableOpacity
                                style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 5 }}
                                onPress={() => {
                                    // setLembrarCpf(!lembrarCpf)
                                }}
                            >
                                <Text
                                    style={{
                                        // fontFamily: Theme.fonts.secundary,
                                        fontSize: 11,
                                        color: "#636E75",
                                    }}
                                >Lembrar CPF/CNPJ</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginTop: 8 }}>
                            <Text style={{
                                // fontFamily: Theme.fonts.secundary,
                                fontSize: 11,
                                color: "#636E75",
                            }}>Senha</Text>

                            <View style={{ flexDirection: 'row' }}>
                                <TextInput
                                    selectionColor={'black'}
                                    theme={{ colors: { text: '#8E9BA2', primary: '#fff' } }}
                                    underlineColor='#fff'
                                    style={{
                                        width: '100%',
                                        borderWidth: 0.5,
                                        borderRadius: 4,
                                        borderColor: '#8E9BA2',
                                        backgroundColor: 'white',
                                        height: 32,
                                        padding: 3,
                                        overflow: 'hidden',
                                        backgroundColor: '#fff',
                                        borderTopLeftRadius: 4,
                                        borderTopRightRadius: 4,
                                        borderBottomLeftRadius: 4,
                                        borderBottomRightRadius: 4
                                    }}

                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    secureTextEntry={true}
                                    onChangeText={(senha) => setSenha(senha)}
                                />
                                {isShowFaceId() ?
                                    <View style={{ top: 8, right: '90%' }}>
                                        <TouchableOpacity
                                            style={{
                                                height: -40,
                                                marginRight: -10
                                            }}
                                        // onPress={() => setShowFaceID(true)}
                                        >
                                            <View >
                                                <Icon
                                                    name="face-recognition"
                                                    type="material-community"
                                                    color='#00aced'
                                                    style={{ opacity: 0.5 }}
                                                />
                                            </View>
                                        </TouchableOpacity>

                                    </View>
                                    :
                                    <View></View>
                                }

                                {showEsqueceuSenha() &&
                                    <View style={{ top: 9, right: 90 }}>
                                        <TouchableOpacity
                                            style={{
                                                height: -40,
                                                marginRight: -10
                                            }}
                                        >
                                            <View >
                                                <Text style={{ color: '#0B77C1', opacity: 0.9, fontWeight: 'bold' }}>Esqueceu?</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                }
                            </View>
                        </View>

                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', top: 20, marginTop: 17, marginBottom: 40 }}>
                            <TouchableOpacity onPress={() => navigation.navigate("Home")} style={{ height: 40, paddingLeft: 40, paddingRight: 40, borderRadius: 4, borderWidth: 1, borderColor: '#FFA015', alignItems: 'center', justifyContent: 'center', marginRight: 30 }}>
                                <Text style={{
                                    // fontFamily: Theme.fonts.primaryBold,
                                    fontSize: 14,
                                    color: "#FFA015",
                                }}>VOLTAR</Text>
                            </TouchableOpacity>
                            <TouchableOpacity

                                disabled={errorCpfCnpj || !senha}

                                style={(!errorCpfCnpj && senha)
                                    ? { height: 40, borderRadius: 4, backgroundColor: '#FFA015', paddingLeft: 40, paddingRight: 40, alignItems: 'center', justifyContent: 'center' }
                                    : { height: 40, borderRadius: 4, backgroundColor: 'grey', paddingLeft: 40, paddingRight: 40, alignItems: 'center', justifyContent: 'center' }
                                } onPress={() => acessarSSO()}>
                                <Text style={{
                                    // fontFamily: Theme.fonts.primaryBold,
                                    fontSize: 14,
                                    color: "#FFf",
                                }}>ENTRAR</Text>
                            </TouchableOpacity>
                        </View>


                    </View>
                </View>

                <View >
                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }} onPress={() => navigation.navigate("Home")}>
                        <Text style={{
                            // fontFamily: Theme.fonts.secundary,
                            fontSize: 12,
                            color: "#929FA6",
                        }}>Não era o que você procurava?</Text>
                        <Text style={{
                            // fontFamily: Theme.fonts.primary,
                            fontSize: 12,
                            color: "#929FA6",
                        }}
                        >Volte para a tela inicial</Text>
                    </TouchableOpacity>
                    <Text style={{
                        // fontFamily: Theme.fonts.secundary,
                        fontSize: 12,
                        color: "#929FA6",
                        textAlign: 'center',
                    }}>{"\n"} versão Getran...</Text>
                </View>
            </View>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgBackground: {
        alignSelf: "center",
        width: "105%",
        height: "150%",
        flex: 1,
    },
    textOla: {
        // fontFamily: Theme.fonts.primary,
        textAlign: "center",
        lineHeight: 35,
        marginTop: "12%",
        color: "#fff",
        fontSize: 25,
        alignSelf: "center",
    },
    textOlaIos: {
        // fontFamily: Theme.fonts.primary,
        textAlign: "center",
        marginTop: "12%",
        color: "#fff",
        fontSize: 25,
        alignSelf: "center",
    },
    loginScreenButton: {
        // width: "40%",
        // height: 35,
        minWidth: "40%",
        width: 159,
        padding: 12,
        paddingLeft: 18,
        alignSelf: "center",
        borderRadius: 4,
        backgroundColor: '#FFA015',
    },
    primeiroAcessoButton: {

        marginTop: 16,
        // width: "40%",
        // height: 35,
        minWidth: "40%",
        width: 159,
        padding: 12,
        paddingLeft: 18,
        alignSelf: "center",
        borderRadius: 4,
        backgroundColor: Theme.colors.primary,
        borderColor: "#fff",
        borderWidth: 1,
    },
});
