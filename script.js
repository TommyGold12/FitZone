//* 1. LOGIN/LOGOUT COOKIES FUNCTION 
// kreiranje funckije koja poziva metode s kojima ćemo diseablati ponovnu registraciju ako je korisnik trenutno logiran
let session = new Session();
session = session.getSession();
// ako postoji cookies, prebaciti će nas na novu stranicu
// kod isti/sličan kao i u user.js, ali ovaj kod se aktivira nakon refresha stranice, bez njega, nakon refresha bi se sve resetiralo u vratilo u početno stanje
// u script.js dohvaćamo sesiju, dok u user.js startamo sesiju
const loginBtn = document.querySelector('#navLogin');
const logoutBtn = document.querySelector('#navLogout');
const workoutBtn = document.querySelector('#createPlan');
const changeNav = function () {
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
    workoutBtn.style.display = 'inline-block';
}
if (session !== '') {
    changeNav();
}

const destroyLogin = function () {
    loginBtn.style.display = 'inline-block';
    logoutBtn.style.display = 'none';

    let session = new Session();
    session = session.destroySession();
    window.location.reload();
}
logoutBtn.addEventListener('click', destroyLogin);



const headerInfo = document.querySelector('.headerInfo');
const headerImg = document.querySelector('.header');
const images = ['url(img/fitback11.jpg)', 'url(img/fitback22.jpg)'];
const counterCustomers = document.querySelector('.customers');
const counterBodies = document.querySelector('.bodies');
const counterHours = document.querySelector('.hours');
const counterStories = document.querySelector('.stories');
const test = document.querySelector('.customers span');
const bmiHeight = document.querySelector('#height');
const bmiWeight = document.querySelector('#weight');
const bmiButton = document.querySelector('#calculate');
const bmiResults = document.querySelector('#bmiResults');
const bmiArrow = document.querySelector('#arrow');
const login = document.querySelector('#navLogin');
const openLoginOverlay = document.querySelector('.loginOverlay');
const closeLoginOverlay = document.querySelector('.closeOverlay');
const createAccount = document.querySelector('#createAccount');
const loginWindow = document.querySelector('.loginWindow');
const registerWindow = document.querySelector('.registerWindow');




/*
//*LOAD ON TOP/
window.addEventListener('load', function (e) {
    this.document.querySelector('body').scrollIntoView({
        behavior: 'smooth',
    })
})
*/

//* 2.PRELOAD IMAGES/
const preload = function (e) {
    headerImg.style.backgroundImage = images[1];
    headerImg.style.opacity = 0;
}
preload(images)


//* 3.IMAGES SLIDESHOW/
let imgCounter = 0;
const backImg = function (el) {
    headerInfo.classList.add('hide');
    headerImg.style.backgroundImage = images[imgCounter];
    headerImg.style.opacity = 1;

    if (imgCounter < images.length - 1) {
        headerInfo.classList.remove('hide');
        imgCounter++;
        headerInfo.innerHTML = `<h1>Challenge</h1>
                                <h1>Yourself</h1>
                                <p>Get your own body fit</p>`;
    }
    else {
        headerInfo.classList.remove('hide');
        imgCounter = 0;
        headerInfo.innerHTML = `<h1>Fuel your</h1>
                                <h1>body with fitness</h1>
                                <p>Be one of us</p>`
    }
    setTimeout('backImg()', 5000)
}
setTimeout(backImg)


//* 4.NAVLINKS SCROLLING/
document.querySelectorAll('.links a').forEach(function (all) {
    all.addEventListener('click', function (e) {
        e.preventDefault()
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
        });
    })
})



//* 5.ACTIVE TABED LINKS/
document.querySelectorAll('.links a').forEach(function (all) {
    all.addEventListener('click', function (e) {
        //remove active class
        document.querySelectorAll('.links a').forEach(function (active) {
            if (active.classList.contains('activeLink')) {
                active.classList.remove('activeLink')
            }
        })
        //add active class
        e.target.classList.add('activeLink');
    })
})


//* 6.USERS COUNTER/
const startCounter = function () {
    let a = 0;
    let b = 0;
    let c = 0;
    let d = 0;
    const counterA = function () {
        a = a + 10;
        counterCustomers.innerHTML = `<span>${a}</span>
                                    <p>Happy Customers</p>`
        if (a >= 5000) clearInterval(intervalA)
    }
    const counterB = function () {
        b = b + 10;
        counterBodies.innerHTML = `<span>${b}</span>
                                <p>Perfect Bodies</p>`
        if (b >= 4560) clearInterval(intervalB)
    }
    const counterC = function () {
        c++;
        counterHours.innerHTML = `<span>${c}</span>
                                <p>Working Hours</p>`
        if (c >= 570) clearInterval(intervalC)
    }
    const counterD = function () {
        d = d + 2;
        counterStories.innerHTML = `<span>${d}</span>
                                <p>Success Stories</p>`
        if (d >= 910) clearInterval(intervalD)
    }


    const intervalA = setInterval(counterA, 2)
    const intervalB = setInterval(counterB, 3)
    const intervalC = setInterval(counterC, 1)
    const intervalD = setInterval(counterD, 3)
}

