const chatBox = document.getElementById('chat-box');
const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message');

const socket = new WebSocket('ws://localhost:3000'); // Change to your server URL

socket.onopen = () => {
    console.log('WebSocket connection established');
};

socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    displayMessage(message.text, 'chatgpt');
};

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    displayMessage(message, 'user');
    socket.send(JSON.stringify({ text: message }));
    messageInput.value = '';
});

function displayMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(sender);
    messageDiv.textContent = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
}
