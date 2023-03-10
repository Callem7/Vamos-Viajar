async function getPosts() {
    return await fetch('http://localhost:3000/posts')
        .then((response) => response.json())
        .then((data) => data);
}

let callMeForm = document.querySelector('.call-me-form');

document.addEventListener('DOMContentLoaded', async function() {
    let posts = await getPosts();
    let articles = document.querySelector('.landmarks');
    articles.innerHTML = '';                             //limpa tudo o que esta dentro da tabla
    posts.forEach((post) => {
        let postHTML = `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card">
                    <img src="${post.imageURL}" class="card-img-top" alt="${post.title}">
                    <div class="card-body">
                        <h5 class="card-title">${post.title}</h5>
                        <p class="card-text">${post.description}</p>
                        <a href="/landmark?id=${post.id}" class="btn btn-primary">Detalhes</a>
                    </div>
                </div>
            </div>
        `;
        articles.insertAdjacentHTML('beforeend', postHTML);
    })
})

callMeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let phoneInput = callMeForm.querySelector('input');
    fetch('http://localhost:3000/callback-requests', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            phoneNumber: phoneInput.value
        })
    }).then((resp) => resp.text()).then(() => alert('Iremos chamar o mais rápido possivel!'));
})

let emailRequestForm = document.querySelector('.email-request-form');

emailRequestForm.addEventListener('submit', function(e) {
    e.preventDefault();
    fetch('http://localhost:3000/emails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: document.querySelector('#name').value,
            email: document.querySelector('#email').value,
            text: document.querySelector('#message').value
        })
    }).then((resp) => resp.text()).then((data) => console.log(data));
})