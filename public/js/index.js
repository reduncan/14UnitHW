const socket = io();

//Render Functions
const create = function (data) {
    const listItem = $(`<li>`);
    const description = $(`<h2 class="text">${data.todo}`);
    const xmark = $('<i class="far fa-circle">');

    listItem.append(description, xmark);
    complete(xmark);

    description.text(data.todo);
    xmark.attr('data-id', data.id);
    xmark.attr('data-status', data.complete);

    $('#todolist').append(listItem);
}

//Gets todos from DB
const loadTodos = function () {
    const queryURL = window.location.origin + "/api/todo";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done((data) => {
        $('#todolist').empty();
        data.forEach((element) => {
            const listItem = $(`<li>`);
            const description = $(`<h2 class="text ${element.complete}">${element.todo}`);
            if (element.complete === true) {
                xmark = $('<i class="far fa-times-circle">');
            } else {
                xmark = $('<i class="far fa-circle">');
            };

            listItem.append(description, xmark);
            complete(xmark);

            description.text(element.todo);
            xmark.attr('data-id', element.id);
            xmark.attr('data-status', element.complete);

            $('#todolist').append(listItem);
        })
    })
};

loadTodos();

//Post new todo to db and renders to the page
$(function () {
    $('#submit').on('click', function (event) {
        event.preventDefault();
        const newTodo = {
            todo: $('#todo').val().trim(),
            complete: false
        };

        if (newTodo.todo === '') {
            alert('To-Do Item Required');
            return;
        };

        $.ajax({
            url: "/api/todo",
            method: "POST",
            data: newTodo
        })
            .then(function (data) {
                socket.emit('new-todo', data);
                $('#todo').val('');
                $('#todo').focus();
            });
    });
});

socket.on('emit-todo', function (data) {
    create(data);
});

//Chages the state of the checkbox
const toggleCheckbox = function (element) {
    if ($(element).hasClass('far fa-circle')) {
        $(element).removeClass('far fa-circle');
        $(element).addClass('far fa-times-circle');
    } else {
        $(element).removeClass('far fa-times-circle');
        $(element).addClass('far fa-circle');
    };
};

const complete = function (item) {
    $(item).on('click', function () {
        toggleCheckbox(this);
        let id = $(this).attr('data-id');
        if ($(this).attr('data-status') === 'false') {
            $.ajax({
                url: `/api/todo/${id}`,
                type: 'PUT',
                data: {
                    id: id,
                    complete: true
                }
            })
                .then(function (attr) {
                    socket.emit('update-todo', attr);
                });
        } else {
            $.ajax({
                url: `/api/todo/${id}`,
                type: 'DELETE',
                data: id
            }).then(function (data) {
                socket.emit('delete-todo', data);
            });
        }
    });
};

socket.on('emit-update', function (data) {
    loadTodos();
});

socket.on('emit-new', function (data) {
    loadTodos();
});