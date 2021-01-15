console.log('This is My Note app.');
//this function will use to show previous notes after loading the page.
showNotes();

// If user click on add note button, then it will store the note in localStorage and call the function showNotes()
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function(e){

    let addTitle = document.getElementById('addTitle');
    let addTxt = document.getElementById('addTxt');
    let message = document.getElementById('message');

    //if note is empty and press add note button, then give a alert
    if(addTitle.value == ""){
        message.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                                <strong>Holy guacamole!</strong> You should check in on some of those fields below.
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>`;
      setTimeout( () =>{
        message.innerHTML = "";
      }, 2000);
    }

    if(addTxt.value == ""){
        return alert('This is empty note !! Try to write something useful');
    }

    let notes = localStorage.getItem('notes');
    let notesObj;

    //if there is no note available then create a empty array, else parse the note string into array.
    if(notes == null){
        notesObj = [];
    }
    else{
        // Parse: make an array from a string(localStorage can't store array so we store it as string)
        notesObj = JSON.parse(notes); 
    }

    // add the note in notes array, and then update localStorage.
    let note = {
        Title: addTitle.value,
        Note : addTxt.value
    };

    notesObj.push(note);
    localStorage.setItem('notes', JSON.stringify(notesObj));

    // after presssing add note button, our textarea(where we write note) should be blank as before.
    addTxt.value = "";
    addTitle.value = "";
    showNotes();
})

// this function show our notes
function showNotes(){
    let notes = localStorage.getItem('notes');
    let notesObj;

    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes); 
    }

    let addNote = "";

    notesObj.forEach((element, index) => {

        addNote += `
        <div class="noteCard m-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${element.Title !== "" ? element.Title : `Note ` + (index+1)} </h5>
                    <p class="card-text">${element.Note}</p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
            </div>`
    });

    let notesEle = document.getElementById('notes');
    if(notesObj.length != 0){
        notesEle.innerHTML = addNote;
    }
    else{
        notesEle.innerHTML = `You haven't add any note yet. Try to to add some note using above section and then press "Add Note" button.`
    }
    
}

// this function will delete note, and show remaining notes.
function deleteNote(index){
    let notes = localStorage.getItem('notes');
    let notesObj;

    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes); 
    }
    // splice will remove element from index, here splice(index from where it should be remove, howmany element shoudl be remove)
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById('searchTxt');

search.addEventListener('input', function(){

    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');

    Array.from(noteCards).forEach(element => {
        let cardTitle = element.getElementsByTagName('h5')[0].innerText.toLowerCase();
        let cardTxt = element.getElementsByTagName('p')[0].innerText.toLowerCase();

        if(cardTxt.includes(inputVal) || cardTitle.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })
})
/*
further features

1. add title // This is done
2. add important tag for the notes
3. sync and host with web server

*/