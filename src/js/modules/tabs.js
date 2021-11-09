const tabs = (tabsSelector, tabsContentSelector, tabsParentSelector, activeClass, display = 'block') => {
        let tabs = document.querySelectorAll(tabsSelector),
            tabsContent = document.querySelectorAll(tabsContentSelector),
            tabsParent = document.querySelector(tabsParentSelector);
    function hideTabContent() {
        
        tabsContent.forEach(item => {
            item.style.display = 'none';
        });

        tabs.forEach(item => {
            if (item.classList.contains(...activeClass)){
                item.classList.remove(...activeClass);
            }
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].style.display = display;
        tabs[i].classList.add(...activeClass);
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', function(event) {

        const target = event.target;
        if (target){
            event.preventDefault();
        }
        if (target && (target.classList.contains(tabsSelector.replace(/\./, '')) || 
            target.parentElement.classList.contains(tabsSelector.replace(/\./, ''))) 
            ) {
            tabs.forEach((item, i) => {
                if ((target == item) || (target.parentElement == item)) {
                    hideTabContent();
                    showTabContent(i);
                }
                

            });
            }

    });


};

export default tabs;