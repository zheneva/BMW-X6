const menuElem = document.querySelector('.menu');

const humburgerElem = document.querySelector('.humburger-menu');

const toggleMenu = () => {
    menuElem.classList.toggle('menu-active');
    humburgerElem.classList.toggle('humburger-menu-active');
}


humburgerElem.addEventListener('click', toggleMenu);

menuElem.addEventListener('click', (elem) => {
    const target = elem.target;

    if (target.classList.contains('menu-list__link')) toggleMenu();
})