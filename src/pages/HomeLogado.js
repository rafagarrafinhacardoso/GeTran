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
import Usuario from "../daos/Usuario";
import Auth from "../services/Auth";
// const Linericon = createIconSetFromIcoMoon(
//     icoMoonConfig,
//     "icomoon",
//     "icomoon.ttf"
// );

export default function HomeLogado(props) {
    const { navigation } = props;
    // const [usuario, setUsuario] = useState();

    useEffect(() => {
        console.log(">>>HomeLogado<<<", Usuario.lembrar);
        // Service.createApis();
        buscarUsuarioLogado();
    }, []);
    function buscarUsuarioLogado() {
        console.log("Buscar usuario");
        Auth.getUserLogadoSSO().then(resp => {
            console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
            console.log(resp);
            console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
            setUsuario({
                'nome': resp.data.nome,
                'cpf': resp.data.cpf,
                'email': resp.data.email
            });
        }).catch(error => {
            setLoading(false);
            console.log(error);
            Alert.aviso(error.message);
        })
    }

    return (
        <View style={styles.container} >
            <View style={styles.containerTopo}>
                <Text style={styles.textBody}>
                    Olá, Ezequiel
                </Text>
                <Text style={styles.textBodyCorpo}>
                    Confira os serviços disponíveis:
                </Text>
            </View>
            <View style={{
                padding: 15,
            }} >
                <View style={styles.containeBox}>
                    <Text style={styles.textTitulo}>
                        TALONÁRIO
                    </Text>
                    <Text style={styles.textCorpo}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tincidunt placerat ligula.
                    </Text>
                    <View style={{ marginTop: '5%' }}>

                        <TouchableOpacity
                            style={Theme.button.third}
                        onPress={() => navigation.navigate("Talonario")}
                        >
                            <Text style={Theme.textButton}>ACESSAR TALONÁRIO</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.containeBox}>
                    <Text style={styles.textTitulo}>
                        ROUBO E FURTO
                    </Text>
                    <Text style={styles.textCorpo}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tincidunt placerat ligula.
                    </Text>
                    <View style={{ marginTop: '5%' }}>

                        <TouchableOpacity
                            style={Theme.button.third}
                        onPress={() => navigation.navigate("RouboEfurto")}
                        >
                            <Text style={Theme.textButton}>ACESSAR ROUBO E FURTO</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.containeBox}>
                    <Text style={styles.textTitulo}>
                        FUNÇÃO 2000
                    </Text>
                    <Text style={styles.textCorpo}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tincidunt placerat ligula.
                    </Text>
                    <View style={{ marginTop: '5%' }}>

                        <TouchableOpacity
                            style={Theme.button.third}
                        onPress={() => navigation.navigate("Funcao2000")}
                        >
                            <Text style={Theme.textButton}>ACESSAR FUNÇÃO 2000</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>

        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        // width: '100%',
        // height: 100,
        // backgroundColor: '#EBF0F5',
        // margin: 'auto',
        // position: 'absolute',
        // overflow: 'scroll'

    }, containerTopo: {
        padding: 15,
        width: '100%',
        height: 250,
        backgroundColor: '#181927',
        marginBottom: -80

    },
    containeFormMed: {
        width: '100%',
        height: 320,
        backgroundColor: '#cccccc',
        position: 'absolute',
        bottom: 0,
        overflow: 'hidden',
        padding: 15,
    },
    containeBox: {
        width: "100%",
        height: 'auto',
        backgroundColor: '#fff',
        marginTop: 15,
        // marginRight: 15,
        // marginBottom: 0,
        // marginLeft: 5,
        borderRadius: 5,
        padding: 15,
        overflow: 'hidden',
        // position: 'absolute',
    },
    containeImage: {
        position: "relative",
        flexDirection: "row",
        height: "70%",
    },
    textTitulo: {
        fontSize: 14,
        color: "#000",
        fontWeight: "bold",
    },
    textBody: {
        fontSize: 30,
        color: "#fff",
        marginTop: '20%'

    },
    textBodyCorpo: {
        fontSize: 14,
        color: "#fff",

    },
    textCorpo: {
        fontSize: 14,
        color: "#000",
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
        fontSize: 16,
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
