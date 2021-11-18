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
        console.log(sizeBlock.dataset.option);
        console.log(materialBlock.dataset.option);
        console.log(optionsBlock.dataset.option);

        sum = Math.round((+sizeBlock.dataset.option) * (+materialBlock.dataset.option) + (+optionsBlock.dataset.option));

        if (sizeBlock.value == '' || materialBlock.value == '') {
            resultBlock.textContent = "Пожалуйста, выберите размер и материал картины";
        } else if (priceList.promocode.indexOf(promocodeBlock.value) != -1) {
            console.log(priceList.promocode);
            resultBlock.textContent = Math.round(sum * 0.7);
            state.result = Math.round(sum * 0.7);
        } else {
            resultBlock.textContent = sum;
            state.result = sum;
        }
    };
    const setValue = (e, opt) => {
        const val = e.target.value;
        console.log(val);
        for (let key in opt) {
            if(val == key){
                console.log(key, opt[key], 'match');
                e.target.dataset.option = opt[key];
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
                const {size, material, options, promocode} = res;
                console.log(promocode);

                calcForm.removeEventListener('mouseover', getPrice);
                sizeBlock.addEventListener('change', async (e) => {
                    await setValue(e, size);
                    calcFunc();
                });
                materialBlock.addEventListener('change', async (e) => {
                    await setValue(e, material);
                    calcFunc();
                });
                optionsBlock.addEventListener('change', async (e) => {
                    await setValue(e, options);
                    calcFunc();
                });
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