const username = localStorage.getItem('name');
if (!username) {
  // Llevar al root de la aplicacion
  window.location.replace = '/';
  throw new Error('Username is required');
}

// Referencias HTML
const lblStatusOnline = document.querySelector('#status-online');
const lblStatusOffline = document.querySelector('#status-offline');

const usersUlElement = document.querySelector('ul');

const renderUsers = (users) => {
  usersUlElement.innerHTML = '';
  users.forEach((user) => {
    const liElement = document.createElement('li');
    liElement.innerText = user.name;
    usersUlElement.appendChild(liElement);
  });
};

const socket = io({
  auth: {
    token: 'ABC-123',
    name: username,
  },
});

// Listeners
socket.on('connect', () => {
  lblStatusOnline.classList.remove('hidden');
  lblStatusOffline.classList.add('hidden');
});

socket.on('disconnect', () => {
  lblStatusOnline.classList.add('hidden');
  lblStatusOffline.classList.remove('hidden');
});

socket.on('welcome-message', (data) => {
  console.log(data);
});

socket.on('on-clients-changed', renderUsers);
