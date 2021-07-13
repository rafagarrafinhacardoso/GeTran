import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { ImageBackground, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Background from "../pages/assets/img/background.png";
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
    const [texto, setTexto] = useState('Olá, \n  Seja bem-vindo \n ao ');

    
    useEffect(()=>{
        console.log(">>>TelaInicial<<<", process.env.API_HOST_SSO);
        Service.createApis();
    },[]);
    
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
            <View style={{ flex: 1, alignItems: "center", marginTop: -100, justifyContent: 'center', position: "relative" }}>
                <View style={{ al: "center", justifyContent: 'center' }}>
                    <Text
                        style={Platform.select({
                            ios: styles.textOlaIos,
                            android: styles.textOla,

                        })}
                    >{texto}
                        <Text
                            style={{
                                // fontFamily: Theme.fonts.primaryBold,
                                fontWeight: "bold",
                                color: "#fff",
                                marginTop: 85,
                                fontSize: 25,
                                paddingTop: 35,

                            }}
                        >
                            GETRAN DIGITAL!
                        </Text>
                    </Text>
                </View>


                <View style={{ marginTop: 55 }}>
                    <TouchableOpacity
                        style={styles.loginScreenButton}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text
                            style={{
                                // fontFamily: Theme.fonts.primaryBold,
                                fontSize: 14,
                                color: "#fff",
                                alignSelf: "center",
                                // marginTop: 5,
                                paddingTop: 0,
                                paddingBottom: 0,
                                paddingLeft: 10,
                                paddingRight: 10,
                            }}
                        >
                            {"ENTRAR"}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.primeiroAcessoButton}
                        onPress={() => console.log('primeiro acesso')}
                        underlayColor="#fff"
                    >
                        <Text
                            style={{
                                // fontFamily: Theme.fonts.primaryBold,
                                fontWeight: "bold",
                                fontSize: 14,
                                color: "#fff",
                                alignSelf: "center",
                                // marginTop: 5,
                                paddingTop: 0,
                                paddingBottom: 0,
                                paddingLeft: 10,
                                paddingRight: 10,
                            }}
                        >
                            {"MEU CADASTRO"}
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
            <View style={{ position: 'absolute', bottom: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <TouchableOpacity
                    style={{
                        width: 72,
                        height: 72,
                        borderRadius: 8,
                        backgroundColor: '#fff',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 6
                    }}
                    onPress={() => console.log("VeiculosSemLogin")}>
                    <Linericon
                        name="detran-icn_veiculo"
                        color="#0251A0"
                        size={27}
                        style={{ alignSelf: "center" }}
                    />
                    <Text
                        style={{
                            // fontFamily: Theme.fonts.primary,
                            textAlign: "center",
                            color: "#0251A0",
                            fontSize: 10,
                        }}
                    >
                        {" "}
                        Veículos{" "}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        width: 72,
                        height: 72,
                        borderRadius: 8,
                        backgroundColor: '#fff',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 6
                    }}
                    onPress={() => console.log("habilitação")}>
                    <Linericon
                        name='arrow-up'
                        color="#0251A0"
                        size={27}
                        style={{ alignSelf: "center" }}
                    />
                    <Text
                        style={{
                            // fontFamily: Theme.fonts.primary,
                            textAlign: "center",
                            color: "#0251A0",
                            fontSize: 10,
                        }}
                    >
                        {" "}
                        Habilitação{" "}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        width: 72,
                        height: 72,
                        borderRadius: 8,
                        backgroundColor: '#fff',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 6
                    }}
                    onPress={() => console.log("infração")}>
                    <Linericon
                        name="detran-icn_veiculo"
                        color="#0251A0"
                        size={27}
                        style={{ alignSelf: "center" }}
                    />
                    <Text
                        style={{
                            // fontFamily: Theme.fonts.primary,
                            textAlign: "center",
                            color: "#0251A0",
                            fontSize: 10,
                        }}
                    >
                        {" "}
                        Infrações{" "}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        width: 72,
                        height: 72,
                        borderRadius: 8,
                        backgroundColor: '#fff',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 6
                    }}
                    onPress={() => console.log("agendamento")}>
                    <Linericon
                        name="detran-icn_veiculo"
                        color="#0251A0"
                        size={27}
                        style={{ alignSelf: "center" }}
                    />
                    <Text
                        style={{
                            // fontFamily: Theme.fonts.primary,
                            textAlign: "center",
                            color: "#0251A0",
                            fontSize: 10,
                        }}
                    >
                        {" "}
                        Agendamento{" "}
                    </Text>
                </TouchableOpacity>

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
