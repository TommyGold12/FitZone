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

//*LOAD ON TOP/
/*
window.addEventListener('load', function (e) {
    this.document.querySelector('body').scrollIntoView({
        behavior: 'smooth',
    })
})
*/
//* 1.PRELOAD IMAGES/
const preload = function (e) {
    headerImg.style.backgroundImage = images[1];
    headerImg.style.opacity = 0;
}
preload(images)


//* 2.IMAGES SLIDESHOW/
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
                                <h1>body fitness</h1>
                                <p>Be one of us</p>`
    }
    setTimeout('backImg()', 5000)
}
setTimeout(backImg)


//* 3.NAVLINKS SCROLLING/
document.querySelectorAll('.links a').forEach(function (all) {
    all.addEventListener('click', function (e) {
        e.preventDefault()
        const id = e.target.getAttribute('href');
        console.log
        document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
        });
    })
})



//* 4.ACTIVE TABED LINKS/
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


//* 5.USERS COUNTER/
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


    const intervalA = setInterval(counterA, 5)
    const intervalB = setInterval(counterB, 6)
    const intervalC = setInterval(counterC, 5)
    const intervalD = setInterval(counterD, 6)
}

//* 6. START COUNTER ON SCROLL/
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
//* 7.REVEALING ITEMS ON SCROLL/
const eachColumn = document.querySelectorAll('.fitnessColumn');
const firstColumn = document.querySelector('.fitnessColumn')
const columnHeight = firstColumn.getBoundingClientRect().height;

// pozivanje funkcije za dodijeljivanje atributa svakom elementu
const reveal = function (entries) {
    entries.forEach(entry => {
        console.log('vidkjivo')
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

//* 7.1 REVEALING ITEM ON SCROLL/
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





//* 8.BMI CALCULATOR/
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


//* 9.RESPONSIVE HAMBURGER MENU/
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




