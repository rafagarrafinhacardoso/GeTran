import { DefaultTheme } from 'react-native-paper';
import Styles from './Styles';

export default {
    ...DefaultTheme,
    roundness: 10,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0251A0',
        secondary: '#FFA015',
        text: '#717171',
        textBold: '#454545',
        background: '#f6f6f6',
        border: '#B9D2EA',
        barColor: '#0251A0',
        barStyle: 'light-content',
        destaque : '#0cc0ab',
        barBg: '#FFF',
        disable: '#cfcfcf',
        titulo: '#0B77C1',
        enable: '#6f6f6f',
        ...Styles.colors
    },
    fonts: {
        primary: Platform.select({
            ios: 'Helvetica Neue',
            android: 'Helvetica Neue Medium'
        }),
        primaryBold: Platform.select({
            ios: 'Helvetica Neue',
            android: 'Helvetica Neue Bold'
        }),
        secundary: Platform.select({
            ios: 'Helvetica Neue',
            android: 'Helvetica Neue'
        })
    },
    title: {
        fontSize: 22,
        alignSelf: 'center',
        fontWeight: 'bold',
        marginBottom: 5,
        ...Styles.title
    },
    subtitle: {
        fontSize: 18,
        alignSelf: 'center',
        marginBottom: 5,
        ...Styles.subtitle
    },
    button: {
        success: {
            backgroundColor: '#00bea8',
            color: '#FFF',
            ...(Styles.button ? Styles.button.success : {})
        },
        bottonDegrade: {
            flexDirection: 'row',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            padding: 5,
            borderRadius: 25,
            width: '80%',
            marginBottom: 5,
            marginTop: 50,
            ...(Styles.button ? Styles.button.bottonDegrade : {})
        },
        bottonLabel: {
            color: DefaultTheme.colors.surface,
            textAlign: 'center',
            textTransform: 'uppercase',
            ...(Styles.button ? Styles.button.bottonLabel : {})
        },
        bottonDefalt: {
            color: DefaultTheme.colors.primary,
            textAlign: 'center',
            textTransform: 'uppercase',
            ...(Styles.button ? Styles.button.bottonLabel : {})
        }
    },
    input: {
        default: {
            backgroundColor: '#FFF',
            border: 1,
            ...(Styles.input ? Styles.input.default : {})
        }
    },
    paragrafo: {
        textAlign: 'center',
        color: '#323C45',
        fontSize: 14,
        opacity: 1
    },
};