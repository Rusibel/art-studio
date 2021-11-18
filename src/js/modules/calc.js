import {getResource} from '../services/services';

const calc = (state, size, material, options, promocode, result) => {
    const sizeBlock = document.querySelector(size),
          materialBlock = document.querySelector(material),
          optionsBlock = document.querySelector(options),
          promocodeBlock = document.querySelector(promocode),
          resultBlock = document.querySelector(result),
          calcForm = document.querySelector('.calc_form');

    let sum = 0,
        priceList = {};

    const calcFunc = () => {
        sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value));

        if (sizeBlock.value == '' || materialBlock.value == '') {
            resultBlock.textContent = "Пожалуйста, выберите размер и материал картины";
        } else if (priceList.promocode.indexOf(promocodeBlock.value) != -1) {
            resultBlock.textContent = Math.round(sum * 0.7);
            state.result = Math.round(sum * 0.7);
        } else {
            resultBlock.textContent = sum;
            state.result = sum;
        }
    };
    const setValue = (option, block) => {
        let el = block;
        el.addEventListener('change', function(e){
            let value = e.target.value;
            if(value === 'option value'){
                    location.href = '';  // ссылка для редеректа
            }
        });
        const {size, material, options} = priceList;
        for (let key in size) {
            console.log(key);
            console.log(sizeBlock.value);
            if(size.key == sizeBlock.textContent){
                console.log(key);
                console.log(sizeBlock.value);
            } 

        }
    };


    const getPrice = () => {
        let statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
        calcForm.appendChild(statusMessage);

        getResource('assets/db.json')
            .then(res => {
                priceList = res;
                console.log(priceList);
                calcForm.removeEventListener('mouseover', getPrice);
                sizeBlock.addEventListener('change', calcFunc);
                sizeBlock.addEventListener('change', setValue);
                materialBlock.addEventListener('change', calcFunc);
                optionsBlock.addEventListener('change', calcFunc);
                promocodeBlock.addEventListener('input', calcFunc);
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
    };

    calcForm.addEventListener('mouseover', getPrice);

};

export default calc;