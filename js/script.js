// Факториал
function fact(n) {
    if (n < 0) return "Ошибка";
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
}

window.onload = function() {
    let a = '';
    let b = '';
    let expressionResult = '';
    let selectedOperation = null;
    let memory = 0;
    let isFinalResult = false;
    const outputElement = document.getElementById("result");
    const calculator = document.getElementById("calculator");

    // Форматирование длинных чисел
    function formatOutput(val) {
        if (val === "Ошибка") return val;
        let str = val.toString();
        if (str.length > 12) {
            let num = parseFloat(val);
            return num.toExponential(5); 
        }
        return str;
    }

    // Перевод в 16-систему
    function hexValue(decimalValue) {
        let num = parseFloat(decimalValue);

        let isNegative = num < 0;
        let absNum = Math.abs(Math.trunc(num))

        let hexText = absNum.toString(16).toUpperCase();
        if (isNegative) hexText = "-" + hexText;

        let hexColor = '#' + absNum.toString(16).padStart(6, '0').slice(-6);

        outputElement.innerHTML = hexText;
        outputElement.style.color = hexColor;
    }


    // Обработчик нажатий на ВСЕ кнопки калькулятора
    calculator.addEventListener('click', function(event) {
        let currentBtn = event.target;
        

        if (!currentBtn.classList.contains('calc-btn')) return;

        const val = currentBtn.innerHTML;

        // УДАЛЕНИЕ ПОСЛЕДНЕГО СИМВОЛА 
        if (val === '←') {
            if (isFinalResult) {
                a = '';
                outputElement.innerHTML = '0';
                isFinalResult = false;
            } else if (a !== '') {
                a = a.slice(0, -1);
                outputElement.innerHTML = (a === '' || a === '-') ? '0' : formatOutput(a);
                if (a === '-') a = '';
            }
            return;
        }

        //  СМЕНА ЗНАКА
        if (val === '+/-') {
            if (a !== '') {
                a = (parseFloat(a) * -1).toString();
                outputElement.innerHTML = formatOutput(a);
                isFinalResult = false;
            }
            return;
        }

        // ТРОЙНОЙ НОЛЬ 
        if (val === '000') {
            if (isFinalResult) {
                a = '0';
                isFinalResult = false;
            } else {
                if (a !== '' && a !== '0') {
                    a += '000';
                } else if (a === '') {
                    a = '0';
                }
            }
            outputElement.innerHTML = formatOutput(a);
            return;
        }

        
        if (val === 'x!') {
            if (a !== '') {
                a = fact(parseInt(a)).toString();
                outputElement.innerHTML = formatOutput(a);
                isFinalResult = true;
            }
            return;
        }

        if (val === '√') {
            if (a !== '') {
                let num = parseFloat(a);
                a = num < 0 ? "Ошибка" : Math.sqrt(num).toString();
                outputElement.innerHTML = formatOutput(a);
                isFinalResult = true;
            }
            return;
        }

        if (val === 'x²') {
            if (a !== '') {
                a = Math.pow(parseFloat(a), 2).toString();
                outputElement.innerHTML = formatOutput(a);
                isFinalResult = true;
            }
            return;
        }

        if (val === '%') {
            if (a !== '') {
                a = (parseFloat(a) / 100).toString();
                outputElement.innerHTML = formatOutput(a);
                isFinalResult = true;
            }
            return;
        }
// Перевод в двоичную систему 
        if (val === 'BIN') {
            if (a !== '') {
                // Округляем до целого
                let num = Math.trunc(parseFloat(a)); 
                if (isNaN(num)) {
                    a = "Ошибка";
                } else {
                    a = num.toString(2);
                }
                outputElement.innerHTML = formatOutput(a);
                isFinalResult = true;
            }
            return;
        }

        // (Накапливаемое сложение/вычитание)
        if (val === 'M+') {
            if (a !== '') memory += parseFloat(a);
            return;
        }
        if (val === 'M-') {
            if (a !== '') memory -= parseFloat(a);
            return;
        }
        if (val === 'MR') {
            a = memory.toString();
            outputElement.innerHTML = formatOutput(a);
            isFinalResult = true;
            return;
        }

        // (+, -, x, /) 
        if (['+', '-', 'x', '/'].includes(val)) {
            if (a === '') return;
            b = a;
            a = '';
            selectedOperation = val;
            outputElement.innerHTML = '0';
            isFinalResult = false;
            return;
        }

        
        if (['C', '='].includes(val)) return;

        // ВВОД ЦИФР 
        if ((val >= '0' && val <= '9') || val === '.') {
            if (isFinalResult) {
                a = (val === '.') ? '0.' : val;
                isFinalResult = false;
            } else {
                if (val === '.' && a.includes('.')) return; // Защита от двух точек
                if (a.length >= 15) return; // Ограничение длины
                if (a === '0' && val !== '.') a = '';
                a += val;
            }
            outputElement.innerHTML = formatOutput(a);
        }
    });

    document.getElementById("btn_op_clear").onclick = function() {
        a = ''; 
        b = ''; 
        selectedOperation = null;
        isFinalResult = false;
        outputElement.innerHTML = '0';
    };

    // (=)
    document.getElementById("btn_op_equal").onclick = function() {
        if (a === '' || b === '' || !selectedOperation) return;

        let num1 = parseFloat(b);
        let num2 = parseFloat(a);

        switch(selectedOperation) {
            case 'x': expressionResult = num1 * num2; break;
            case '+': expressionResult = num1 + num2; break;
            case '-': expressionResult = num1 - num2; break;
            case '/': 
                if (num2 === 0) {
                    expressionResult = "Ошибка";
                } else {
                    expressionResult = num1 / num2; 
                }
                break;
        }

        a = expressionResult.toString();
        b = '';
        selectedOperation = null;
        isFinalResult = true;
        // outputElement.innerHTML = formatOutput(a);
        hexValue(a);
    };

    
    document.getElementById("change-bg-color").onclick = function() {
        document.body.classList.toggle("alt-bg");
    };

    document.getElementById("change-result-color").onclick = function() {
        document.getElementById("result").classList.toggle("res-alt-color");
    };
};