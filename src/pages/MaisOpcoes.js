import React, { useState } from 'react'
import logoImage from "../pages/assets/img/logo-getran.png";
import roadImage from "../pages/assets/img/road.jpg";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Pressable, Modal } from 'react-native';
import Theme from '../Theme';
import GenericDialog from '../generics/GenericDialog';
export default function MaisOpcoes(props) {
    const { navigation } = props;
    const [reenvioEmail, setReenvioEmail] = useState(false);
    const [dialogSenha, setDialogSenha] = useState(false);
    const [alterarEmail, setAlterarEmail] = useState(false);
    function closeDialog() {
        console.log("closeDialog");
        setReenvioEmail(false);
    }
    function closeDialogSenha() {
        console.log("closeDialog");
        setDialogSenha(false);
    }
    function closeDialogeAlterarEmail() {
        setAlterarEmail(false)
    }
    return (
       
        <View style={styles.container}>
            <GenericDialog
                dialogClose={reenvioEmail}
                setDialogClose={setReenvioEmail}
                dialogTitle={'Validação de Cadastro'}
                dialogText={"Informe seu CPF para receber um novo e-mail de validação"}
                onPress={closeDialog}
            />
            <GenericDialog
                dialogClose={dialogSenha}
                setDialogClose={setDialogSenha}
                dialogTitle={'Recuperação de Senha'}
                dialogText={"Digite seu CPF para receber um e-mail de recuperação da senha de acesso"}
                onPress={closeDialogSenha}
            />
            <GenericDialog
                dialogClose={alterarEmail}
                setDialogClose={setAlterarEmail}
                dialogTitle={'Alteração de E-mail'}
                dialogText={"Informe seu CPF para proseguir com a alteração de e-mail"}
                onPress={closeDialogeAlterarEmail}
            />
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
            <View style={{
                width: '100%',
                height: 320,
                backgroundColor: '#fff',
                position: 'absolute',
                bottom: 0,
                overflow: 'hidden',
                padding: 15,
            }}>
                <Text style={styles.textTitulo}>
                    Mais Opções
                </Text>
                <TouchableOpacity
                    style={Theme.button.tertiary}
                    onPress={() => setReenvioEmail(true)}
                >
                    <Text style={styles.textButtonPrimary}>REENVIO DE E-MAIL E VALIDAÇÃO</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={Theme.button.tertiary}
                    onPress={() => setDialogSenha(true)}

                >
                    <Text style={styles.textButtonPrimary}>RECUPERAÇÃO DE SENHA</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={Theme.button.tertiary}
                    onPress={() => setAlterarEmail(true)}
                >
                    <Text style={styles.textButtonPrimary}>ALTERAÇÃO DE E-MAIL</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={Theme.button.secundary}
                    onPress={() => navigation.navigate("Home")}
                >
                    <Text style={Theme.textButton}>VOLTAR</Text>
                </TouchableOpacity>
            </View>
        </View>
        
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
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
    textButtonPrimary: {
        fontSize: 16,
        color: "black",
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: '3%',
        fontWeight: 'bold',
        letterSpacing: 2,
    }
})