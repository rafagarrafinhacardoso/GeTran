import Service from "./Service";

const REALM = 'detran-portal';

const userkey = 'user_key=09239c5267c5b260884ec56f0b63f44c';
class Auth extends Service {
    static dadosSSO = [];
    static logarSSO = (loginData) => this.apiSSO.post(`auth/realms/${REALM}/protocol/openid-connect/token`, loginData);
    static getUserLogadoSSO = () => this.apiUsuario.get(`area-basica/usuarioLogado?${userkey}`);
    
    static logar = (loginData) => this.api.post('login', { username: loginData.username, password: loginData.password });
    static getUserLogado = () => this.api.get(`area-segura/usuarioLogado?${userkey}`)

    static solicitarIdUsuario = (cpf) => this.apiSolicitaUsuario.get(`auth/admin/realms/${REALM}/users?username=${cpf}`);
    static resetSenhaEmail = (idUsuario) => this.apiSolicitaUsuario.put(`auth/admin/realms/${REALM}/users/${idUsuario}/execute-actions-email`, ["UPDATE_PASSWORD"]);
    static verifyUser = (idUsuario) => this.apiSolicitaUsuario.put(`auth/admin/realms/${REALM}/users/${idUsuario}/send-verify-email`);

    static setDadosSSO = (ssodados) => {
        this.dadosSSO = ssodados;
    };
    static getDadosSSO = () => {
        return this.dadosSSO;
    };
}

export default Auth;