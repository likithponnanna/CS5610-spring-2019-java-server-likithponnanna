
function AdminUserServiceClient() {
    this.createUser = createUser;
    this.findAllUsers = findAllUsers;
    this.findUserById = findUserById;
    this.deleteUser = deleteUser;
    this.updateUser = updateUser;
    this.searchUsers = searchUsers;

    this.url = 'https://'+ window.location.host + '/api/user';
    var self = this;
    function createUser(user) {
            return fetch(this.url, {
                method: 'post',
                body: JSON.stringify({userId: user.getUserId().toString()
                                                     , username: user.getUsername().toString()
                                                     , password: user.getPassword().toString()
                                                     ,firstName: user.getFirstName().toString()
                                                     ,lastName: user.getLastName().toString()
                                                     , role: user.getRole().toString()}),
                headers: {
                    'content-type': 'application/json'
                }
            })


    }
    function findAllUsers() {
        return fetch(this.url)
            .then(function (response) {
                return response.json();
            })
    }
    function findUserById(userId) {
        return fetch('https://'+ window.location.host + '/api/user/'+userId)
            .then(function (response) {
                return response.json();
            })
    }

    function updateUser(userId, user) {
        return fetch('https://'+ window.location.host + '/api/update/'+userId,{
            method: 'PUT',
            body: JSON.stringify({userId: user.getUserId().toString()
                                     , username: user.getUsername().toString()
                                     , password: user.getPassword().toString()
                                     ,firstName: user.getFirstName().toString()
                                     ,lastName: user.getLastName().toString()
                                     , role: user.getRole().toString()}),
            headers: {
                'content-type': 'application/json'
            }
        })
    }
    function deleteUser(userId) {
        return fetch('https://'+ window.location.host + '/api/delete/'+userId,{
                method: 'DELETE'
            })
    }

    function searchUsers(user) {
        return fetch('https://'+ window.location.host + '/api/user/search',{
            method: 'POST',
            body: JSON.stringify({userId: user.getUserId().toString()
                                     , username: user.getUsername().toString()
                                     , password: user.getPassword().toString()
                                     ,firstName: user.getFirstName().toString()
                                     ,lastName: user.getLastName().toString()
                                     , role: user.getRole().toString()}),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(function (response) {
                return response.json();
            })
    }
}
