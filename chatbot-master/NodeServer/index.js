// Thos is node server Node server which will handle socket io
// if new user is joined then socket.io fire

const io = require('socket.io')(7000)

const users = {};

io.on('connection', socket =>{
    socket.on('new-user-joined',name => {
        // console.log('New User', name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name)
    });

    //if someone send the message,it call to other people
    socket.on('send', message => {
        socket.broadcast.emit('receive',{message: message, name: users[socket.id]})
    });

   // if someone leave the chat let other know
    socket.on('disconnect', message => {
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
});