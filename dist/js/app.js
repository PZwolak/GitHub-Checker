/*! project-name v0.0.1 | (c) 2019 YOUR NAME | MIT License | http://link-to-your-git-repo.com */
console.log('Git file');



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
    searchUsers('PZwolak').then((res) => {
        console.log(res);
    })
    searchRepo('PZwolak').then((res) => {
        console.log(res);
    })
}

showData();