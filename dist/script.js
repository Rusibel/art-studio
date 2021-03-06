/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/accordion.js":
/*!*************************************!*\
  !*** ./src/js/modules/accordion.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const accordion = (triggersSelector, itemsSelector) => {
  const btns = document.querySelectorAll(triggersSelector),
        blocks = document.querySelectorAll(itemsSelector);
  btns.forEach(btn => {
    btn.addEventListener('click', function () {
      this.classList.toggle('active-style');
      this.nextElementSibling.classList.toggle('active-content');

      if (this.classList.contains('active-style')) {
        this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 80 + "px";
      } else {
        this.nextElementSibling.style.maxHeight = '0px';
      }

      btns.forEach(btn => {
        if (btn != this) {
          btn.classList.remove('active-style');
          btn.nextElementSibling.classList.remove('active-content');
          btn.nextElementSibling.style.maxHeight = '0px';
        }
      });
    });
  }); //   blocks = document.querySelectorAll(itemsSelector);
  // blocks.forEach(block => {
  //     block.classList.add('animated', 'fadeInDown');
  // });
  // btns.forEach(btn => {
  //     btn.addEventListener('click', function() {
  //         if (!this.classList.contains('active')) {
  //             btns.forEach(btn => {
  //                 btn.classList.remove('active', 'active-style');
  //             });
  //             this.classList.add('active', 'active-style');
  //         }
  //     });
  // });
};

/* harmony default export */ __webpack_exports__["default"] = (accordion);

/***/ }),

/***/ "./src/js/modules/burger.js":
/*!**********************************!*\
  !*** ./src/js/modules/burger.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const burger = (menuSelector, burgerSelector) => {
  const menuElem = document.querySelector(menuSelector),
        burgerElem = document.querySelector(burgerSelector);
  menuElem.style.display = 'none';
  burgerElem.addEventListener('click', () => {
    if (menuElem.style.display == "none" && window.screen.availWidth < 992) {
      menuElem.style.display = 'block';
    } else {
      menuElem.style.display = 'none';
    }
  });
  window.addEventListener('resize', () => {
    if (window.screen.availWidth > 992) {
      menuElem.style.display = 'none';
    }
  });
};

/* harmony default export */ __webpack_exports__["default"] = (burger);

/***/ }),

/***/ "./src/js/modules/calc.js":
/*!********************************!*\
  !*** ./src/js/modules/calc.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");


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
    sum = Math.round(+sizeBlock.dataset.option * +materialBlock.dataset.option + +optionsBlock.dataset.option);

    if (sizeBlock.value == '' || materialBlock.value == '') {
      resultBlock.textContent = "????????????????????, ???????????????? ???????????? ?? ???????????????? ??????????????";
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
      if (val == key) {
        console.log(key, opt[key], 'match');
        e.target.dataset.option = opt[key];
      }
    }
  };

  const getPrice = () => {
    let statusMessage = document.createElement('div');
    statusMessage.classList.add('status');
    calcForm.appendChild(statusMessage);
    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('assets/db.json').then(res => {
      priceList = res;
      const {
        size,
        material,
        options,
        promocode
      } = res;
      calcForm.removeEventListener('mouseover', getPrice);
      sizeBlock.addEventListener('change', async e => {
        await setValue(e, size);
        calcFunc();
      });
      materialBlock.addEventListener('change', async e => {
        await setValue(e, material);
        calcFunc();
      });
      optionsBlock.addEventListener('change', async e => {
        await setValue(e, options);
        calcFunc();
      });
      promocodeBlock.addEventListener('input', calcFunc);
    }).catch(error => {
      console.log(error);
      statusMessage.textContent = '??????-???? ?????????? ???? ??????...';
    }).finally(() => {
      setTimeout(() => {
        if (statusMessage) {
          statusMessage.textContent = '';
        }
      }, 5000);
    });
  };

  calcForm.addEventListener('mouseover', getPrice);
};

/* harmony default export */ __webpack_exports__["default"] = (calc);

/***/ }),

/***/ "./src/js/modules/changeCalcState.js":
/*!*******************************************!*\
  !*** ./src/js/modules/changeCalcState.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const changeCalcState = (state, size, material, options, promocode, result) => {
  const materialBlock = document.querySelector(material),
        optionsBlock = document.querySelector(options),
        promocodeBlock = document.querySelector(promocode),
        sizeBlock = document.querySelector(size),
        calcForm = document.querySelector('.calc_form');

  function bindActionToElem(event, elem, prop) {
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

/* harmony default export */ __webpack_exports__["default"] = (changeCalcState);

