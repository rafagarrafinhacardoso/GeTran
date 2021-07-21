import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Theme from '../Theme'
import Icons from 'react-native-vector-icons/AntDesign';

export default function FuncaoDoisMil(props) {
    const { navigation } = props;

    return (
        <View style={styles.container} >
            <View style={styles.containerTopo}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.textBody}>
                        <Icons size={23} name='left'
                            style={{
                                color: '#fff',
                                // opacity: 0.8,
                                alignSelf: 'center'
                            }} />
                        {" "}Função 2000
                    </Text>
                </TouchableOpacity>


            </View>



            <View style={{
                padding: 15,
            }}>
                <View style={styles.containeBox}>
                    <TouchableOpacity
                        style={Theme.button.fourth}
                    //onPress={() => navigation.navigate("Talonario")}
                    >
                        <Text style={Theme.textButtonBleck}>FUNÇÃO 2000 1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={Theme.button.fourth}
                    //onPress={() => navigation.navigate("Talonario")}
                    >
                        <Text style={Theme.textButtonBleck}>FUNÇÃO 2000 2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={Theme.button.fourth}
                    //onPress={() => navigation.navigate("Talonario")}
                    >
                        <Text style={Theme.textButtonBleck}>FUNÇÃO 2000 3</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={Theme.button.fourth}
                    //onPress={() => navigation.navigate("Talonario")}
                    >
                        <Text style={Theme.textButtonBleck}>FUNÇÃO 2000 4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={Theme.button.fourth}
                    //onPress={() => navigation.navigate("Talonario")}
                    >
                        <Text style={Theme.textButtonBleck}>FUNÇÃO 2000 5</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={Theme.button.fourth}
                    //onPress={() => navigation.navigate("Talonario")}
                    >
                        <Text style={Theme.textButtonBleck}>FUNÇÃO 2000 6</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }, containerTopo: {
        width: '100%',
        height: 250,
        backgroundColor: '#181927',
        marginBottom: -80,
        padding: 15,
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
        borderRadius: 5,
        padding: 15,
        paddingTop: 5

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
});
