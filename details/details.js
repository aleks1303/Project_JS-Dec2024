
const userInfo = document.getElementById('details');

const userJS = JSON.parse(localStorage.getItem('user'));
// localStorage.removeItem('user');
let urlPosts = new URL('https://jsonplaceholder.typicode.com/posts');
urlPosts.searchParams.set('userId', userJS)
let urlUser = new URL('https://jsonplaceholder.typicode.com/users')
urlUser.searchParams.set('id', userJS)


async function detailsOfUser() {
    const users = await fetch(urlUser)
        .then((response) => response.json());
    for (const user of users) {
        const divUser = document.createElement('div');
        divUser.classList.add('divUser');
        const id = document.createElement('h2');
        id.innerText = `id: ${user.id}`
        const name = document.createElement('h1');
        name.innerText = `${user.name}  ${user.username}`
        const info = document.createElement('div');
        info.classList.add('infoAll')

        const contacts = document.createElement('div');
        contacts.classList.add('contacts')
        const titleContacts = document.createElement('h3');
        titleContacts.innerText = `Contacts: `
        contacts.appendChild(titleContacts);

        const infoContacts = document.createElement('p')
        infoContacts.innerText = ` - phone: ${user.phone}
                                   - email: ${user.email}
                                   - website: ${user.website}`

        contacts.appendChild(infoContacts)

        const address = document.createElement('div');
        address.classList.add('address')
        const titleField = document.createElement('h3');
        titleField.innerText = 'Address: '
        address.appendChild(titleField);
        const geo = user.address.geo
        const ul = document.createElement('ul');
        const listGeo = document.createElement('p');
        listGeo.innerText = ' - geo:'
        ul.appendChild(listGeo)
        if (typeof (user.address) === 'object') {
            for (const item in user.address) {
                if (item !== 'geo') {
                    const p = document.createElement('p')
                    p.innerText = ` - ${item}: ${user.address[item]}`
                    address.append(p)
                } else {
                    for (const geoKey in geo) {
                        const li = document.createElement('li');
                        li.classList.add('geo')
                        li.innerText = `${geoKey} ${geo[geoKey]}`
                        ul.append(li)
                    }
                }
            } address.appendChild(ul)
        }
        contacts.append(address)

        const company = document.createElement('div');
        const titleCompany = document.createElement('h3');
        titleCompany.classList.add('titleCompany')
        titleCompany.innerText = 'Company: '
        company.appendChild(titleCompany)
        company.classList.add('company')
        for (const companyKey in user.company) {
            const infoCompany = document.createElement('p');
            infoCompany.classList.add('infoCompany')
            infoCompany.innerText = ` - ${companyKey} :  ${user.company[companyKey]}`
            company.appendChild(infoCompany)
        }


        const blockOfTitle = document.getElementById('title');
        const blockStyle = document.getElementById('styleBlock')
        const posts = await fetch(urlPosts)
            .then((response) => response.json())
        for (const user of users) {
            user.posts = []
            for (const post of posts) {
                if (user.id === post.userId) {
                    user.posts.push(post)
                }
                const block = document.createElement('div')
                block.classList.add('block')
                const title = document.createElement('h5');
                title.innerText = `${post.title}`
                const btnTitle = document.createElement('button')
                btnTitle.innerText = `post info`

                btnTitle.onclick = function () {
                    window.open('../comments/post-details.html');
                    localStorage.setItem('postId', post.id)
                    localStorage.setItem('id', post.id)
                }
                blockStyle.append(block)
                block.append(title, btnTitle)
                blockOfTitle.appendChild(blockStyle)
            }
        }
        const buttonPost = document.createElement('button');
        buttonPost.classList.add('btnPost');
        buttonPost.innerText = 'post of current user';
        buttonPost.onclick = function () {
            blockOfTitle.classList.toggle('hidden')

        }
        info.append(contacts, company)
        divUser.append(id, name)
        userInfo.append(divUser, info, buttonPost, blockOfTitle)
    }
}

detailsOfUser()

