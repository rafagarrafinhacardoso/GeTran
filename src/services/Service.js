import axios from 'axios';
import ServiceConfig from '../config/ServiceConfig';
import Usuario from '../daos/Usuario';

const api = axios.create({
    baseURL: ServiceConfig.url
});

const apiSSO = axios.create({
    baseURL: ServiceConfig.urlSSO
});

const apiAgendamento = axios.create({
    baseURL: ServiceConfig.urlAgendamento
});

const apiNadaConsta = axios.create({
    baseURL: ServiceConfig.urlNadaConsta
});

const apiUsuario = axios.create({
    baseURL: ServiceConfig.urlUsuario
});

const apiQrCode = axios.create({
    baseURL: ServiceConfig.urlQrCode
});

const apiVinculoVeiculo = axios.create({
    baseURL: ServiceConfig.urlVinculoVeiculo
});

const apiEnviarEmail = axios.create({
    baseURL: ServiceConfig.urlEnviarEmail
});

const apiDetalhesUsuario = axios.create({
    baseURL: ServiceConfig.urlDetalhesUsuario
});

const apiCrv = axios.create({
    baseURL: ServiceConfig.urlCrv
});

const apiEnderecoVeiculo = axios.create({
    baseURL: ServiceConfig.urlEnderecoVeiculo
});

const apiAutorizacaoIdoso = axios.create({
    baseURL: ServiceConfig.urlAutorizacaoIdoso
});

const apiConsultaKm = axios.create({
    baseURL: ServiceConfig.urlConsultaKm
});

const apiRegistroPropriedade = axios.create({
    baseURL: ServiceConfig.urlRegistroPropriedade
});

const apiRestricaoVeiculo = axios.create({
    baseURL: ServiceConfig.urlRestricaoVeiculo
});

const apiSng = axios.create({
    baseURL: ServiceConfig.urlSng
});

const apiEstampagem = axios.create({
    baseURL: ServiceConfig.urlEstampagem
});

const apiCrlv = axios.create({
    baseURL: ServiceConfig.urlCrlv
});

const apiAtpve = axios.create({
    baseURL: ServiceConfig.urlAtpve
});

const apiEnderecoHabilitacao = axios.create({
    baseURL: ServiceConfig.urlEnderecoHabilitacao
});

const apiQrCodeDocumento = axios.create({
    baseURL: ServiceConfig.urlQrCodeDocumento
});

const apiHabilitacao = axios.create({
    baseURL: ServiceConfig.urlHabilitacao
});

const apiIndicarCondutor = axios.create({
    baseURL: ServiceConfig.urlIndicarCondutor
});

const apiConversaoAdvertencia = axios.create({
    baseURL: ServiceConfig.urlConversaoAdvertencia
});

const apiInfracoes = axios.create({
    baseURL: ServiceConfig.urlInfracoes
});

const apiProcessoHabilitacao = axios.create({
    baseURL: ServiceConfig.urlProcessoHabilitacao
});

const apiConsultaDebitos = axios.create({
    baseURL: ServiceConfig.urlConsultaDebitos
});

const apiVerificaDebitos = axios.create({
    baseURL: ServiceConfig.urlVerificaDebitos
});

const apiCadastro = axios.create({
    baseURL: ServiceConfig.urlCadastro
});

const apiSolicitaUsuario = axios.create({
    baseURL: ServiceConfig.urlSolicitaUsuario
});

const apiSolicitaCadastro = axios.create({
    baseURL: ServiceConfig.urlCadastro
});
const apiBoletoDer = axios.create({
    baseURL: ServiceConfig.urlBoletoDer
});

const getContentTypeHeader = type => {
    return (type === 'multipart') ? 'multipart/form-data' : 'application/json;charset=UTF-8';
}

const createMultipart = api => {
    createRequest(api, 'multipart');
}

const create = api => {
    createRequest(api, 'json');
}

const createRequest = (api, type) => {
    api.interceptors.request.use(request => {
        request.headers = {
            'Accept': 'application/json, text/plain, */*',
            'Accept-Encoding': 'gzip, deflate',
            'Content-Type': getContentTypeHeader(type),
        };

        if (Usuario.token) {
            request.headers['Authorization'] = Usuario.token;
        }

        console.log('REQUEST', request);
        return request;
    });

    api.interceptors.response.use((response) => {
        console.log('RESPONSE', response);
        return response;
    }, error => {
        if (error.response === undefined) {
            console.log('RESPONSE error : Ocorreu uma situação inesperada. Tente novamente em alguns minutos.');
            let data;
            data = { message: 'Ocorreu uma situação inesperada. Tente novamente em alguns minutos.' }

            return Promise.reject(data);

        }
        else {
            if (error.response.data === undefined) {

                console.log('RESPONSE error : Ocorreu uma situação inesperada. Tente novamente em alguns minutos.');

                return Promise.reject('Ocorreu uma situação inesperada. Tente novamente em alguns minutos.');
            }
            if (error.response.data.message == 'Invalid request') {
                error.response.data.message = 'Ocorreu uma situação inesperada. Tente novamente em alguns minutos.';
            }

            console.log('RESPONSE error', error);
            return Promise.reject(error);
        }
    });

};

