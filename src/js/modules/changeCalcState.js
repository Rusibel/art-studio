const changeCalcState = (state, size, material, options, promocode, result) => {
    const materialBlock = document.querySelector(material),
          optionsBlock = document.querySelector(options),
          promocodeBlock = document.querySelector(promocode),
          sizeBlock = document.querySelector(size),
          calcForm = document.querySelector('.calc_form');
   
    function bindActionToElem (event, elem, prop) {
       
        elem.addEventListener(event, () => {
                    state[prop] = elem.value;
                    console.log(state);
        });
    }

    bindActionToElem('change', sizeBlock, 'sizeBlock');
    bindActionToElem('change', materialBlock, 'materialBlock');
    bindActionToElem('change', optionsBlock, 'optionsBlock');
    bindActionToElem('input', promocodeBlock, 'promocodeBlock');

    
};

export default changeCalcState;