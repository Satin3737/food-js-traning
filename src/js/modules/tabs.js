function tabs(tabBtnSelector, tabContentSelector, activeClass) {
    // tabs variables
    const tabBtn = document.querySelectorAll(tabBtnSelector);
    const tabContent = document.querySelectorAll(tabContentSelector);

    // tabs listeners
    tabBtn.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            changeActiveTab([tabBtn, tabContent], i)
        });
    });

    // tabs function
    function changeActiveTab(arrays, i) {
        arrays.forEach(arr => {
            arr.forEach(item => {
                item.classList.remove(activeClass);
            });
            arr[i].classList.add(activeClass);
        });
    }
}

export default tabs;

