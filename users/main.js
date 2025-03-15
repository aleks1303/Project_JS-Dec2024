
const blockUsers = document.getElementById('users')

fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then(users => {
        for (const user of users) {
            const div = document.createElement('div')
            div.classList.add('user')
            const id = document.createElement('h3');
            id.classList.add('id')
            id.innerText = `id: ${user.id}`

            const name = document.createElement('h2');
            name.innerText = `name: ${user.name}`

            const button = document.createElement('button');
            button.innerText = `details`
            button.classList.add('btn')

            button.onclick = function () {
                localStorage.setItem('user', JSON.stringify(user.id));
                window.open("../details/details.html", 'blank');
            }

            div.append(id, name, button)
            blockUsers.appendChild(div)
        }
    });