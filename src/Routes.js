import {
    createAppContainer,
    createSwitchNavigator,
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Splash from './pages/Splash';
import Login from './pages/Login';
import React from 'react';
import TelaInicial from './pages/TelaInicial';
import Redefinir from './pages/Redefinir';
import { drawerNavigatorFarmacia, drawerNavigatorSemFarmacia } from './routes/DrawerNavigator';
import InfracoesSemLogin from './pages/infracoes/InfracoesSemLogin'
import Header from './components/Header';
import VeiculosSemLogin from './pages/veiculo/VeiculosSemLogin';
import ConsultaVeiculoSemLogin from './pages/veiculo/ConsultaVeiculoSemLogin';
import DebitosVeiculosSemLogin from './pages/veiculo/DebitosVeiculosSemLogin';
import DebitoVeiculoSemLogin from './pages/veiculo/DebitoVeiculoSemLogin';
import RestricoesSemLogin from './pages/veiculo/RestricoesSemLogin';
import RestricaoSemLogin from './pages/veiculo/RestricaoSemLogin';
import ConsultaKmSemLogin from './pages/veiculo/ConsultaKmSemLogin';
import KmVeiculoSemLogin from './pages/veiculo/KmVeiculoSemLogin';
import SNGSemLogin from './pages/veiculo/SNGSemLogin';
import HabilitacoesSemLogin from './pages/habilitacao/HabilitacoesSemLogin';
import AgendamentosSemLogin from './pages/agendamento/AgendamentosSemLogin';
import Agendar from './pages/agendamento/Agendar';
import AgendamentoConcluidoSemLogin from './pages/agendamento/AgendamentoConcluidoSemLogin';
import AgendamentoPresencial from './pages/agendamento/AgendamentoPresencial';
import CadastroPessoaSemCPF from './pages/cadastamento/CadastroPessoaSemCPF';
import CadastroQuestoes from './pages/cadastamento/CadastroQuestoes';
import CadastroQuestoesEmail from './pages/cadastamento/CadastroQuestoesEmail';
import ConfirmaInformacoesCadastroSincrono from './pages/cadastamento/ConfirmaInformacoesCadastroSincrono';
import CapturaFotoDocumento from './pages/cadastamento/CapturaFotoDocumento';
import InformacoesContato from './pages/cadastamento/InformacoesContato';
//import CapturarFotos from './pages/cadastamento/CapturarFotos';
import CapturaFotoSincrono from './pages/cadastamento/CapturaFotoSincrono';
import EsqueciSenha from './pages/cadastamento/EsqueciSenha';
import CadastroPage from './pages/cadastamento/CadastroPage';
import AlteraEmail from './pages/cadastamento/AlteraEmail';
import MeuCadastro from './pages/cadastamento/MeuCadastro';
import ValidacaoCadastro from './pages/cadastamento/ValidacaoCadastro';
import RecuperacaoSenha from './pages/cadastamento/RecuperacaoSenha';
import LoginNew from './pages/LoginNew';
import PageTimedRecordVideo from './components/video/PageTimedRecordVideo';
import CadastroAlteraEmail from './pages/cadastamento/CadastroAlteraEmail';


const PublicNavigator = {
    screen: createStackNavigator(
        {
    
            TelaInicial: createStackNavigator(
                { Home: { screen: TelaInicial } },
                {
                    headerMode: 'none',
                }
            ),
           
            Redefinir: {
                screen: createStackNavigator({
                    Cadastro: Redefinir,
                },
                    {
                        headerMode: 'none',
                    }),
            }
        },
        {
            headerMode: 'none',
        }
    ),
}

const AppNavigator = createSwitchNavigator(
    {
        Splash: { screen: TelaInicial },
        Public: PublicNavigator,
        Auth: drawerNavigatorFarmacia,
        AuthSemFarmacia: drawerNavigatorSemFarmacia,
    },
    { initialRouteName: 'Splash' }
);

export default createAppContainer(AppNavigator);
