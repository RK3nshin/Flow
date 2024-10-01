// --- Projeto FlowMap Kanban ---
// PARTICIPANTES:
// Alexandre Vieira Gonçalves
// Guilbert Wilkerson Marques Oliveira

const menuMob = document.getElementById("menu_mobile")
const btn = document.getElementById("btn_menu")

// Adiciona um evento de clique ao menu, que chama a função openMenu
menuMob.addEventListener('click', openMenu)

// Função para adicionar a classe "open" no menuMob, e "on" no btn
function openMenu() {
    menuMob.classList.toggle('open')
    btn.classList.toggle('on')
}