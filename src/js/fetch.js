 const  email = document.querySelector('#login'),
        password = document.querySelector('#password'),
        signIn = document.querySelector('#check');

class Fetch {
    constructor(){
            this.url = {
                login: 'https://ajax.test-danit.com/api/v2/cards/login',
                cards: 'https://ajax.test-danit.com/api/v2/cards'
            }
        }
        saveToken(token){
        localStorage.setItem('tokenData', JSON.stringify(token))
        }

    async changeFetch(id='',value){
        const response = await fetch(`${this.url.cards}/${id}`,{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.tokenData.split('\"')[1]}`
            },
            body: JSON.stringify(value),
        });
        const data = await response.json();
        return data;
    }

    async getToken (email, password){
            const response = await fetch(this.url.login,{
                method: "POST",
                headers: {
                    "Content-type":"application/json",
                },
                body: JSON.stringify({
                    'email': email,
                    'password': password,
                })
            });
            if(response.status === 200){
                const data = await response.text();
                console.log(data);
                this.saveToken(data);
                return data
            }else return false
        }

     async createFetch (value){
            const response = await fetch(this.url.cards,{
                method: 'POST',
                headers: {
                    "Content-type":"application/json",
                    'Authorization': ` Bearer ${localStorage.tokenData.split('\"')[1]}`
                },
                body: JSON.stringify(value)
            });
             const data = await response.text();
             console.log(data);
             return data;
     }

     async takeFetch(id=''){
            const response = await fetch(`${this.url.cards}/${id}`,{
                method: "GET",
                headers: {
                    "Content-type":"application/json",
                    'Authorization': ` Bearer ${localStorage.tokenData.split('\"')[1]}`
                }
            });
         const data = await response.json();
         console.log(data);
         return data
     }

    async deleteFetch (id){
            const response = await fetch(`https://ajax.test-danit.com/api/cards/${id}`,{
                method: 'DELETE',
                headers:{
                    'Authorization': ` Bearer ${localStorage.tokenData.split('\"')[1]}`
                }
            });
        const data = await response.text();
        if(!data.length) {
            return true;
        }
        return false;
    }
 }

 const server = new Fetch();
 signIn.addEventListener('click', function (e) {
     e.preventDefault();
 });
