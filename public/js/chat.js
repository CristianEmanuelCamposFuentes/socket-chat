
const username = localStorage.getItem('name');
if (!username) {
  // Llevar al root de la aplicacion
  window.location.replace = '/';
  throw new Error('Username is required');
}

const socket = io({
  auth: {
    token: 'ABC-123',
    name: username,
  },
});

// Listeners
socket.on('connect', () => {
  console.log('Conectado');
});

socket.on('disconnect', () => {
  console.log('Desconectado');
});
