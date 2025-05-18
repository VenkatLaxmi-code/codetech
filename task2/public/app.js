document.addEventListener('DOMContentLoaded', () => {
    const socket = io('http://localhost:5000'); // Connect to the Socket.IO server

    // DOM Elements
    const messageInput = document.getElementById('message');
    const sendMessageButton = document.getElementById('sendMessage');
    const usernameInput = document.getElementById('username');
    const messagesContainer = document.getElementById('messages');

    // Check if the button is correctly selected and log it
    console.log(sendMessageButton);

    // Function to display messages in the UI
    function displayMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.textContent = `${message.user}: ${message.text}`;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to the bottom
    }

    // Listen for 'receive_message' event and display the message
    socket.on('receive_message', (msg) => {
        displayMessage(msg);
    });

    // Send message when button is clicked
    sendMessageButton.addEventListener('click', () => {
        const messageText = messageInput.value.trim();
        const username = usernameInput.value.trim();

        // Log button click to the console to confirm the listener is working
        console.log("Button clicked!");

        if (messageText && username) {
            const msgData = {
                user: username,
                text: messageText
            };
            socket.emit('send_message', msgData);  // Send the message to the server
            displayMessage(msgData);  // Display the message locally
            messageInput.value = '';  // Clear the message input field
        } else {
            console.log("Message or username is empty!");
        }
    });
});
