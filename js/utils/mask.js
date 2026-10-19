export function aplyPhoneMask(event){
    const input = event.target;

    let number = input.value.replace(/\D/g, '');

    if(number.length > 11){
        number = number.slice(0,11);
    }

    // 3. Aplica a formatação condicionalmente conforme a quantidade de números
    if (number.length > 10) {
        //(XX) XXXXX-XXXX
        number = number.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else if (number.length > 6) {
        //(XX) XXXX-XXXX
        number = number.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
    } else if (number.length > 2) {
        //(XX) XXXX
        number = number.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
    } else if (number.length > 0) {
        // (XX
        number = number.replace(/^(\d*)$/, '($1');
    }

    input.value = number;
}