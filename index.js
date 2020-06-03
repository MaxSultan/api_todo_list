let state = {
    list: [],
    original: [],
    date: d = new Date()
};

function showDate(){
    const { date } = state
    document.getElementById("date").innerHTML = date;
};

function render(){
    showDate();
};

render();
