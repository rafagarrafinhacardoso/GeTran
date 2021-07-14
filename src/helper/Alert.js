import React from 'react';
import {
    Alert as AlertReact
} from 'react-native';

export default class Alert {
    static show(title, message, buttons = null, options = null) {
        setTimeout(() => {
            AlertReact.alert(title, message, buttons, options);
        }, 100);
    }

    static aviso(msg) {
        this.show('Atenção', msg);
    }
}