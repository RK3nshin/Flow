const menuMob = document.getElementById("menu_mobile")
const btn = document.getElementById("btn_menu")

menuMob.addEventListener('click', openMenu)

function openMenu() {
    menuMob.classList.toggle('open')
    btn.classList.toggle('on')
}