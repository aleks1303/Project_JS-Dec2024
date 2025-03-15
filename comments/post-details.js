const postId = localStorage.getItem('postId')
const id = localStorage.getItem('id')

const urlPost = new URL('https://jsonplaceholder.typicode.com/posts')
urlPost.searchParams.set('id', id)

const urlComments = new URL('https://jsonplaceholder.typicode.com/comments')
urlComments.searchParams.set('postId', postId);

const infoPost = document.getElementById('post-details');


function createParagraph(text) {
    const p = document.createElement('p');
    p.innerText = text;
    return p;
}
async function commentsOfPost() {
    const divPost = document.createElement('div')
    divPost.classList.add('infoPost');


    const post = await fetch(urlPost)
        .then((response) => response.json())
    for (const item of post) {
        divPost.append(
            createParagraph(`userId: ${item.userId}`),
            createParagraph(`id: ${item.id}`),
            createParagraph(`title:
                                    ${item.title}`),
            createParagraph(`body: 
                                    ${item.body}`),
        )
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
        commentInfo.append(
            createParagraph(`userId: ${comment.postId}`),
            createParagraph(`id: ${comment.id}`),
            createParagraph(`email:
                                  ${comment.email}`),
            createParagraph(`name:
                                  ${comment.name}`),
            createParagraph(`body:
                                  ${comment.body}`)
        )
        divComments.appendChild(commentInfo)
    }
    infoPost.append(divPost, title, divComments)
}
commentsOfPost()
