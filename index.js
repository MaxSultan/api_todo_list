let state = {
    list: [],
    original: [],
    date: d = new Date()
};

function showDate(){
    const { date } = state
    document.getElementById("date").innerHTML = date;
};

function showTodo(item){
        return `
        <div id='card' class='${item.completed}' onclick='toggleComplete(this)'>
            <strong id='num'>${item.id}</strong>   ${item.title}
            <i class="fa fa-circle-thin "></i>
        </div>
        `  
};

function toggleComplete(item){
   console.log(item.children[0])
   if (item.className === 'false'){
       item.className = 'true';
   } else {
       item.className = 'false'
   }
}

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