const createSSO = apiSSO => {
    console.log('---------------createSSO------------------');
    apiSSO.interceptors.request.use(request => {
        request.headers = {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        };
        console.log('REQUEST', request);
        return request;
    });

    apiSSO.interceptors.response.use((response) => {
        console.log('RESPONSE', response);
        return response;
    }, error => {
            console.log('RESPONSE error', error);
            return Promise.reject(error);
    });
};

class Service {
    static api = null;
    static apiSSO = null;
    static apiAgendamento = null;
    static apiRegistroPropriedade = null;
    static apiEnviarEmail = null;
    static apiUsuario = null;
    static apiQrCode = null;
    static apiVinculoVeiculo = null;
    static apiEnviarEmail = null;
    static apiDetalhesUsuario = null;
    static apiCrv = null;
    static apiEnderecoVeiculo = null;
    static apiAutorizacaoIdoso = null;
    static apiConsultaKm = null;
    static apiNadaConsta = null;
    static apiRegistroPropriedade = null;
    static apiRestricaoVeiculo = null;
    static apiSng = null;
    static apiEstampagem = null;
    static apiCrlv = null;
    static apiAtpve = null;
    static apiEnderecoHabilitacao = null;
    static apiQrCodeDocumento = null;
    static apiHabilitacao = null;
    static apiIndicarCondutor = null;
    static apiConversaoAdvertencia = null;
    static apiInfracoes = null;
    static apiProcessoHabilitacao = null;
    static apiConsultaDebitos = null;
    static apiVerificaDebitos = null;
    static apiCadastro = null;
    static apiSolicitaUsuario = null;
    static apiSolicitaCadastro = null;
    static apiBoletoDer = null;

    static offset = (page, limit) => (page - 1) * limit;

    static createApis = () => {
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa");
        create(api);
        createSSO(apiSSO);
        create(apiAgendamento);

        create(apiNadaConsta);
        create(apiRegistroPropriedade);
        create(apiEnviarEmail);
        create(apiUsuario);
        create(apiQrCode);
        create(apiVinculoVeiculo);
        create(apiEnviarEmail);
        create(apiDetalhesUsuario);
        create(apiCrv);
        create(apiEnderecoVeiculo);
        create(apiAutorizacaoIdoso);
        create(apiConsultaKm);
        create(apiNadaConsta);
        create(apiRegistroPropriedade);
        create(apiRestricaoVeiculo);
        create(apiSng);
        create(apiEstampagem);
        create(apiCrlv);
        create(apiAtpve);
        create(apiEnderecoHabilitacao);
        create(apiQrCodeDocumento);
        create(apiHabilitacao);
        create(apiIndicarCondutor);
        create(apiConversaoAdvertencia);
        create(apiInfracoes);
        create(apiProcessoHabilitacao);
        create(apiConsultaDebitos);
        create(apiVerificaDebitos);
        create(apiCadastro);
        create(apiSolicitaUsuario);
        create(apiBoletoDer);
        createMultipart(apiSolicitaCadastro);

        this.api = api;
        this.apiSSO = apiSSO;
        this.apiAgendamento = apiAgendamento;
        this.apiRegistroPropriedade = apiRegistroPropriedade;
        this.apiEnviarEmail = apiEnviarEmail;
        this.apiUsuario = apiUsuario;
        this.apiQrCode = apiQrCode;
        this.apiVinculoVeiculo = apiVinculoVeiculo;
        this.apiEnviarEmail = apiEnviarEmail;
        this.apiDetalhesUsuario = apiDetalhesUsuario;
        this.apiCrv = apiCrv;
        this.apiEnderecoVeiculo = apiEnderecoVeiculo;
        this.apiAutorizacaoIdoso = apiAutorizacaoIdoso;
        this.apiConsultaKm = apiConsultaKm;
        this.apiNadaConsta = apiNadaConsta;
        this.apiRegistroPropriedade = apiRegistroPropriedade;
        this.apiRestricaoVeiculo = apiRestricaoVeiculo;
        this.apiSng = apiSng;
        this.apiEstampagem = apiEstampagem;
        this.apiCrlv = apiCrlv;
        this.apiAtpve = apiAtpve;
        this.apiEnderecoHabilitacao = apiEnderecoHabilitacao;
        this.apiQrCodeDocumento = apiQrCodeDocumento;
        this.apiHabilitacao = apiHabilitacao;
        this.apiIndicarCondutor = apiIndicarCondutor;
        this.apiConversaoAdvertencia = apiConversaoAdvertencia;
        this.apiInfracoes = apiInfracoes;
        this.apiProcessoHabilitacao = apiProcessoHabilitacao;
        this.apiConsultaDebitos = apiConsultaDebitos;
        this.apiVerificaDebitos = apiVerificaDebitos;
        this.apiCadastro = apiCadastro;
        this.apiSolicitaUsuario = apiSolicitaUsuario;
        this.apiSolicitaCadastro = apiSolicitaCadastro;
        this.apiBoletoDer = apiBoletoDer;
    }

    static refresh = () => this.createApis();
}

export default Service;