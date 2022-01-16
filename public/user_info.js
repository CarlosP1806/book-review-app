import { getToken, loggedIn } from './auth.js';

async function render() {
    if(!loggedIn()) {
        document.location.href = '/';
        return;
    }
    const userData = await getUserData();
    console.log(userData);

    const welcomeTitle = document.createElement('h2');
    welcomeTitle.textContent = userData.username;
    const dashboard = document.querySelector('.user-dashboard');
    dashboard.append(welcomeTitle);
}

async function getUserData() {
    const token = loggedIn() ? getToken() : null;
    let response = await fetch('user/me', {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        },
    });
    response = await response.json();
    return response;
}

render();