import AppConfig from '../AppConfig';
import env from 'react-native-config';

const defaultConfig = { app: '' };
const config = { ...defaultConfig, ...AppConfig };
const versao = process.env.VERSAO;
const urlSistema = process.env.HOST;
const urlProd = env.API_HOST;
const urlSSO = process.env.API_HOST_SSO;

const clientSecret = process.env.CLIENT_SECRET;
const rhssoPassword = process.env.RHSSO_PASSWORD;

// const urlAgendamento = env.API_AGENDAMENTO;
// const urlRegistroPropriedade = env.API_REGISTRO_PROPRIEDADE;
// const urlEnviarEmail = env.API_ENVIAR_EMAIL;
// const urlUsuario = env.API_USUARIO;
// const urlQrCode = env.API_QR_CODE;
// const urlVinculoVeiculo = env.API_VINCULO_VEICULO;
// const urlDetalhesUsuario = env.API_DETALHES_USUARIO;
// const urlCrv = env.API_CRV;
// const urlEnderecoVeiculo = env.API_ENDERECO_VEICULO;
// const urlAutorizacaoIdoso = env.API_AUTORIZACAO_IDOSO;
// const urlConsultaKm = env.API_CONSULTA_KM;
// const urlNadaConsta = env.API_NADA_CONSTA;
// const urlRestricaoVeiculo = env.API_RESTRICAO_VEICULO;
// const urlSng = env.API_SNG;
// const urlEstampagem = env.API_ESTAMPAGEM;
// const urlCrlv = env.API_CRLV;
// const urlAtpve = env.API_ATPVE;
// const urlEnderecoHabilitacao = env.API_ENDERECO_HABILITACAO;
// const urlQrCodeDocumento = env.API_QR_CODE_DOCUMENTO;
// const urlHabilitacao = env.API_HABILITACAO;
// const urlIndicarCondutor = env.API_INDICAR_CONDUTOR;
// const urlConversaoAdvertencia = env.API_CONVERSAO_ADVERTENCIA;
// const urlInfracoes = env.API_INFRACOES;
// const urlProcessoHabilitacao = env.API_PROCESSO_HABILITACAO;
// const urlConsultaDebitos = env.API_CONSULTA_DEBITOS;
// const urlGerarPDF = env.API_GERAR_PDF;
// const urlVerificaDebitos = env.API_VERIFICA_DEBITOS;

// const urlCadastro = env.API_CADASTRO;
// const urlSolicitaUsuario = env.API_SOLICITA_USUARIO;
// const urlBoletoDer = env.API_BOLETO_DER;

class ServiceConfig {
    static versao = versao;
    static clientSecret = clientSecret;
    static rhssoPassword = rhssoPassword;

    static app = config.app || '';
    static urlSistema = urlSistema;
    static url = urlProd;
    static urlSSO = urlSSO;
    /*
    static urlAgendamento = urlAgendamento;
    static urlNadaConsta = urlNadaConsta;
    static urlRegistroPropriedade = urlRegistroPropriedade;
    static urlEnviarEmail = urlEnviarEmail;
    static urlUsuario = urlUsuario;
    static urlQrCode = urlQrCode;
    static urlVinculoVeiculo = urlVinculoVeiculo;
    static urlDetalhesUsuario = urlDetalhesUsuario;
    static urlCrv = urlCrv;
    static urlEnderecoVeiculo = urlEnderecoVeiculo;
    static urlAutorizacaoIdoso = urlAutorizacaoIdoso;
    static urlConsultaKm = urlConsultaKm;
    static urlRestricaoVeiculo = urlRestricaoVeiculo;
    static urlSng = urlSng;
    static urlEstampagem = urlEstampagem;
    static urlCrlv = urlCrlv;
    static urlAtpve = urlAtpve;
    static urlEnderecoHabilitacao = urlEnderecoHabilitacao;
    static urlQrCodeDocumento = urlQrCodeDocumento;
    static urlHabilitacao = urlHabilitacao;
    static urlIndicarCondutor = urlIndicarCondutor;
    static urlConversaoAdvertencia = urlConversaoAdvertencia;
    static urlInfracoes = urlInfracoes;
    static urlProcessoHabilitacao = urlProcessoHabilitacao;
    static urlConsultaDebitos = urlConsultaDebitos;
    static urlGerarPDF = urlGerarPDF;
    static urlVerificaDebitos = urlVerificaDebitos;
    static urlCadastro = urlCadastro;
    static urlSolicitaUsuario = urlSolicitaUsuario;
    static urlBoletoDer = urlBoletoDer;
    */
}

export default ServiceConfig;