/***/ }),

/***/ "./src/js/modules/checkTextInputs.js":
/*!*******************************************!*\
  !*** ./src/js/modules/checkTextInputs.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const checkTextInputs = selector => {
  const txtInputs = document.querySelectorAll(selector);
  txtInputs.forEach(input => {
    input.addEventListener('keypress', function (e) {
      if (e.key.match(/[^??-???? 0-9]/ig)) {
        e.preventDefault();
      }
    });
  });
};

/* harmony default export */ __webpack_exports__["default"] = (checkTextInputs);

/***/ }),

/***/ "./src/js/modules/drop.js":
/*!********************************!*\
  !*** ./src/js/modules/drop.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const drop = () => {
  // drag *
  // dragend *
  // dragenter - ???????????? ?????? dropArea
  // dragexit *
  // dragleave - ???????????? ???? ?????????????????? dropArea
  // dragover - ???????????? ???????????????? ?????? dropArea
  // dragstart *
  // drop - ???????????? ?????????????????? ?? dropArea
  const fileInputs = document.querySelectorAll('[name="upload"]');
  ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
    fileInputs.forEach(input => {
      input.addEventListener(eventName, preventDefaults, false);
    });
  });

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function highlight(item) {
    item.closest('.file_upload').style.border = "5px solid yellow";
    item.closest('.file_upload').style.backgroundColor = "rgba(0,0,0, .7)";
  }

  function unhighlight(item) {
    item.closest('.file_upload').style.border = "none";

    if (item.closest('.calc_form')) {
      item.closest('.file_upload').style.backgroundColor = "#fff";
    } else {
      item.closest('.file_upload').style.backgroundColor = "#ededed";
    }
  }

  ['dragenter', 'dragover'].forEach(eventName => {
    fileInputs.forEach(input => {
      input.addEventListener(eventName, () => highlight(input), false);
    });
  });
  ['dragleave', 'drop'].forEach(eventName => {
    fileInputs.forEach(input => {
      input.addEventListener(eventName, () => unhighlight(input), false);
    });
  });
  fileInputs.forEach(input => {
    input.addEventListener('drop', e => {
      input.files = e.dataTransfer.files;
      let dots;
      const arr = input.files[0].name.split('.');
      arr[0].length > 6 ? dots = "..." : dots = '.';
      const name = arr[0].substring(0, 6) + dots + arr[1];
      input.previousElementSibling.textContent = name;
    });
  });
};

/* harmony default export */ __webpack_exports__["default"] = (drop);

/***/ }),

/***/ "./src/js/modules/filter.js":
/*!**********************************!*\
  !*** ./src/js/modules/filter.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function filter(filterSelector, filterContentSelector, filterParentSelector, activeClass) {
  for (var _len = arguments.length, portfolioNoClasses = new Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
    portfolioNoClasses[_key - 4] = arguments[_key];
  }

  const filter = document.querySelectorAll(filterSelector),
        filterContent = document.querySelectorAll(filterContentSelector),
        filterParent = document.querySelector(filterParentSelector),
        portfolioNoBlock = document.querySelector('.portfolio-no'),
        no = portfolioNoClasses;

  function hideTabContent() {
    portfolioNoBlock.style.display = 'none'; // portfolioNoBlock.classList.remove('animated', 'zoomIn');
    // portfolioNoBlock.classList.add('animated', 'zoomOut');

    filterContent.forEach(item => {
      // item.classList.remove('animated', 'zoomIn');
      // item.classList.add('animated', 'zoomOut');
      item.style.display = 'none';
    });
    filter.forEach(item => {
      if (item.classList.contains(activeClass)) {
        item.classList.remove(activeClass);
      }
    });
  }

  function showTabContent() {
    let i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    filter[i].classList.add(activeClass);
    let activeClassName = filter[i].className.replace(/\s.*/, '');

    if (no.some(elem => elem == activeClassName)) {
      portfolioNoBlock.style.display = 'block'; // portfolioNoBlock.classList.remove('animated', 'zoomOut');

      portfolioNoBlock.classList.add('animated', 'zoomIn');
    } else {
      portfolioNoBlock.style.display = 'none';
      filterContent.forEach(item => {
        if (item.classList.contains(activeClassName)) {
          item.style.display = 'block'; // item.classList.remove('animated', 'zoomOut');

          item.classList.add('animated', 'zoomIn');
        }
      });
    }
  }

  hideTabContent();
  showTabContent();
  filterParent.addEventListener('click', function (event) {
    const target = event.target;

    if (target) {
      event.preventDefault();
    }

    if (target && target.tagName == "LI") {
      filter.forEach((item, i) => {
        if (target == item || target.parentElement == item) {
          hideTabContent(); // setTimeout(() => {

          showTabContent(i); // }, 0);
        }
      });
    }
  });
}

