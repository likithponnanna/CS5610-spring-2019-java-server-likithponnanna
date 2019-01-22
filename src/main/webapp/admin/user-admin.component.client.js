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

       // $createBtnFld.click(createUser);
        $(document).on("click","#createBtnFld",createUser);
    }
    function createUser() {
        $usernameFld = $("#usernameFld");
        $passwordFld = $("#passwordFld");
        $firstNameFld = $("#firstNameFld");
        $lastNameFld = $("#lastNameFld");
        $roleFld = $("#roleFld");


        var username, password, firstName, lastName, role;
        if($usernameFld.val() !== "" && $passwordFld.val() !== "" && $passwordFld.val()!== ""
        && $firstNameFld.val()!=="" &&  $lastNameFld.val()!=="" && $roleFld.val()!=="") {
            username = $usernameFld.val();
            password = $passwordFld.val();
            firstName = $firstNameFld.val();
            lastName = $lastNameFld.val();
            role = $roleFld.val();
        }else {
            alert("Input all the fields");
        }

        var user = new User(username,password,firstName,lastName,role);

        userService
            .createUser(user)
            .then(renderUsers);

        supportFun()

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
            //clone.find(".wbdv-password").html(users[u].password);
            clone.find(".wbdv-first-name").html(users[u].firstName);
            clone.find(".wbdv-last-name").html(users[u].lastName);
            $tbody.append(clone).show();
        }

    }

    function supportFun() {
        var clone = $intiTemplateFld.clone().show();
        clone.find(".wbdv-username").html(username);
       // clone.find(".wbdv-password").html(<a type>);
        clone.find(".wbdv-first-name").html(firstName);
        clone.find(".wbdv-last-name").html(lastName);
        $tbody.append(clone).show();
    }
})();
