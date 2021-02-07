const API = 'https://raw.githubusercontent.com/ereminmaksim/J2-from-the-company-GeekBrains/API/apiJsons/';

const app = new Vue({
    el: '#app',
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },

        //метод добавления


        postJson(url, data) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                });
        },


        //метод удаления

        putJson(url, data) {
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                });
        },
        deleteJson(url) {
            return fetch(url, {
                method: 'DELETE',
            }).then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                });
        },
    },

    mounted() {
        console.log(this);
    }
});

