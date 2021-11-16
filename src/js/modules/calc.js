import {getResource} from '../services/services';

const calc = (state, size, material, options, promocode, result) => {
    const sizeBlock = document.querySelector(size),
          materialBlock = document.querySelector(material),
          optionsBlock = document.querySelector(options),
          promocodeBlock = document.querySelector(promocode),
          resultBlock = document.querySelector(result);

    let sum = 0;

    const calcFunc = () => {
        sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value));

        if (sizeBlock.value == '' || materialBlock.value == '') {
            resultBlock.textContent = "Пожалуйста, выберите размер и материал картины";
        } else if (promocodeBlock.value === 'IWANTPOPART') {
            resultBlock.textContent = Math.round(sum * 0.7);
            state.result = Math.round(sum * 0.7);
        } else {
            resultBlock.textContent = sum;
            state.result = sum;
        }
    };

    const getPrice = (param, options) => {
        let statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
        resultBlock.parentNode.appendChild(statusMessage);

        getResource('assets/db.json')
            .then(res => {
                console.log(res.param);
                res.param.forEach((key, val) => {
                    if(key == options.textContent){
                        options.setAttribute('value', val)
                    }
                });
            })
            .catch(error => {
                console.log(error);
                statusMessage.textContent = 'Что-то пошло не так...';
               
            })
            .finally(() => {
                setTimeout(() => {
                    if (statusMessage) {
                        statusMessage.textContent = '';
                    }
                }, 5000);
            });
    });

    sizeBlock.addEventListener('change', calcFunc);
    materialBlock.addEventListener('change', calcFunc);
    optionsBlock.addEventListener('change', calcFunc);
    promocodeBlock.addEventListener('input', calcFunc);
};

export default calc;