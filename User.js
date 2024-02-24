class User {
    user_id = '';
    username = '';
    email = '';
    password = '';
    api_url = 'https://6564e24fceac41c0761ef9f9.mockapi.io';


    create() {
        let data = {
            username: this.username,
            email: this.email,
            password: this.password,
        }
        //pretvaranje objekta u JSON string
        data = JSON.stringify(data)

        //pomoću fetch methode slanje podataka na mock.api
        fetch(this.api_url + '/Users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data,
        })
            .then(response => response.json())
            .then(data => {
                // ovdje unašamo putanju do stranice gdje korisnika želimo preusmjeriti
                // widnow.location.href = 'index.html(npr)'
                // koristiti ćemo cookies da bi sačuvali informaciju da je netko registriran i uklonili button login
                // u script.js također imamo window.location, ali on se aktivira tek nakon refresha stranice, a dok ovdje odmah nakon uspješne registracije
                let overlay = document.querySelector('.loginOverlay');
                overlay.style.display = 'none';
                changeNav();

                // COOKIES
                let session = new Session();
                session.user_id = data.id;
                session.startSession();
            })
    }

    // Učitavanje svih korisnika iz baze podataka
    login() {
        fetch(this.api_url + '/Users')
            .then(response => response.json())
            .then(data => {

                let login_successeful = 0;
                data.forEach(db_user => {
                    if (db_user.email === this.email && db_user.password === this.password) {

                        let session = new Session();
                        session.user_id = db_user.id;
                        session.startSession();
                        login_successeful = 1;
                        let overlay = document.querySelector('.loginOverlay');
                        overlay.style.display = 'none';
                        changeNav();
                    }
                })
                if (login_successeful === 0) {
                    alert('Korisnik ne postoji.');
                }
            })
    }
}