async function getArticles() {
    let res = await fetch('http://localhost:8082/api.blog.ru/articles');
    let articles = await res.json();

    document.querySelector('.post-list').innerHTML = '';

    articles.forEach((article) => {
        document.querySelector('.post-list').innerHTML += `
        <div class="card" style="width: 18rem">
                <div class="card-body">
                    <h5 class="card-title">${article.article_title}</h5>
                    <p class="card-text">${article.article_content}</p>
                    <a href="#" class="card-link">Podrobnee</a>
                </div>
            </div>
        `
    });
};

async function addArticle() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    let formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);

    const res = await fetch('http://localhost:8082/api.blog.ru/articles/create', {
        method: 'POST',
        body: formData
    });

    const data = await res.json();

    if (data.status === true) {
        await getArticles();
    };
};

async function getArticlesTag() {
    const tag = document.getElementById('tag').value;
    if (tag === '') {
        await getArticles();
    } else {
        console.log(tag);
        let url = 'http://localhost:8082/api.blog.ru/articles/' + tag + '/tag';
        console.log(url);
        let res = await fetch(url);
        let articles = await res.json();

        document.querySelector('.post-list').innerHTML = '';

        articles.forEach((article) => {
            document.querySelector('.post-list').innerHTML += `
        <div class="card" style="width: 18rem">
                <div class="card-body">
                    <h5 class="card-title">${article.article_title}</h5>
                    <p class="card-text">${article.article_content}</p>
                    <a href="#" class="card-link">Podrobnee</a>
                </div>
            </div>
        `
        });
    }
};

getArticles();
