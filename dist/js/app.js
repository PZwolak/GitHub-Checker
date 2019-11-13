/*! GitHub checker v0.0.1 | (c) 2019 Patryk Zwolak | MIT License | https://github.com/PZwolak/GitHub-Checker */
const findUserBtn = document.querySelector('.main-type-button');
const findUserInp = document.querySelector('#inp');
const resultUserName = document.querySelector('.git-checker__main-result-user-name');
const resultUserNick = document.querySelector('.git-checker__main-result-user-nick');
const resultUserRepoQuantity = document.querySelector('.git-checker__main-result-user-repo-quantity');
const resultRepos = document.querySelector('.git-checker__main-result-repos');

const client_id = "Iv1.268cfe02718c9950";
const client_secret = "233cbfa1d72224313bde475febd35a3daeaf3db7";

const searchUsers = async (user) => {
    const api_connect = await fetch(`https://api.github.com/users/${user}?client_id=${client_id}&client_secret=${client_secret}`);


    const userInfo = await api_connect.json();
    return userInfo;

};

const searchRepo = async (user) => {
    const repo_connect = await fetch(`https://api.github.com/users/${user}/repos?client_id=${client_id}&client_secret=${client_secret}`);

    const userRepo = await repo_connect.json();
    return userRepo;
}
const showData = () => {
    searchUsers(findUserInp.value).then((res) => {
        console.log(res);
        resultUserName.innerHTML = `<p>name: <span>${res.name}</span></p>`;
        resultUserNick.innerHTML = `<p>login: <span>${res.login}</span></p>`;
        resultUserRepoQuantity.innerHTML = `<p>Repos: <span>${res.public_repos}</span></p>`;
    })
    searchRepo(findUserInp.value).then((res) => {
        console.log(res);
        const quantity = res.length;

        const reposTitle = document.createElement('div');
        reposTitle.classList.add('git-checker__main-result-repos-title');
        reposTitle.innerHTML = `<p>Repos: </p>`
        resultRepos.appendChild(reposTitle);

        const names = res.map((el) => {

            resultRepos.innerHTML += (
                `asd`
            )
            return el.name;
        });



        console.log(quantity);
        console.log(names);
    })
}





findUserBtn.addEventListener('click', () => {
    showData();
});