//* 7. START COUNTER ON SCROLL/
let interCounter = 0
const hidden = document.querySelector('.counter')

// odabrali smo element sa prvog polja iz entries elementa
const counter = function (entries) {
    const entry = entries[0]
    if (interCounter <= 1 && entry.isIntersecting) {
        startCounter()
    }
    interCounter++
}

const counterOptions = {
    root: null,
    treshold: 0.1,
    rootMargin: - 90 + 'px'
}

const observer = new IntersectionObserver(counter, counterOptions)
observer.observe(hidden);



let columnCounter = 0;
//* 8.REVEALING ITEMS ON SCROLL/
const eachColumn = document.querySelectorAll('.fitnessColumn');
const firstColumn = document.querySelector('.fitnessColumn')
const columnHeight = firstColumn.getBoundingClientRect().height;

// pozivanje funkcije za dodijeljivanje atributa svakom elementu
const reveal = function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fitnessReveal')
        }
    })
}

// svojstva InterserctionObserver metode
const obsOptions = {
    root: null,
    treshold: 0.1,
    rootMargin: `-${columnHeight}px`
}

// kreiranje intersectionObserver metode
const observerReveal = new IntersectionObserver(reveal, obsOptions);
// pozivanje observerReveal funkcije za svaki red html elementa
eachColumn.forEach(el => observerReveal.observe(el))

//* 8.1 REVEALING ITEM ON SCROLL/
const row = document.querySelectorAll('.row');
const firstRow = document.querySelector('.row')
const rowHeight = firstRow.getBoundingClientRect().height;
console.log(rowHeight)

const reveal2 = function (entries) {
    entries.forEach(entry => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('rowReveal')
        }
    })
};

const obsOptions2 = {
    root: null,
    treshold: 0.1,
    rootMargin: `${rowHeight}px`
}

const observerReveal2 = new IntersectionObserver(reveal2, obsOptions2);
row.forEach(el => observerReveal2.observe(el));





//* 9.BMI CALCULATOR/
const loadValue = () => {
    bmiHeight.nextElementSibling.innerHTML = bmiHeight.value + ` cm`;
    bmiWeight.nextElementSibling.innerHTML = bmiWeight.value + ` kg`;
}
loadValue()

//
const bmiValueHeight = function (e) {
    e.nextElementSibling.innerHTML = e.value + ` cm`;
}
bmiHeight.addEventListener('input', () => bmiValueHeight(bmiHeight));

const bmiValueWeight = function (e) {
    e.nextElementSibling.innerHTML = e.value + ` kg`;
}
bmiWeight.addEventListener('input', () => bmiValueWeight(bmiWeight));

const calculateBMI = function (h, w) {
    //BMI = weight(kg) / (height(m) * height(m))
    //underweight <18.5
    //normal 18.5-24.9
    //overweight 25-29.9
    //obese >30 
    //cm to m
    h = Number(h.value) / 100;
    w = Number(w.value);
    const bmiFormula = w / (Math.pow(h, 2));
    bmiResults.innerHTML = parseFloat(bmiFormula).toFixed(1);
    multiplier(bmiFormula)
}
bmiButton.addEventListener('click', (e) => {
    e.preventDefault()
    calculateBMI(bmiHeight, bmiWeight)
})


const multiplier = function (e) {
    let multiplicator;
    let angle;
    if (e < 18.5) {
        multiplicator = 44 / 18.5
        angle = parseFloat(e * multiplicator).toFixed(1);
    }
    if (e >= 18.5 && e < 24.9) {
        multiplicator = 90 / 24.9
        angle = parseFloat(e * multiplicator).toFixed(1);
    }
    if (e >= 25 && e <= 29.9) {
        multiplicator = 136 / 29.9
        angle = parseFloat(e * multiplicator).toFixed(1);
    }
    if (e >= 30 && e <= 35) {
        multiplicator = 180 / 35
        angle = parseFloat(e * multiplicator).toFixed(1);
    }
    if (e > 35) {
        angle = 180;
    }
    arrowAngle(angle);
}

const arrowAngle = function (e) {
    let angle = parseInt(e);
    bmiArrow.style.transform = `rotate(${angle}deg)`;
}


//* 10.RESPONSIVE HAMBURGER MENU/
const hambIcon = document.querySelector('.hamburgerIcon');
const hambLinks = document.querySelector('.links');


const hambMenu = function (all) {
    const style = getComputedStyle(all).display;
    if (style == 'none') {
        all.style.display = 'block'
    }
    else {
        all.style.display = null;
    }
}
hambIcon.addEventListener('click', call => hambMenu(hambLinks))

window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        hambLinks.style.display = null;
    }

})

