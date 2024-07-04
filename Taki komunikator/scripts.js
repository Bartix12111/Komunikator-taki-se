document.addEventListener('DOMContentLoaded', function() {
    const messageForm = document.getElementById('messageForm');
    const messageList = document.getElementById('messageEntries');

    // Load messages from LocalStorage
    loadMessages();

    messageForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const message = document.getElementById('message').value;

        addMessage(name, message);
        saveMessage(name, message);
        messageForm.reset();
    });

    function addMessage(name, message) {
        const currentDate = new Date();
        const timestamp = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
        
        const newMessageEntry = document.createElement('li');
        newMessageEntry.innerHTML = `
            <div>
                <strong>${name}</strong> 
                <span class="timestamp">${timestamp}</span>
            </div>
            <p>${message}</p>
            <button class="delete-btn">Usuń</button>
        `;
        messageList.prepend(newMessageEntry);

        // Dodajemy obsługę zdarzenia kliknięcia na przycisku "Usuń"
        const deleteButton = newMessageEntry.querySelector('.delete-btn');
        deleteButton.addEventListener('click', function() {
            deleteMessage(newMessageEntry);
        });
    }

    function saveMessage(name, message) {
        const currentDate = new Date();
        const timestamp = currentDate.getTime();
        let messages = getMessagesFromStorage();
        messages.unshift({ name, message, timestamp });
        localStorage.setItem('messages', JSON.stringify(messages));
    }

    function loadMessages() {
        const messages = getMessagesFromStorage();
        messages.forEach(message => addMessage(message.name, message.message));
    }

    function getMessagesFromStorage() {
        const messages = localStorage.getItem('messages');
        return messages ? JSON.parse(messages) : [];
    }

    function deleteMessage(messageItem) {
        const messageText = messageItem.querySelector('p').textContent;
        let messages = getMessagesFromStorage();
        messages = messages.filter(message => !(message.name === messageItem.querySelector('strong').textContent && message.message === messageText));
        localStorage.setItem('messages', JSON.stringify(messages));
        messageItem.remove();
    }
});
