

// На странице post-details.html:
// 7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .
// 8 Нижчє інформаці про пост, вивести всі коментарі поточного поста (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)

const postId = localStorage.getItem('postId')

const id = localStorage.getItem('id')


const urlPost = new URL('https://jsonplaceholder.typicode.com/posts')
urlPost.searchParams.set('id', id)

const urlComments = new URL('https://jsonplaceholder.typicode.com/comments')
urlComments.searchParams.set('postId', postId);

const infoPost = document.getElementById('post-details');

 async function commentsOfPost () {

     const divPost = document.createElement('div')
     divPost.classList.add('infoPost')

     const post = await fetch(urlPost)
         .then((response) => response.json())
     for (const item of post) {
         const p1 = document.createElement('p')
         p1.innerText = `userId: ${item.userId}`;
         const p2 = document.createElement('p')
         p2.innerText = `id: ${item.id}`;
         const p3 = document.createElement('p')
         p3.innerText = `title:
                         ${item.title}`
         const p4 = document.createElement('p')
         p4.innerText = `body: 
                        ${item.body}`

        divPost.append(p1, p2, p3, p4)
     }

     const title = document.createElement('h2')
     title.innerText = `Comments`


    const divComments = document.createElement('div')
     divComments.classList.add('info')
    const comments = await fetch(urlComments)
        .then((response) => response.json())
     for (const comment of comments) {
         const commentInfo = document.createElement('div')
         commentInfo.classList.add('comment')

         const p1 = document.createElement('p')
         p1.innerText = `userId: ${comment.postId}`;
         const p2 = document.createElement('p')
         p2.innerText = `id: ${comment.id}`;
         const p3 = document.createElement('p')
         p3.innerText = `email: 
                        ${comment.email}`
         const p4 = document.createElement('p')
         p4.innerText = `name:
                         ${comment.name}`
         const p5 = document.createElement('p')
         p5.innerText = `body: 
                        ${comment.body}`

        commentInfo.append(p1, p2, p3, p4, p5)
         divComments.appendChild(commentInfo)
     }
     infoPost.append(divPost, title, divComments)
}
commentsOfPost()