//* 11.LOGIN FORM
const loginOpen = () => {
    window.onscroll = function () {
        // window.scrollTo(0, 0);
    }
    openLoginOverlay.style.display = 'flex';
}
login.addEventListener('click', loginOpen);


const loginClose = () => {
    openLoginOverlay.style.display = 'none';
    loginWindow.style.display = 'block';
    registerWindow.style.display = 'none';
    window.onscroll = function () { }
}
closeLoginOverlay.addEventListener('click', loginClose);


const registerOpen = () => {
    loginWindow.style.display = 'none';
    registerWindow.style.display = 'block';
}
createAccount.addEventListener('click', registerOpen);


const navline = document.querySelector('.navline');
const navHeight = navline.getBoundingClientRect().height;
const header = document.querySelector('.header .container');


//* 12.INTERSECTED NAVLINE
const stickyNav = function (entries) {
    const [entry] = entries; // const entries = entries[0],
    if (!entry.isIntersecting) {
        navline.classList.add('positionFixed');
    }
    else {
        navline.classList.remove('positionFixed');
    }
}

const obsOptions3 = {
    root: null,
    treshold: 0,
    //rootMargin: `${-navHeight}px`,
}

const observer3 = new IntersectionObserver(stickyNav, obsOptions3);
observer3.observe(header)

/*
const currentPosition = function () {
    console.log(window.scrollY)
}
window.addEventListener('scroll', currentPosition)
*/
/*
//* 12.VALIDATION REGISTRATION FORM
const inputs = document.querySelectorAll('.registerWindow input');

const errors = {
    'user_name': [],
    'user_username': [],
    'user_email': [],
    'user_password': [],
    'user_confirmPassword': [],
}

inputs.forEach(function (element) {
    element.addEventListener('change', function (each) {
        let currentInput = each.target;
        let inputValue = currentInput.value;
        let inputName = currentInput.getAttribute('name')

        if (inputValue.length > 4) {
            errors[inputName] = [];

            switch (inputName) {
                case 'user_name':
                    let validation = inputValue.trim();
                    validation = validation.split(' ');
                    if (validation.length < 2) {
                        errors[inputName].push('Morate unijeti ime i prezime.');
                    }
                    break;

                case 'user_email':
                    if (!validateEmail(inputValue)) {
                        errors[inputName].push('Neispravna email adresa');
                        console.log('neispravna email adresa')
                    }
                    break;

                case 'user_confirmPassword':
                    let password = document.querySelector(`input[name = 'user_password']`).value;
                    if (inputValue !== password) {
                        errors[inputName].push('Unesite identične lozinke.');
                    }
                    break;
            }
        }

        else {
            errors[inputName] = ['Polje ne može imati manje od 5 znakova'];
        }
        writeErrors(errors);
    })
})

const writeErrors = function (errors) {
    for (let element of document.querySelectorAll('ul')) {
        element.remove();
    }

    for (const key of Object.keys(errors)) {
        let input = document.querySelector(`input[name = '${key}']`);
        let parentElement = input.parentElement;
        let errorElement = document.createElement('ul');
        parentElement.appendChild(errorElement);

        errors[key].forEach((error) => {
            let li = document.createElement('li');
            li.innerText = error;
            errorElement.appendChild(li);
        })
    }
}

const validateEmail = function (email) {
    //REGEX- validacija email-a
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        return true;

    }
    else false;
}
*/
//* 13. VALIDATION USER DATA
let config = {
    'user_name': {
        required: true,
        minLength: 3,
        maxLength: 25,
    },
    'user_username': {
        required: true,
        minLength: 3,
        maxLength: 25,
    },
    'user_email': {
        required: true,
        email: true,
        minLength: 5,
        maxLength: 50,
    },
    'user_password': {
        required: true,
        minLength: 7,
        maxLength: 25,
        matching: 'user_confirmPassword',
    },
    'user_confirmPassword': {
        required: true,
        minLength: 7,
        maxLength: 25,
        matching: 'user_password',
    },
};
let validator = new Validator(config);


//* 14.VALIDATION PASSED
document.querySelector('#registrationForm').addEventListener('submit', e => {
    e.preventDefault()

    if (validator.validationPassed()) {
        let user = new User();
        user.username = document.querySelector('#user_username').value;
        user.email = document.querySelector('#user_email').value;
        user.password = document.querySelector('#user_password').value;
        //metoda iz user.js
        user.create();
    }
    else {
        alert('nije ok')
    }
})

document.querySelector('#loginForm').addEventListener('submit', e => {
    e.preventDefault();
    const email = document.querySelector('#loginEmail').value;
    const password = document.querySelector('#loginPassword').value;

    let user = new User();
    user.email = email;
    user.password = password;
    user.login();
})


const createWorkoutPlan = function () {
    window.location.href = 'hexa.html';
}
workoutBtn.addEventListener('click', createWorkoutPlan);
