export default class CnpjUtils {
    static maskCnpj = (cnpj) => {
        return cnpj
            .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
            .replace(/(\d{2})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1/$2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1')
    }

    static dataformat = (v) => {
        var r = v.replace(/\D/g,"");
        r = r.replace(/^0/,"");
        if (r.length > 10) {
            // 11+ digits. Format as 5+4.
            r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/,"(0XX$1) $2-$3");
        }
        else if (r.length > 5) {
            // 6..10 digits. Format as 4+4
            r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/,"(0XX$1) $2-$3");
        }
        else if (r.length > 2) {
            // 3..5 digits. Add (0XX..)
            r = r.replace(/^(\d\d)(\d{0,5})/,"(0XX$1) $2");
        }
        else {
            // 0..2 digits. Just add (0XX
            r = r.replace(/^(\d*)/, "(0XX$1");
        }
        return r;
    }

    static dataNascimento = (cnpj) => {
        return cnpj
            .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
            .replace(/(\d{2})(\d)/, '$1/$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
            .replace(/(\d{2})(\d)/, '$1/$2')
    }
    
    static validateCnpj = (cnpj) => {
        cnpj = cnpj?.replace(/[^\d]+/g, '');

        if (cnpj == '') return false;

        if (cnpj.length != 14)
            return false;

        // Elimina CNPJs invalidos conhecidos
        if (cnpj == "00000000000000" ||
            cnpj == "11111111111111" ||
            cnpj == "22222222222222" ||
            cnpj == "33333333333333" ||
            cnpj == "44444444444444" ||
            cnpj == "55555555555555" ||
            cnpj == "66666666666666" ||
            cnpj == "77777777777777" ||
            cnpj == "88888888888888" ||
            cnpj == "99999999999999")
            return false;

        // Valida DVs
        let tamanho, numeros, digitos, soma, pos, resultado;
        tamanho = cnpj.length - 2
        numeros = cnpj.substring(0, tamanho);
        digitos = cnpj.substring(tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            return false;

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
            return false;

        return true;
    }
}