/* harmony default export */ __webpack_exports__["default"] = (filter);

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");


function forms(state) {
  const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        upload = document.querySelectorAll('[name="upload"]');
  const message = {
    loading: '????????????????...',
    success: '??????????????! ?????????? ???? ?? ???????? ????????????????',
    failure: '??????-???? ?????????? ???? ??????...',
    spiner: 'assets/img/spinner.gif',
    ok: 'assets/img/ok.png',
    fail: 'assets/img/fail.png'
  };
  const path = {
    designer: 'assets/server.php',
    question: 'assets/question.php'
  };

  const clearInputs = () => {
    inputs.forEach(item => {
      item.value = '';
    });
    upload.forEach(item => {
      item.previousElementSibling.textContent = '???????? ???? ????????????';
    });
  };

  upload.forEach(item => {
    item.addEventListener('input', () => {
      console.log(item.files[0]);
      let dots;
      const arr = item.files[0].name.split('.');
      arr[0].length > 6 ? dots = "..." : dots = '.';
      const name = arr[0].substring(0, 6) + dots + arr[1];
      item.previousElementSibling.textContent = name;
    });
  });
  form.forEach(item => {
    item.addEventListener('submit', e => {
      e.preventDefault();
      let statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      item.parentNode.appendChild(statusMessage);
      item.classList.add('animated', 'fadeOutUp;');
      setTimeout(() => {
        item.style.display = 'none';
      }, 400);
      let statusImg = document.createElement('img');
      statusImg.setAttribute('src', message.spiner);
      statusImg.classList.add('animated', 'fadeInUp');
      setTimeout(() => {
        statusMessage.appendChild(statusImg);
      }, 400);
      let textMessage = document.createElement('div');
      textMessage.textContent = message.loading;
      statusMessage.appendChild(textMessage);
      const formData = new FormData(item);

      if (state) {
        for (let key in state) {
          formData.append(key, state[key]);
        }
      }

      let api;
      item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question;
      console.log(api);
      (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.postData)(api, formData).then(res => {
        console.log(res);
        statusImg.setAttribute('src', message.ok);
        statusMessage.textContent = message.success;

        for (let key in state) {
          if (state.hasOwnProperty(key)) {
            delete state[key];
          }
        }
      }).catch(() => {
        statusImg.setAttribute('src', message.fail);
        statusMessage.textContent = message.failure;
      }).finally(() => {
        clearInputs();
        setTimeout(() => {
          statusMessage.remove();
          statusImg.remove();
          item.style.display = 'block';
          item.classList.remove('fadeOutUp');
          item.classList.add('fadeInUp');
        }, 5000);
      });
    });
  });
}

