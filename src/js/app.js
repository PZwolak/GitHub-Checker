//Select basic element
const findUserBtn = document.querySelector('.main-type-button');
const findUserInp = document.querySelector('#inp');
const resultUserName = document.querySelector('.git-checker__main-result-user-name');
const resultUserNick = document.querySelector('.git-checker__main-result-user-nick');
const resultUserRepoQuantity = document.querySelector('.git-checker__main-result-user-repo-quantity');
const resultRepos = document.querySelector('.git-checker__main-result-repos');
const pagContainer = document.querySelector('.git-checker__main-result-pagination');

//GitHub client autorization
const client_id = "Iv1.268cfe02718c9950";
const client_secret = "233cbfa1d72224313bde475febd35a3daeaf3db7";

//Function searching with API basics information about user
const searchUsers = async (user) => {
    const api_connect = await fetch(`https://api.github.com/users/${user}?client_id=${client_id}&client_secret=${client_secret}`);
    const userInfo = await api_connect.json();
    return userInfo;
};

//Function searching with API information about repos
const searchRepo = async (user, page = 1) => {
    const repo_connect = await fetch(`https://api.github.com/users/${user}/repos?client_id=${client_id}&client_secret=${client_secret}&page=${page}`);
    const userRepo = await repo_connect.json();
    return userRepo;
}


// Create user animation
const createUserAnimation = () => {
    resultUserName.classList.add('disabled');
    resultUserNick.classList.add('disabled');
    resultUserRepoQuantity.classList.add('disabled');

    setTimeout(function () {
        resultUserName.classList.remove('disabled');
    }, 100)
    setTimeout(function () {
        resultUserNick.classList.remove('disabled');
    }, 200)
    setTimeout(function () {
        resultUserRepoQuantity.classList.remove('disabled');
    }, 300)
}

//Add to HTML user info
const createUser = (res) => {
    createUserAnimation();
    resultUserName.innerHTML = `<p>name: <span>${res.name}</span></p>`;
    resultUserNick.innerHTML = `<p>login: <span>${res.login}</span></p>`;
    resultUserRepoQuantity.innerHTML = `<p>Repos: <span>${res.public_repos}</span></p>`;
}

//Create repo animation
const createRepoAnimation = () => {
    resultRepos.classList.add('disabled');

    setTimeout(function () {
        resultRepos.classList.remove('disabled');
    }, 400)
}

//Adding to HTML user repos
const createRepo = (res) => {
    createRepoAnimation();
    const reposTitle = document.createElement('div');
    resultRepos.innerHTML = '';
    reposTitle.classList.add('git-checker__main-result-repos-title');
    reposTitle.innerHTML = `<p>Repos: </p>`
    resultRepos.appendChild(reposTitle);
    res.map((el) => {
        resultRepos.innerHTML += (
            `<div class="container">
            <div class="git-checker__main-result-repos-element row">
            <div class="git-checker__main-result-repos-element-name col-12 col-md-2"><p><span>${el.name}</span></p></div>
            <div class="git-checker__main-result-repos-element-id col-6 col-sm-4 col-md-2"><p><span class="icon id"></span>ID: <span>${el.id}</span></p></div>
            <div class="git-checker__main-result-repos-element-access col-6 col-sm-4 col-md-2"><p><span class="icon private"></span>Private: <span>${el.private}</span></p></div>
            <div class="git-checker__main-result-repos-element-stars col-6 col-sm-4 col-md-2"><p><span class="icon stars"></span>Stars: <span>${el.stargazers_count}</span></p></div>
            <div class="git-checker__main-result-repos-element-forks col-6 col-sm-4 col-md-2"><p><span class="icon forks"></span>Forks: <span>${el.forks_count}</span></p></div>
            <div class="git-checker__main-result-repos-element-watchers col-6 col-sm-4 col-md-2"><p><span class="icon watchers"></span>Watchers <span>${el.watchers}</span></p></div>
            </div>
            </div>
            `
        )
    });
}

//Add to HTML pagination
const createPag = (res) => {
    const pag = Math.ceil(res.public_repos / 30);
    pagContainer.innerHTML = '';

    for (i = 1; i < pag + 1; i++) {
        pagContainer.innerHTML += (
            `<span class='pagination-element' data-val="${i}">${i}</span>`
        )
    }

    const pagContainerEl = document.querySelectorAll('.git-checker__main-result-pagination span');
    pagContainerEl[0].classList.add('active');
    pagContainerEl.forEach((el) => {
        el.addEventListener('click', () => {
            pagContainerEl.forEach((removepag) => {
                removepag.classList.remove('active');
            })
            el.classList.add('active');
            searchRepo(findUserInp.value, el.dataset.val).then((res) => {
                createRepo(res);
            })
        })
    })

}


// Calling function
const showData = () => {
    searchUsers(findUserInp.value).then((res) => {
        createUser(res);
        createPag(res);
    })
    searchRepo(findUserInp.value).then((res) => {
        createRepo(res);
    })
}

// Linsten on button (Find user) click 
findUserBtn.addEventListener('click', () => {
    showData();
});

//Listen on key press (enter) input
findUserInp.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
        showData();
    }
});