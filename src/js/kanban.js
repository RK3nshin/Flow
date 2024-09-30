
const dicColumn = {
    0: 'Fazer',
    1: 'Progresso',
    2: 'Finalizado'
}


const $task = document.getElementById('task-container');
const $nameTaskHeader = document.getElementById('task-config-title');
const $createButton = document.getElementById('btn-create');
const $settingsButton = document.getElementById('btn-setting');


const $title = document.getElementById('title');
const $description = document.getElementById('description');
const $priority = document.getElementById('priority');
const $date = document.getElementById('date');
const $idInput = document.getElementById('idInput');
const $columnName = document.getElementById('columnName');


const $cardFazerContainer = document.querySelector('#Fazer .cards-container');
const $cardProgressoContainer = document.querySelector('#Progresso .cards-container');
const $cardFinalizadoContainer = document.querySelector('#Finalizado .cards-container');

let listColumn = [];
Object.values(dicColumn).forEach(columnName => {
    listColumn[columnName] = [];
});


let cardColumnName = "";


function openTaskCreate(ColumnName) {
    $nameTaskHeader.innerHTML = "<span id='task-config-title'>Nova Tarefa</span>";
    $settingsButton.style.display = 'none';
    $createButton.style.display = 'block';
    $task.style.display = "flex";
    cardColumnName = ColumnName; // Enquanto a configuração está aberta esse valor é igual ao nome da coluna

}
function openTaskSettings(id, column) {

    $nameTaskHeader.innerHTML = "<span id='task-config-title'>Editar Tarefa</span>";
    $settingsButton.style.display = 'block';
    $createButton.style.display = 'none';
    $task.style.display = "flex";
    taskcurrent = listColumn[column].find(task => task.id == id);
    $description.value = taskcurrent.description;
    $title.value = taskcurrent.title;
    $date.value = taskcurrent.deadline;
    $priority.value = taskcurrent.priority;
    $idInput.value = taskcurrent.id;
    $columnName.value = taskcurrent.column;


}
function updateTask() {
    const task = {
        id: $idInput.value,
        column: $columnName.value,
        title: $title.value,
        description: $description.value,
        priority: $priority.value,
        deadline: $date.value
    }

    const taskcurrent = listColumn[task.column].find(task => task.id === $idInput.value);
    listColumn[task.column].pop(taskcurrent);
    listColumn[task.column].push(task);

    closeTaskConfig();
    generateCards(task.column);


}
function closeTaskConfig() {
    cardColumnName = "";
    $task.style.display = "none";
    $title.value = "";
    $description.value = "";
    $priority.value = "Baixa";
    $date.value = "";

}
function generateHTMLCard(columnName) {

    const htmlCard = listColumn[columnName].map((task) => {
        const formattedDate = moment(task.deadline).format('DD/MM/YYYY');
        return `
            <div class="cards" 
            id="${task.id}-${columnName}"
            ondblclick="openTaskSettings(${task.id}, '${columnName}')"
            draggable="true" ondragstart="dragstartHandler(event)">
                <div class="info">
                    <b> Título </b>
                    <span>${task.title} </span>
                </div>
                <div class="info">
                    <b> Prioridade </b>
                    <span>${task.priority} </span>
                </div>
                <div class="info">
                    <b> Data Limite </b>
                    <span>${formattedDate} </span>
                </div>
            </div>`;
    }).join("");

    return htmlCard;

}

function generateCards(columnName) {
    const htmlCard = generateHTMLCard(columnName);
    switch (columnName) {
        case 'Fazer':
            $cardFazerContainer.innerHTML = htmlCard;
            break;
        case 'Progresso':
            $cardProgressoContainer.innerHTML = htmlCard;
            break;
        case 'Finalizado':
            $cardFinalizadoContainer.innerHTML = htmlCard;
            break;
    }
}


function newTask() {
        const task = {
            id: Math.floor(Math.random() * 1000000),
            title: $title.value,
            description: $description.value,
            priority: $priority.value,
            deadline: $date.value
        }
    
        task.column = cardColumnName;
    
        listColumn[task.column].push(task);
    
        generateCards(task.column);
    
    
        closeTaskConfig()
    
   

}



function dragstartHandler(ev) {
    ev.dataTransfer.setData("application/my-app", ev.target.id);
    ev.dataTransfer.effectAllowed = "move";
}
function dragoverHandler(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
}
function dropHandler(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("application/my-app").split('-');  // id -colunaOrigem
    const id = data[0];
    const columnOrigem = data[1];
    const colunaDestino = ev.target.dataset.column;
    move(id, columnOrigem, dicColumn[colunaDestino]);



}

function move(id, columnOrigem, colunaDestino) {
    console.log(colunaDestino, columnOrigem)
    if (id && columnOrigem && colunaDestino) {
        task = listColumn[columnOrigem].map(t => t.id = id);
        if (task != null) {
            if (columnOrigem != colunaDestino) {
                listColumn[columnOrigem].pop(task);
                listColumn[colunaDestino].push(task);
                task.column = colunaDestino;
            }
        }
        generateCards(columnOrigem);
        generateCards(task.column);
    }

}