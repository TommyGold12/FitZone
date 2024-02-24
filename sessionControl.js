class Session {
    user_id = '';

    // stvaranje sesije
    startSession() {
        const d = new Date();
        d.setTime(d.getTime() + (2 * 24 * 60 * 60 * 1000));
        let expires = 'expires=' + d.toUTCString();
        document.cookie = 'user_id=' + this.user_id + ';' + expires;
    }


    // dohvaćanje sesije
    getSession() {
        let name = 'user_id=';
        let ca = document.cookie.split(';');

        // petlja za prolazak kroz cookie da bi otkrili da li taj cookie postoji
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    }


    // uništavanje sesije na logout button
    destroySession() {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            let eqPos = cookie.indexOf('=');
            let name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
            // stari expire date, tako se uništava cookie
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
        }
    }
}