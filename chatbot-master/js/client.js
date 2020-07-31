const socket = io('http://localhost:7000');

//get dome element in javascript varible 
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

//audio will play on receiving messages
var audio = new Audio('whistle.mp3');

const append = (message,position) => {
    const messageElement = document.createElement('div')
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position =='left'){
    audio.play();
    }
}

//Ask new user for join let the server know
 const name = prompt("Enter Your Name to join");
socket.emit('new-user-joined',name)

//if the new user join receive the event from server
socket.on('user-joined', name =>{
    append(`${name} joined the chat`,'right');
})

//if server send a message receive it
socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`,'left');
})


//if a user leave a chat append the info to container
socket.on('left', name =>{
    append(`${name}: left the chat`,'right');
})

//if the form gets submitted send server the message

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send',message);
    messageInput.value = '';
})