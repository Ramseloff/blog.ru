/*function CheckboxCollection(checkboxes) {
    this.checkboxes = checkboxes ? "nodeType" in checkboxes ? [checkboxes] : Array.prototype.slice.call(checkboxes) : [];
}


CheckboxCollection.prototype.collectValues = function () {
    var i = this.checkboxes.length, buffer = [];
    while (i--) {
        if (this.checkboxes[i].checked) {
            buffer.push(this.checkboxes[i].value);
        }
    }
    return buffer;
};



*/

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
                <button class="btn btn-primary" onclick="updateArticle(${article.article_id})">edit</button>
                <button class="btn btn-primary" onclick="deleteArticle(${article.article_id})">delete</button>
            </div>
        `
    });
};


async function updateArticle(id) {
    console.log(id);
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    let body = {
        "title": title,
        "content": content
    };

    console.log(body);
    let url = 'http://localhost:8082/api.blog.ru/article/update/' + id;
    const res = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(body)
    });

    const data = await res.json();

    if (data.status === true) {
        await getArticles();
    };
};

async function deleteArticle(id) {
    console.log(id);

    let url = 'http://localhost:8082/api.blog.ru/article/delete/' + id;
    const res = await fetch(url, {
        method: 'DELETE',
    });

    const data = await res.json();

    if (data.status === true) {
        await getArticles();
    };
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
    function getCheckedCheckBoxes() {
        var checkboxes = document.getElementsByClassName('check');
        var checkboxesChecked = []; // можно в массиве их хранить, если нужно использовать 
        var tag = '';
        for (var index = 0; index < checkboxes.length; index++) {
            if (checkboxes[index].checked) {
                checkboxesChecked.push(checkboxes[index].value); // положим в массив выбранный
                tag += checkboxes[index].value + '&';
                // console.log(tag);
            }
        }
        return tag; // для использования в нужном месте
    }
    let tag = getCheckedCheckBoxes();
    //let tags = new CheckboxCollection();
    /*const tag1 = document.getElementById('tag1').value;
    const tag2 = document.getElementById('tag2').value;
    const tag3 = document.getElementById('tag3').value;*/
   /* tags.checkboxes.push(tag1);
    tags.checkboxes.push(tag2);
    tags.checkboxes.push(tag3);
    console.log(tags);
    tags = JSON.stringify(tags);
    console.log(tags);*/
    //let tag = tag1 + '&' + tag2 + '&' + tag3;

    console.log(tag);

    if (tag === '') {
        await getArticles();
    } else {
       
        let url = 'http://localhost:8082/api.blog.ru/articles/tag/' + tag;
        // console.log(url);
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
    };
};

getArticles();
