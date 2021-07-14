import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View } from 'react-native';
export default function Home(props) {

    const { navigation } = props;
  
    return (
        <View style={{ flex: .3, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                style={{
                    //   fontFamily: Theme.fonts.primary,
                    fontSize: 32,
                    color: "#000",
                    alignSelf: "center",
                    textAlign: "center",
                }}
            >
                Tela HOME...
            </Text>



            <TouchableOpacity


                style={{ height: 40, borderRadius: 4, backgroundColor: '#FFA015', paddingLeft: 40, paddingRight: 40, alignItems: 'center', justifyContent: 'center' }} 
                onPress={() => navigation.navigate("Login")}
                >
                <Text style={{
                    // fontFamily: Theme.fonts.primaryBold,
                    fontSize: 14,
                    color: "#FFf",
                }}>Voltar</Text>
            </TouchableOpacity>
        </View>
    )
}