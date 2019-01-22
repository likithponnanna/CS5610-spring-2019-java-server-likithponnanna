
function AdminUserServiceClient() {
    this.createUser = createUser;
    this.findAllUsers = findAllUsers;
    this.findUserById = findUserById;
    this.deleteUser = deleteUser;
    this.updateUser = updateUser;
    this.url = 'http://localhost:8080/api/user';
    var self = this;
    function createUser(user) {
        console.log(user.getUserId().toString());
        console.log(user.getUsername().toString());
        console.log(user.getPassword().toString());
        console.log(user.getFirstName().toString());
        console.log(user.getLastName().toString());
        console.log(user.getRole().toString());
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
    function findUserById(userId, callback) {  }
    function updateUser(userId, user, callback) {  }
    function deleteUser(userId, callback) {  }
}
