import {getResource} from '../services/services';

const showMoreStyles = (trigger, wrap) => {
    const btn = document.querySelector(trigger),
          wrapper = document.querySelector(wrap);

    // cards.forEach(card => {
    //     card.classList.add('animated', 'fadeInUp');
    // });

    // btn.addEventListener('click', () => {
    //     cards.forEach(card => {
    //         card.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs');
    //         card.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
    //     });
    //     // btn.style.display = 'none';
    //     btn.remove();
    // });


    btn.addEventListener('click', function () {


        let statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
        wrapper.appendChild(statusMessage);


        getResource('http://localhost:3000/styles')
        // getResource('assets/db.json')
            .then(res => {
                console.log(res);
                createCards(res);
                // console.log(res.styles);
                // createCards(res.styles);
                btn.remove();
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

    function createCards(res) {
        res.forEach(({src, title, link}) => {
            let card = document.createElement('div');

            card.classList.add('animated', 'fadeInUp', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');

            card.innerHTML = `
            <div class="styles-block">
                <img src=${src} alt="style">
                <h4>${title}</h4>
                <a href=${link}>Подробнее</a>
            </div>
            `;
            wrapper.appendChild(card);
        });
    }

    // <div class="hidden-lg hidden-md hidden-sm hidden-xs styles-2">
    // <div class=styles-block>
    //     <img src=assets/img/styles-5.jpg alt>
    //     <h4>Пастелью</h4>
    //     <a href="#">Подробнее</a>
    // </div>
    // </div>



};

export default showMoreStyles;