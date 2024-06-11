const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

let tabFocus = 0;

tabList.addEventListener('keydown', changeTabFocus)

tabs.forEach((tab) => {
    tab.addEventListener('click', changeTabPanel)
})

function changeTabFocus(e) {
    const keydownLeft = 37;
    const keydownRight = 39;

    // change the tabindex of the current tab to -1
    if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
        tabs[tabFocus].setAttribute('tabindex', -1)
    }

    if (e.keyCode === keydownRight) {

        tabFocus++

        if (tabFocus >= tabs.length) {
            tabFocus = 0
        }
    }

    else {
        if (tabFocus === 0) {
            tabFocus = tabs.length
        }
        tabFocus--

    }

    tabs[tabFocus].setAttribute("tabindex", 0);
    tabs[tabFocus].focus();
}

function changeTabPanel(e) {
    const targetTab = e.target;
    const targetPanel = targetTab.getAttribute('aria-controls')
    const tabContainer = targetTab.parentNode
    const mainContainer = tabContainer.parentNode

    changeImage(targetTab)
    changeContent(mainContainer, targetPanel)

    tabContainer.querySelector('[aria-selected="true"]').setAttribute("aria-selected", false)
    targetTab.setAttribute('aria-selected', true)
}

function changeImage(targetImg) {
    document.querySelectorAll('picture')
        .forEach((img) => {
            img.classList.add('hidden')
            img.getAttribute('id') === targetImg.getAttribute('data-image')
                && img.classList.remove('hidden')
        })
}

function changeContent(container, target) {
    document.querySelectorAll('[role=tabpanel]')
        .forEach((art) => {
            art.setAttribute('hidden', true)
        })
    container.querySelector([`#${target}`]).removeAttribute('hidden')

}