/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./src/js/modules/mask.js":
/*!********************************!*\
  !*** ./src/js/modules/mask.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const mask = selector => {
  let setCursorPosition = (pos, elem) => {
    elem.focus();

    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
      let range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  };

  function createMask(event) {
    let matrix = '+7 (___) ___ __ __',
        i = 0,
        def = matrix.replace(/\D/g, ''),
        val = this.value.replace(/\D/g, '');

    if (def.length >= val.length) {
      val = def;
    }

    this.value = matrix.replace(/./g, function (a) {
      return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
    });

    if (event.type === 'blur') {
      if (this.value.length == 2) {
        this.value = '';
      }
    } else {
      setCursorPosition(this.value.length, this);
    }
  }

  let inputs = document.querySelectorAll(selector);
  inputs.forEach(input => {
    input.addEventListener('input', createMask);
    input.addEventListener('focus', createMask);
    input.addEventListener('blur', createMask);
  });
};

/* harmony default export */ __webpack_exports__["default"] = (mask);

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const modal = () => {
  let btnPressed;
  const scroll = calcScroll(),
        windows = document.querySelectorAll('[data-modal]'),
        giftBtn = document.querySelector('.fixed-gift');

  function openModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    windows.forEach(item => {
      item.style.display = 'none';
      item.classList.add('animated', 'fadeIn'); //???????????????? ???? Animate.css
    });
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
    document.body.style.marginRight = `${scroll}px`; // if (modalTimerId && modalSelector == '.popup-consultation') {
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
      item.addEventListener('click', e => {
        if (e.target) {
          e.preventDefault();
        }

        openModal(modalSelector);
        btnPressed = true;
      });
    });
    close.forEach(btn => {
      btn.addEventListener('click', e => {
        closeModal(modalSelector);
      });
    });
    modal.addEventListener('click', e => {
      if (e.target === modal) {
        closeModal(modalSelector);
      }
    });
  }

  function showModalByTime(selector, time) {
    setTimeout(function () {
      let display;
      document.querySelectorAll('[data-modal').forEach(item => {
        if (getComputedStyle(item).display !== 'none') {
          display = "block";
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
      if (!btnPressed && window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        document.querySelector(selector).click(); // window.removeEventListener('scroll', showModalByScroll);
      }
    });
  } // let errorMessage = document.createElement('div');
  //     errorMessage.classList.add('status');
  //     document.querySelector('.popup_calc_content').append(errorMessage);
  //     document.querySelector('.popup_calc_profile_content').append(errorMessage);
  // function checkInputsData(triggerSelector, modalSelector, modalCloseSelector, closeClickOverlay, examProps1, examProps2, examProps3 = true,){     
  //         if (examProps1 && examProps2 && examProps3) {            
  //             bindModal(triggerSelector, modalSelector, modalCloseSelector, closeClickOverlay);
  //             document.querySelector(triggerSelector).textContent = '??????????';     
  //             document.querySelector(triggerSelector).classList.remove('status');    
  //         } else {              
  //             document.querySelector(triggerSelector).textContent = '???????????????? ???????? ??????????';     
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

/* harmony default export */ __webpack_exports__["default"] = (modal);

/***/ }),

/***/ "./src/js/modules/pictureSize.js":
/*!***************************************!*\
  !*** ./src/js/modules/pictureSize.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const pictureSize = () => {
  const wrapper = document.querySelector('.sizes-wrapper'),
        sizeBlock = document.querySelectorAll('.sizes-block'),
        sizesBlockImg = document.querySelectorAll('.sizes-block > img');

  function showPic(i) {
    sizesBlockImg[i].setAttribute("src", `assets/img/sizes-${i + 1}-1.png`);
    sizesBlockImg[i].style.zIndex = 1;
    sizesBlockImg[i].style.position = 'relative';
  }

  function hiddenPic(i) {
    sizesBlockImg[i].setAttribute("src", `assets/img/sizes-${i + 1}.png`);
    sizesBlockImg[i].style.zIndex = 0;
    sizesBlockImg[i].style.position = '';
  }

  sizeBlock.forEach((item, i) => {
    item.addEventListener('mouseover', e => {
      const target = e.currentTarget;
      console.log(target);

      if (target && target.className == "sizes-block") {
        showPic(i);
      }
    });
  });
  wrapper.addEventListener('mouseout', e => {
    const target = e.target;

    if (target && target.tagName == "IMG") {
      sizesBlockImg.forEach((item, i) => {
        if (target == item) {
          hiddenPic(i);
        }
      });
    }
  });
};

/* harmony default export */ __webpack_exports__["default"] = (pictureSize);

/***/ }),

