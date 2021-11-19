const pictureSize = () => {
    const wrapper = document.querySelector('.sizes-wrapper'),
          sizeBlock = document.querySelectorAll('.sizes-block'),
          sizesBlockImg = document.querySelectorAll('.sizes-block > img');
    
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

    sizeBlock.forEach((item, i) => {
        item.addEventListener('mouseover', (e) => {
            const target = e.currentTarget;
            console.log(target);
    
            if (target && target.className == "sizes-block") {
                        showPic(i);
            }
        });
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
