function filter(filterSelector, filterContentSelector, filterParentSelector, activeClass, ...portfolioNoClasses){
    const filter = document.querySelectorAll(filterSelector),
          filterContent = document.querySelectorAll(filterContentSelector),
          filterParent = document.querySelector(filterParentSelector),
          portfolioNoBlock = document.querySelector('.portfolio-no');

    function hideTabContent() {

        portfolioNoBlock.style.display = 'none';
        
        filterContent.forEach(item => {
            item.style.display = 'none';
        });

        filter.forEach(item => {
            if (item.classList.contains(activeClass)){
                item.classList.remove(activeClass);
            }
        });
    }

    function showTabContent(i = 0) {
        filter[i].classList.add(activeClass);
        let activeClassName = filter[i].className;
        console.log(portfolioNoClasses);

        if (activeClassName.replace(/\s.*/, '').indexOf(portfolioNoClasses) != -1) {
            portfolioNoBlock.style.display = 'block';
        } else {
            portfolioNoBlock.style.display = 'none';
            filterContent.forEach(item => {
                if (item.classList.contains(activeClassName.replace(/\s.*/, ''))){
                    item.style.display = 'block';
                }
            });
        }
    }

    hideTabContent();
    showTabContent();

    filterParent.addEventListener('click', function(event) {

        const target = event.target;
        if (target){
            event.preventDefault();
        }
        if (target) {
            filter.forEach((item, i) => {
                if ((target == item) || (target.parentElement == item)) {
                    hideTabContent();
                    showTabContent(i);
                }
                
            });
        }

    });

}

export default filter;