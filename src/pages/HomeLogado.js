import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import Theme from '../Theme'
import Usuario from "../daos/Usuario";
import Auth from "../services/Auth";
import Alert from "../helper/Alert";

export default function HomeLogado(props) {
    const { navigation } = props;
    const [usuario, setUsuario] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log(">>>HomeLogado<<<", Usuario.lembrar);
        buscarUsuarioLogado();
    }, []);
    function buscarUsuarioLogado() {
        console.log("Buscar usuario");
        setLoading(true);
        Auth.getUserLogadoSSO().then(resp => {
            setLoading(false);
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
            navigation.navigate("Home");
        })
    }
    if (loading) {
        return (
            <View style={[
                {
                    flex: 1,
                    justifyContent: "center"
                }, {
                    flexDirection: "row",
                    justifyContent: "space-around",
                    padding: 10
                }
            ]} >
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }
    else {
        return (
            <View style={styles.container} >
                <View style={styles.containerTopo}>
                    <Text style={styles.textBody}>
                        Olá, {usuario ? usuario.nome : ""}
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
                        <TouchableOpacity
                            style={Theme.button.primary}
                            onPress={() => navigation.navigate("Talonario")}
                        >
                            <Text style={Theme.textButton}>ACESSAR TALONÁRIO</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.containeBox}>
                        <Text style={styles.textTitulo}>
                            ROUBO E FURTO
                        </Text>
                        <Text style={styles.textCorpo}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tincidunt placerat ligula.
                        </Text>
                        <TouchableOpacity
                            style={Theme.button.primary}
                            onPress={() => navigation.navigate("RouboEfurto")}
                        >
                            <Text style={Theme.textButton}>ACESSAR ROUBO E FURTO</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.containeBox}>
                        <Text style={styles.textTitulo}>
                            FUNÇÃO 2000
                        </Text>
                        <Text style={styles.textCorpo}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tincidunt placerat ligula.
                        </Text>

                        <TouchableOpacity
                            style={Theme.button.primary}
                            onPress={() => navigation.navigate("Funcao2000")}
                        >
                            <Text style={Theme.textButton}>ACESSAR FUNÇÃO 2000</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }, containerTopo: {
        padding: 15,
        width: '100%',
        height: 250,
        backgroundColor: '#181927',
        marginBottom: -80

    },
    containeBox: {
        width: "100%",
        height: 'auto',
        backgroundColor: '#fff',
        marginTop: 15,
        borderRadius: 5,
        padding: 15,
        overflow: 'hidden',
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
});
