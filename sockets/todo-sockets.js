module.exports = function(io){
    io.on('connection', function(socket){
        //Socket Routes
        socket.on('new-todo', function(data){
            io.emit('emit-todo', data);
        })

        socket.on('update-todo', function(data){
            io.emit('emit-update', data);
        })

        socket.on('delete-todo', function(data){
            io.emit('emit-new', data);
        })

        console.log('connected');
    })
}