/***/ "./src/js/modules/scrolling.js":
/*!*************************************!*\
  !*** ./src/js/modules/scrolling.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const scrolling = upSelector => {
  const upElem = document.querySelector(upSelector);
  window.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop > 1650) {
      upElem.classList.add('animated', 'fadeIn');
      upElem.classList.remove('fadeOut');
    } else {
      upElem.classList.add('fadeOut');
      upElem.classList.remove('fadeIn');
    }
  }); // Scrolling with  requestAnimationFrame

  let links = document.querySelectorAll('[href^="#"]'),
      speed = 0.1;
  links.forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      let widthTop = document.documentElement.scrollTop,
          hash = this.hash,
          toBlock = document.querySelector(hash).getBoundingClientRect().top,
          start = null;
      requestAnimationFrame(step);

      function step(time) {
        if (start === null) {
          start = time;
        }

        let progress = time - start,
            r = toBlock < 0 ? Math.max(widthTop - progress / speed, widthTop + toBlock) : Math.min(widthTop + progress / speed, widthTop + toBlock);
        document.documentElement.scrollTo(0, r);

        if (r != widthTop + toBlock) {
          requestAnimationFrame(step);
        } else {
          location.hash = hash;
        }
      }
    });
  }); // Pure js scrolling
  // const element = document.documentElement,
  //       body = document.body;
  // const calcScroll = () => {
  //     upElem.addEventListener('click', function(event) {
  //         let scrollTop = Math.round(body.scrollTop || element.scrollTop);
  //         if (this.hash !== '') {
  //             event.preventDefault();
  //             let hashElement = document.querySelector(this.hash),
  //                 hashElementTop = 0;
  //             while (hashElement.offsetParent) {
  //                 hashElementTop += hashElement.offsetTop;
  //                 hashElement = hashElement.offsetParent;
  //             }
  //             hashElementTop = Math.round(hashElementTop);
  //             smoothScroll(scrollTop, hashElementTop, this.hash);
  //         }
  //     });
  // };
  // const smoothScroll = (from, to, hash) => {
  //     let timeInterval = 1,
  //         prevScrollTop,
  //         speed;
  //     if (to > from) {
  //         speed = 30;
  //     } else {
  //         speed = -30;
  //     }
  //     let move = setInterval(function() {
  //         let scrollTop = Math.round(body.scrollTop || element.scrollTop);
  //         if (
  //             prevScrollTop === scrollTop ||
  //             (to > from && scrollTop >= to) ||
  //             (to < from && scrollTop <= to)
  //         ) {
  //             clearInterval(move);
  //             history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash);
  //         } else {
  //             body.scrollTop += speed;
  //             element.scrollTop += speed;
  //             prevScrollTop = scrollTop;
  //         }
  //     }, timeInterval);
  // };
  // calcScroll();
};

/* harmony default export */ __webpack_exports__["default"] = (scrolling);

/***/ }),

/***/ "./src/js/modules/showMoreStyles.js":
/*!******************************************!*\
  !*** ./src/js/modules/showMoreStyles.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");


const showMoreStyles = (trigger, wrap) => {
  const btn = document.querySelector(trigger),
        wrapper = document.querySelector(wrap); // cards.forEach(card => {
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
    wrapper.appendChild(statusMessage); // getResource('http://localhost:3000/styles')

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('assets/db.json').then(res => {
      // console.log(res);
      // createCards(res);
      console.log(res.styles);
      createCards(res.styles);
      btn.remove();
    }).catch(error => {
      console.log(error);
      statusMessage.textContent = '??????-???? ?????????? ???? ??????...';
    }).finally(() => {
      setTimeout(() => {
        if (statusMessage) {
          statusMessage.textContent = '';
        }
      }, 5000);
    });
  });

  function createCards(res) {
    res.forEach(_ref => {
      let {
        src,
        title,
        link
      } = _ref;
      let card = document.createElement('div');
      card.classList.add('animated', 'fadeInUp', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
      card.innerHTML = `
            <div class="styles-block">
                <img src=${src} alt="style">
                <h4>${title}</h4>
                <a href=${link}>??????????????????</a>
            </div>
            `;
      wrapper.appendChild(card);
    });
  } // <div class="hidden-lg hidden-md hidden-sm hidden-xs styles-2">
  // <div class=styles-block>
  //     <img src=assets/img/styles-5.jpg alt>
  //     <h4>????????????????</h4>
  //     <a href="#">??????????????????</a>
  // </div>
  // </div>

};

/* harmony default export */ __webpack_exports__["default"] = (showMoreStyles);

