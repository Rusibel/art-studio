const modal = () => {
    let btnPressed;
    const scroll = calcScroll(),
          windows = document.querySelectorAll('[data-modal]'),
          giftBtn = document.querySelector('.fixed-gift');
        
    function openModal(modalSelector) {
        const modal = document.querySelector(modalSelector);
            
        windows.forEach(item => {
            item.style.display = 'none';
        });

        modal.style.display = "block";
        document.body.style.overflow = "hidden";
        document.body.style.marginRight = `${scroll}px`;

        // if (modalTimerId && modalSelector == '.popup-consultation') {
        //     clearInterval(modalTimerId);
        // }
        if (modalSelector == '.popup-gift') {
            giftBtn.remove();
        }
    }

    function closeModal(modalSelector) {
        
        windows.forEach(item => {
            item.style.display = 'none';
        });           

        document.body.style.overflow = "";
        document.body.style.marginRight = `0px`;

    }

    function bindModal(triggerSelector, modalSelector, closeSelector) {

        const trigger = document.querySelectorAll(triggerSelector),
              close = document.querySelectorAll(closeSelector),
              modal = document.querySelector(modalSelector);

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }
                openModal(modalSelector);
                btnPressed = true;
            });
        }); 

        close.forEach(btn => {
            btn.addEventListener('click', (e) => {
                closeModal(modalSelector);
            });
        });

        modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal(modalSelector);
            }
        });


    }

    function showModalByTime(selector, time) {
        setTimeout(function() {
            let display;

            document.querySelectorAll('[data-modal').forEach(item => {
                if (getComputedStyle(item).display !== 'none') {
                    display = "block" ;
                }
            });

            if (!display) {                
                openModal(selector);
                    
            }

        }, time);
    }

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50rem';
        div.style.height = '50rem';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    function showModalByScroll(selector) {
        window.addEventListener('scroll', () => {
            if (!btnPressed && (windows.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight)) {
                document.querySelector(selector).click();
                // window.removeEventListener('scroll', showModalByScroll);
            }
        });
    }



    // let errorMessage = document.createElement('div');
    //     errorMessage.classList.add('status');
    //     document.querySelector('.popup_calc_content').append(errorMessage);
    //     document.querySelector('.popup_calc_profile_content').append(errorMessage);

    // function checkInputsData(triggerSelector, modalSelector, modalCloseSelector, closeClickOverlay, examProps1, examProps2, examProps3 = true,){     
    //         if (examProps1 && examProps2 && examProps3) {            
    //             bindModal(triggerSelector, modalSelector, modalCloseSelector, closeClickOverlay);
    //             document.querySelector(triggerSelector).textContent = 'Далее';     
    //             document.querySelector(triggerSelector).classList.remove('status');    
    //         } else {              
    //             document.querySelector(triggerSelector).textContent = 'Сделайте свой выбор';     
    //             document.querySelector(triggerSelector).classList.add('status');   
    //             document.querySelector(triggerSelector).removeEventListener('click');       
    //         }
    // } 

    // document.querySelector('.popup_calc_button').addEventListener('mouseover', () => {
    //     checkInputsData('.popup_calc_button','.popup_calc_profile', '.popup_calc_profile_close', false, state.form, state.width, state.height);
    // });

    // document.querySelector('.popup_calc_profile_button').addEventListener('mouseover', () => {
    //     checkInputsData('.popup_calc_profile_button','.popup_calc_end', '.popup_calc_end_close', false, state.type, state.profile);
    // });

    

    bindModal('.button-design', '.popup-design', '.popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-close');
    showModalByScroll('.fixed-gift');
    showModalByTime('.popup-consultation', 60000);

};

export default modal;
