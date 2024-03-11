class Post {
    user_id = '';
    day_content = '';
    exercise_content = '';
    sets_content = '';
    reps_content = '';
    api_url = 'https://6564e24fceac41c0761ef9f9.mockapi.io';

    async create() {
        let session = new Session();
        session_id = session.getSession();
        //polja iz mockAPI-ja
        let data = {
            user_id: session_id,
            day: this.day_content,
            exercise: this.exercise_content,
            sets: this.sets_content,
            reps: this.reps_content,
        }


        // pretvaranje data u JSON format
        data = JSON.stringify(data);
        let response = await fetch(this.api_url + '/Plan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });

        data = await response.json();
        return data;
    }

    async getAllPosts() {
        let response = await fetch(this.api_url + '/Plan');
        let data = await response.json();
        return data;
    }


    deletePosts(post_id) {
        fetch(this.api_url + '/Plan/' + post_id, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => { });
    }
}

