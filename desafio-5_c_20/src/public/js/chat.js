const socket = io();
const chatForm = document.querySelector('#sendMessage');
const chatbox = document.querySelector('#messages');

socket.on('messages', (all) => {
  let messages = '';

  all.forEach((log) => {
    messages = messages + `<p><b>${log.user}</b>: ${log.message}</p>`;
  });

  chatbox.innerHTML = messages;
});

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = {
    user: document.getElementById('user').value,
    message: document.getElementById('message').value,
  };

  socket.emit('new_msg', data);

  document.getElementById('message').value = '';
});

// // ------- Socket
// socket.on("connected", (data) => {
//     alert('conectadp')
// })

// socket.on("messages", data => {
//     let chatbox = document.getElementById("messages");
//     let messages = ''

//     if(data.length == 0){
//         messages = 'Empty chatroom'
//     }else{
//         data.forEach((message) => {
//             messages = messages + `<p><span>${message.user}</span>: ${message.message}</p>`
//     })}

//     chatbox.innerHTML = messages;
// });

// chatForm.addEventListener('submit', (e) => {
//     e.preventDefault();

//     const data = {
//         user: document.getElementById("user"),
//         message: document.getElementById("message")
//     }

//     socket.emit('new_msg', data)
// })