/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const sliders = (slides, dir, prev, next) => {
  let slideIndex = 1,
      paused = false;
  const items = document.querySelectorAll(slides);

  function showSlides(n) {
    if (n > items.length) {
      slideIndex = 1;
    }

    if (n < 1) {
      slideIndex = items.length;
    }

    items.forEach(item => {
      item.classList.add('animated');
      item.style.display = 'none';
    });
    items[slideIndex - 1].style.display = 'block';
  }

  showSlides(slideIndex);

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  try {
    const prevBtn = document.querySelector(prev),
          nextBtn = document.querySelector(next);
    prevBtn.addEventListener('click', () => {
      plusSlides(-1);
      items[slideIndex - 1].classList.remove('slideInLeft');
      items[slideIndex - 1].classList.add('slideInRight');
    });
    nextBtn.addEventListener('click', () => {
      plusSlides(1);
      items[slideIndex - 1].classList.remove('slideInRight');
      items[slideIndex - 1].classList.add('slideInLeft');
    });
  } catch (e) {}

  function activateAnimation() {
    if (dir === 'vertical') {
      paused = setInterval(function () {
        plusSlides(1);
        items[slideIndex - 1].classList.add('slideInDown');
      }, 5000);
    } else {
      paused = setInterval(function () {
        plusSlides(1);
        items[slideIndex - 1].classList.remove('slideInRight');
        items[slideIndex - 1].classList.add('slideInLeft');
      }, 3000);
    }
  }

  activateAnimation();
  items[0].parentNode.addEventListener('mouseenter', () => {
    clearInterval(paused);
  });
  items[0].parentNode.addEventListener('mouseleave', () => {
    activateAnimation();
  });
};

/* harmony default export */ __webpack_exports__["default"] = (sliders);

/***/ }),

/***/ "./src/js/services/services.js":
/*!*************************************!*\
  !*** ./src/js/services/services.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": function() { return /* binding */ postData; },
/* harmony export */   "getResource": function() { return /* binding */ getResource; }
/* harmony export */ });
const postData = async (url, data) => {
  let res = await fetch(url, {
    method: "POST",
    body: data
  });
  return await res.text();
};

const getResource = async url => {
  let res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  }

  return await res.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_mask__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/mask */ "./src/js/modules/mask.js");
/* harmony import */ var _modules_checkTextInputs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/checkTextInputs */ "./src/js/modules/checkTextInputs.js");
/* harmony import */ var _modules_showMoreStyles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/showMoreStyles */ "./src/js/modules/showMoreStyles.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./src/js/modules/calc.js");
/* harmony import */ var _modules_changeCalcState__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/changeCalcState */ "./src/js/modules/changeCalcState.js");
/* harmony import */ var _modules_filter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/filter */ "./src/js/modules/filter.js");
/* harmony import */ var _modules_pictureSize__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modules/pictureSize */ "./src/js/modules/pictureSize.js");
/* harmony import */ var _modules_accordion__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./modules/accordion */ "./src/js/modules/accordion.js");
/* harmony import */ var _modules_burger__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./modules/burger */ "./src/js/modules/burger.js");
/* harmony import */ var _modules_scrolling__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./modules/scrolling */ "./src/js/modules/scrolling.js");
/* harmony import */ var _modules_drop__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./modules/drop */ "./src/js/modules/drop.js");














window.addEventListener('DOMContentLoaded', function () {
  "use strict";

  let calcState = {};
  (0,_modules_changeCalcState__WEBPACK_IMPORTED_MODULE_7__["default"])(calcState, '#size', '#material', '#options', '.promocode', '.calc-price');
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_1__["default"])('.feedback-slider-item', '', '.main-prev-btn', '.main-next-btn');
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_1__["default"])('.main-slider-item', 'vertical');
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])(calcState);
  (0,_modules_mask__WEBPACK_IMPORTED_MODULE_3__["default"])('[name="phone"]');
  (0,_modules_checkTextInputs__WEBPACK_IMPORTED_MODULE_4__["default"])('[name="name"]');
  (0,_modules_checkTextInputs__WEBPACK_IMPORTED_MODULE_4__["default"])('[name="message"]');
  (0,_modules_showMoreStyles__WEBPACK_IMPORTED_MODULE_5__["default"])('.button-styles', '#styles .row');
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])(calcState, '#size', '#material', '#options', '.promocode', '.calc-price');
  (0,_modules_filter__WEBPACK_IMPORTED_MODULE_8__["default"])('.portfolio-menu > li', '.portfolio-block', '.portfolio-menu', 'active', 'grandmother', 'granddad');
  (0,_modules_pictureSize__WEBPACK_IMPORTED_MODULE_9__["default"])();
  (0,_modules_accordion__WEBPACK_IMPORTED_MODULE_10__["default"])('.accordion-heading', '.accordion-block');
  (0,_modules_burger__WEBPACK_IMPORTED_MODULE_11__["default"])('.burger-menu', '.burger');
  (0,_modules_scrolling__WEBPACK_IMPORTED_MODULE_12__["default"])('.pageup');
  (0,_modules_drop__WEBPACK_IMPORTED_MODULE_13__["default"])();
});
}();
/******/ })()
;
//# sourceMappingURL=script.js.map