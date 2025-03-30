 const socket = io("http://localhost:8000");

 //connection of socket from client 
 socket.on('connect', (response) => {
    console.log('socket connect on client');
 });

 //dom init
 let button = document.getElementById('send_button')
 let ed = document.getElementById('input_name')
 let ed2 = document.getElementById('input_message')
 let messages_p = document.getElementById('messages_p');

 //send request for joining room
 const current_room = 1;
 socket.emit('joinRoom', current_room);

 //click event, when clicking we send room and message
 button.addEventListener('click', (ev) => {
   socket.emit('sendmessage', {room: current_room,name: ed.value,
    msg: ed2.value});
 });

 //here we wait for server back for the sent message and add it to text
 socket.on('message', (obj) => {
  messages_p.textContent = Object.values(obj);
})

 
