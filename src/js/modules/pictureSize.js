const pictureSize = () => {
    const wrapper = document.querySelector('.sizes-wrapper'),
          sizesBlockImg = document.querySelectorAll('.sizes-block > img');

          console.log(sizesBlockImg);
    
    function showPic(i) {
        sizesBlockImg[i].setAttribute("src", `assets/img/sizes-${i+1}-1.png`);
        sizesBlockImg[i].style.zIndex = 1;
        sizesBlockImg[i].style.position = 'relative';
    }

    function hiddenPic(i) {
        sizesBlockImg[i].setAttribute("src", `assets/img/sizes-${i+1}.png`);
        sizesBlockImg[i].style.zIndex = 0;
        sizesBlockImg[i].style.position = '';
    }

    wrapper.addEventListener('mouseover', (e) => {
        const target = e.target;

        if (target && target.tagName == "IMG") {
            sizesBlockImg.forEach((item, i) => {
                if ((target == item)) {
                    showPic(i);
                }              
            });
        }
    });

    wrapper.addEventListener('mouseout', (e) => {
        const target = e.target;

        if (target && target.tagName == "IMG") {
            sizesBlockImg.forEach((item, i) => {
                if ((target == item)) {
                    hiddenPic(i);
                }              
            });
        }
    });

    
};

export default pictureSize;
