
const username = localStorage.getItem('name');
if (!username) {
  // Llevar al root de la aplicacion
  window.location.replace = '/';
  throw new Error('Username is required');
}

// Referencias HTML
const lblStatusOnline = document.querySelector('#status-online');
const lblStatusOffline = document.querySelector('#status-offline');


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
