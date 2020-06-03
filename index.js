let state = {
    list: [],
    original: [],
    date: d = new Date(),
    check: 'fa fa-check-circle',
    unchecked: 'fa fa-circle-o'
};

function showDate(){
    const { date } = state
    document.getElementById("date").innerHTML = date;
};

function showTodo(item){

    let iconClass = ''
    if (item.completed){
        iconClass ='fa fa-check-circle'
    }else {
        iconClass ='fa fa-circle-o'
    };
        return `
        <div id='card' class='${item.completed}' onclick='toggleComplete(this)'>
        <i class='${iconClass}'></i>
            <strong id='num'>${item.id}</strong>   
            ${item.title}
        </div>
        `  
};

function toggleComplete(item){
   if (item.className === 'false'){
       item.className = 'true';
       item.childNodes[1].className = state.check;
   } else {
        item.className = 'false';
        item.childNodes[1].className = state.unchecked;
   }
};

function showTodos(){
    const { list } = state;
    return list.reduce((acc, item) => {
        return acc + showTodo(item);
    }, '')
};

function getTodos(){
    axios.get('https://jsonplaceholder.typicode.com/todos')
    .then((result) => {
        state.list = result.data;
        state.original = result.data;
        render();
    })
    .catch(e => console.log(x))
};

function renderHTML(id, item){
    document.getElementById(id).innerHTML = item;
};

function filterComplete(){
    const { list } = state;
    const filtered = list.filter(item => item.completed === true)
    state.list = filtered;
    render();
}

function sortByTitle(){
    const { list } = state;
    list.sort((a,b) => {
        if (a.title[0] > b.title[0]){
            return 1;
        } else if (a.title[0] < b.title[0]){
            return -1;
        }else {
            return 0;
        } 
    })
    render();
}

function filterIncomplete(){
    const { list } = state;
    const incomplete = list.filter(item => item.completed === false)
    state.list = incomplete;
    render();
}

function reset(){
    const { original } = state;
    state.list = original;
    render();
}

function render(){
    showDate();
    renderHTML('main',showTodos());
};

render();