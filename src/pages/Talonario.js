import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Theme from '../Theme'
import Icons from 'react-native-vector-icons/AntDesign';

export default function Talonario(props) {
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
                        {" "}TALONÁRIO
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
                        <Text style={Theme.textButtonBleck}>TALONÁRIO 1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={Theme.button.fourth}
                    //onPress={() => navigation.navigate("Talonario")}
                    >
                        <Text style={Theme.textButtonBleck}>TALONÁRIO 2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={Theme.button.fourth}
                    //onPress={() => navigation.navigate("Talonario")}
                    >
                        <Text style={Theme.textButtonBleck}>TALONÁRIO 3</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={Theme.button.fourth}
                    //onPress={() => navigation.navigate("Talonario")}
                    >
                        <Text style={Theme.textButtonBleck}>TALONÁRIO 4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={Theme.button.fourth}
                    //onPress={() => navigation.navigate("Talonario")}
                    >
                        <Text style={Theme.textButtonBleck}>TALONÁRIO 5</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={Theme.button.fourth}
                    //onPress={() => navigation.navigate("Talonario")}
                    >
                        <Text style={Theme.textButtonBleck}>TALONÁRIO 6</Text>
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
    containeBox: {
        width: "100%",
        height: 'auto',
        backgroundColor: '#fff',
        marginTop: 15,
        marginRight: 15,
        marginBottom: 0,
        marginLeft: 5,
        borderRadius: 5,
        padding: 15,
        overflow: 'hidden'

    },
    textBody: {
        fontSize: 30,
        color: "#fff",
        marginTop: '20%'

    },

});
