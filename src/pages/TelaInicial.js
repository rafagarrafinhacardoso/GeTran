import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { ImageBackground, Platform, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import Background from "../pages/assets/img/background.png";
import roadImage from "../pages/assets/img/road.jpg";
import logoImage from "../pages/assets/img/logo-getran.png";
import Theme from '../Theme'
import { createIconSetFromIcoMoon } from "react-native-vector-icons";
import icoMoonConfig from "../../selection.json";
import Service from '../services/Service';
const Linericon = createIconSetFromIcoMoon(
    icoMoonConfig,
    "icomoon",
    "icomoon.ttf"
);

export default function TelaInicial(props) {
    const { navigation } = props;
    // const [texto, setTexto] = useState('Olá, \n  Seja bem-vindo \n ao ');


    useEffect(() => {
        console.log(">>>TelaInicial<<<", process.env.API_HOST_SSO);
        Service.createApis();
    }, []);

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
                <Text
                    style={{
                        // fontFamily: "Cochin"
                    }}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            color: "#000",
                        }}
                    >

                        Sistema de Gestão {"\n"}de Trânsito do DF
                        {"\n"}
                    </Text>
                    {/* <Text
                        style={{
                            color: "#000",
                        }}
                    >Digite seu CPF para iniciar o cadastro no aplicativo do GETRAN DF
                    </Text> */}
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            // paddingHorizontal: 10,
                            // width: '100%',
                            // flexDirection: 'row',
                            // alignItems: 'center',
                            // justifyContent: 'space-between',
                            // top: 20,
                            // marginTop: 17,
                            // marginBottom: 40
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Login")}
                            style={{
                                // height: 40,
                                // width: 230,
                                // paddingLeft: 120,
                                // paddingRight: 120,
                                // borderRadius: 4,
                                // borderWidth: 1,
                                // borderColor: '#FFA015',
                                // alignItems: 'center',
                                // justifyContent: 'center',
                                // marginRight: 30,
                                alignItems: "center",
                                backgroundColor: "#0077ff", //#0077ff;
                                padding: 10,
                                paddingHorizontal: 160,
                            }}
                        >
                            <Text style={{
                                // fontFamily: Theme.fonts.primaryBold,
                                fontSize: 14,
                                color: "#fff",
                                
                            }}>ENTRAR</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity
                            // disabled={errorCpfCnpj || !senha}
                            // style={(!errorCpfCnpj && senha)
                            //     ? { height: 40, borderRadius: 4, backgroundColor: '#FFA015', paddingLeft: 40, paddingRight: 40, alignItems: 'center', justifyContent: 'center' }
                            //     : { height: 40, borderRadius: 4, backgroundColor: 'grey', paddingLeft: 40, paddingRight: 40, alignItems: 'center', justifyContent: 'center' }
                            // } onPress={() => acessarSSO()}
                            >
                            <Text style={{
                                // fontFamily: Theme.fonts.primaryBold,
                                fontSize: 14,
                                color: "#F0f",
                            }}>ENTRAR</Text>
                        </TouchableOpacity> */}
                    </View>
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    containeFormMed: {
        marginTop: 10,
        margin: 20,
        position: "relative",
        flexDirection: "row",
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
