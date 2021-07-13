import Storage from "react-native-storage";
import { AsyncStorage } from 'react-native';

export default class Usuario {
    static USR_KEY = 'usrInfLogin1';  // Note: Do not use underscore("_") in key!
    static LEMBRAR = 'lembrarLogin1';  // Note: Do not use underscore("_") in key!
    static HASH = 'hashLogin1';  // Note: Do not use underscore("_") in key!
    static data = {};
    static cpf = null;

    static usernameBiometria = null;
    static hashPassword = null;
    static loginBiometria = null;

    static lembrar = null;
    static username = null;
    static password = null;
    
    static token = null;
    static refresh_token = null;
    static roles = [];

    static storage = new Storage({
        size: 1000,
        storageBackend: AsyncStorage,
        defaultExpires: null,
        enableCache: true,
        sync: {}
    });

    static set(user) {
        this.cpf = user.cpf;
        // this.password = user.password;
        
        return this.storage.save({
            key: this.USR_KEY,
            data: user,
            expires: null
        });
    };

    static setLembrar(data) {
        this.cpf = data.cpf;
        this.lembrar = data.lembrar;
        // this.password = data.password;
        
        return this.storage.save({
            key: this.LEMBRAR,
            data: data,
            expires: null
        });
    };

    static setHashPassword(data) {
        this.usernameBiometria = data.usernameBiometria;
        this.hashPassword = data.hashPassword;
        this.loginBiometria = data.loginBiometria;
        
        return this.storage.save({
            key: this.HASH,
            data: data,
            expires: null
        });
    };
    
    static async get() {
        try {
            return await this.session();
        } catch (e) {
            return null;
        }
    };
    
    static async getLembrar() {
        try {
            return await this.sessionLembrar();
        } catch (e) {
            return null;
        }
    };

    static async getHash() {
        try {
            return await this.sessionHash();
        } catch (e) {
            return null;
        }
    };

    static session() {
        return this.storage.load({
            key: this.USR_KEY,
            autoSync: true,
            syncInBackground: true,
        });
    };

    static sessionHash() {
        return this.storage.load({
            key: this.HASH,
            autoSync: true,
            syncInBackground: true,
        });
    };

    static sessionLembrar() {
        return this.storage.load({
            key: this.LEMBRAR,
            autoSync: true,
            syncInBackground: true,
        });
    };

    static logout() {
        this.username = null;
        //this.password = null;
        this.token = null;
        this.refresh_token = null;
        this.roles = [];
        
        // return this.storage.remove({
        //     key: this.USR_KEY
        // });
    }
}