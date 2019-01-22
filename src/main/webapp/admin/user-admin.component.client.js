(function () {
    var $usernameFld, $passwordFld;
    var $removeBtnFld, $editBtnFld, $createBtnFld;
    var $firstNameFld, $lastNameFld, $roleFld;
    var $userRowTemplate, $tbody;
    var $intiTemplateFld;
    var userService = new AdminUserServiceClient();
    $(main);

    function main() {
        $intiTemplateFld = $("#intiTemplateFld");
        $intiTemplateFld.hide();
        $tbody = $('tbody');
        $createBtnFld = $("#createBtnFld");

        userService
            .findAllUsers()
            .then(renderUsers);

        $createBtnFld.click(createUser())
    }
    function createUser() {
        $usernameFld = $("#usernameFld");
        $passwordFld = $("#passwordFld");
        $firstNameFld = $("#firstNameFld");
        $lastNameFld = $("#lastNameFld");
        $roleFld = $("#roleFld");

        var username, password, firstName, lastName, role;

        var user = {username: $usernameFld.val(), password:$passwordFld.val()
            , firstName:$firstNameFld.val() , lastName:$lastNameFld.val()
            , role:$roleFld.val()};
        userService
            .createUser(user)
            .then(renderUsers);

    }

    function findAllUsers() {  }
    function findUserById() {  }
    function deleteUser() {  }
    function selectUser() {  }
    function updateUser() {  }
    function renderUser(user) {  }
    function renderUsers(users) {
        //console.log(users);
        for( var u=0; u < users.length; u++){
            console.log(users[u]);

            var clone = $intiTemplateFld.clone().show();
            clone.find(".wbdv-username").html(users[u].username);
            clone.find(".wbdv-first-name").html(users[u].firstName);
            clone.find(".wbdv-last-name").html(users[u].lastName);
            $tbody.append(clone).show();
        }

    }
})();
