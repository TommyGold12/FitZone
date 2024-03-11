let session = new Session();
let session_id = session.getSession();

//asinkrona funkcija je funkcija kod koje se kod ne zaustavlja, nego se nastavlja dalje izvršavati iako neka linija koda nije izvršena do kraja
if (session_id !== '') {
    async function userData() {
        let user = new User();
        user = await user.get(session_id);
        document.querySelector('#username_inner').innerHTML = 'Username: ' + user['username'];
    }
    userData()

    /*
        // moramo napraviti asinkronu funkciju koja je povezana sa User.js
        // bez te funkcije, JS kada se učitava ne ispunjava username jer ne dođe do njega sa svim podacima i vraća null
        document.querySelector('#username_inner').innerHTML = 'Username: ' + data['username'];
        */
}
else {
    window.location.href = '/';
}

// fields to store input value from user
let exercise_field = [];
let sets_field = [];
let reps_field = [];
let dayCounter = 0;
let elementsLength = 0;
let inputPostLength = 0;
// Kreiranje objave na stranici
document.querySelector('.createPost').addEventListener('click', e => {
    e.preventDefault();
    async function CreatePost() {
        //* ukoliko želimo bez for of petlje, samo iz zagrada izvadimo let post pa do post= await
        //* ostale varijable deklariramo samo sa querySelector

        //*WRITE POST ON SITE
        // elements from looping throught exercise row element
        let elements = document.querySelectorAll('.exercise');
        //looping throught all elemenets from the input and creating a block of value for each of them
        for (const move of elements) {
            let day = document.querySelector('#days').value;
            let exercise = move.querySelector('.exer').value;
            console.log(exercise)
            let sets = move.querySelector('.sets').value;
            let reps = move.querySelector('.reps').value;
            exercise_field.push(exercise);
            console.log(exercise_field)
            sets_field.push(sets);
            reps_field.push(reps);

            // write value to class Post.js
            // call function wrapper to manipulate with DOM element
            if (dayCounter < 1) {
                outputHeader(day)
                dayCounter++;
            }
            //* ---> Call Another Function <---
            valueToZero(move);

            //select last row and input the file
            outputExercise(exercise, sets, reps)

            // ako je brojač dostigao maksimalnu duljinu polja, poziva se varijabla let post = new Post();
            elementsLength++;
            if (elementsLength === elements.length) {
                let post = new Post();
                post.day_content = day;
                post.exercise_content = exercise_field;
                post.sets_content = sets_field;
                post.reps_content = reps_field;
                post = await post.create();
                createDeleteButton(post.id);
                exercise_field = [];
                sets_field = [];
                reps_field = [];
                dayCounter = 0;
                elementsLength = 0;
            };
        }

        // current user ID for function of delete if we want create global community for communicate
        let currentUser = new User();
        currentUser = await currentUser.get(session_id)
    }
    CreatePost();
});


//* REPEATING LINES OF CODE
const valueToZero = function (move) {
    move.querySelector('.exer').value = '';
    move.querySelector('.sets').value = '';
    move.querySelector('.reps').value = '';
}

const outputHeader = day => {
    let newRow = document.createElement('div');
    newRow.classList.add('flex_row');
    newRow.innerHTML += `<div class="wrapper_day">${day[0].toUpperCase() + day.slice(1)}</div>`;
    document.querySelector('.wrapper').appendChild(newRow);
}

const outputExercise = (exercise, sets, reps) => {
    let el = document.querySelectorAll('.flex_row');
    let last_row = el[el.length - 1];
    last_row.innerHTML += `<div class="wrapper_exercise">
                                <div>${exercise}</div> x 
                                <div>${sets} set</div> x
                                <div>${reps} rep</div>
                            </div>`;
}


//* CREATE A NEW ROW OF INPUT ELEMENTS
const divGrid = document.querySelector('.exercises');
const addExercise = e => {
    e.preventDefault();
    const div = document.createElement('div');
    div.classList.add('exercise');
    div.innerHTML = `       <input type="text" placeholder="exercise:" class="exer">
                            <input type="number" placeholder="sets:" class="sets">
                            <input type="number" placeholder="reps" class="reps">
                            <button class='remove' onClick="remove(this)">-</button>
                    `;
    divGrid.appendChild(div);
}
document.querySelector('.add').addEventListener('click', addExercise);


const remove = function (e) {
    event.preventDefault();
    let closest = e.closest('.exercise');
    closest.remove();
}



//* DELETE ROW OF ELEMENT
const createDeleteButton = e => {
    let el = document.querySelectorAll('.flex_row');
    let div = el[el.length - 1];
    div.innerHTML += `<div class="deletePost">
                        <button class="deleteButton" onClick = "deletePost(this)" data-post_id = ${e}>Delete post</button>
                     </div>`;
}


const deletePost = (btn) => {
    let post_id = btn.getAttribute('data-post_id');
    btn.closest('.flex_row').remove();
    let post = new Post();
    post.deletePosts(post_id)
}



//* FUNKCIJA ZA ISPIS SVIH KREIRANIH OBJAVA OD KORISNIKA
// uzeli sko pomoću new User funkcije trenutni ID korisnika i usporedili ga sa upisanim ID-em korisnika u Klasu post
// ako se ID-evi podudaraju, ispisuju se kreirani elementi samo od tog korisnika
let outputCounter = 0;
let postLength = 0;
async function getAllPost() {
    let currentUser = new User();
    currentUser = await currentUser.get(session_id);

    let all_posts = new Post();
    all_posts = await all_posts.getAllPosts();
    all_posts.forEach(function (e) {
        console.log(all_posts)
        if (currentUser.id === e.user_id) {
            outputHeader(e.day)
            while (postLength < e.exercise.length) {
                console.log(e.exercise.length)
                outputExercise(e.exercise[outputCounter], e.sets[outputCounter], e.reps[outputCounter])
                postLength++;
                outputCounter++;
            }
            if (e.exercise.length) {
                createDeleteButton(e.id);
            }
            postLength = 0;
            outputCounter = 0;
        }
    });
}
getAllPost()

//* RETURN TO HOME PAGE
document.querySelector('.returnHome').addEventListener('click', function (e) {
    window.location.href = 'index.html'
})



