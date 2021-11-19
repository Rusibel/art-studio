function filter(filterSelector, filterContentSelector, filterParentSelector, activeClass, ...portfolioNoClasses){
    const filter = document.querySelectorAll(filterSelector),
          filterContent = document.querySelectorAll(filterContentSelector),
          filterParent = document.querySelector(filterParentSelector),
          portfolioNoBlock = document.querySelector('.portfolio-no'),
          no = portfolioNoClasses;

    function hideTabContent() {

        portfolioNoBlock.style.display = 'none';
        // portfolioNoBlock.classList.remove('animated', 'zoomIn');
        // portfolioNoBlock.classList.add('animated', 'zoomOut');
        
        filterContent.forEach(item => {
            
            // item.classList.remove('animated', 'zoomIn');
            // item.classList.add('animated', 'zoomOut');
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
        let activeClassName = filter[i].className.replace(/\s.*/, '');
 
        if (no.some(elem => elem == activeClassName)) {
            portfolioNoBlock.style.display = 'block';
            // portfolioNoBlock.classList.remove('animated', 'zoomOut');
            portfolioNoBlock.classList.add('animated', 'zoomIn');
        } else {
            portfolioNoBlock.style.display = 'none';
            filterContent.forEach(item => {
                if (item.classList.contains(activeClassName)){
                    item.style.display = 'block';
                    // item.classList.remove('animated', 'zoomOut');
                    item.classList.add('animated', 'zoomIn');
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
        if (target && target.tagName == "LI") {
            filter.forEach((item, i) => {
                if ((target == item) || (target.parentElement == item)) {
                    hideTabContent();
                    // setTimeout(() => {
                        showTabContent(i);
                    // }, 0);
                }
                
            });
        }

    });

}

export default filter;