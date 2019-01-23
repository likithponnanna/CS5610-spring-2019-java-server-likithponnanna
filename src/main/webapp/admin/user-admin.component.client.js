(function () {
    var $usernameFld, $passwordFld;
    var $removeBtnFld, $editBtnFld, $createBtnFld;
    var $firstNameFld, $lastNameFld, $roleFld;
    var $userRowTemplate, $tbody;
    var $intiTemplateFld;
    var $wbdvrmtrFld;
    var username, password, firstName, lastName, role;
    var  $updateBtnFld, userIdTem=null;
    var userService = new AdminUserServiceClient();
    $(main);

    function main() {

        $intiTemplateFld = $("#intiTemplateFld");
        $intiTemplateFld.hide();
        $tbody = $('tbody');
        $createBtnFld = $("#createBtnFld");

        $usernameFld = $("#usernameFld");
        $passwordFld = $("#passwordFld");
        $firstNameFld = $("#firstNameFld");
        $lastNameFld = $("#lastNameFld");
        $roleFld = $("#roleFld");
        $updateBtnFld = $('#updateBtnFld');

        userService
            .findAllUsers()
            .then(renderUsers);

        $(document).on("click","#createBtnFld",createUser);
        $(document).on("click",".wbdv-remove",deleteUser);
        $(document).on("click",".wbdv-edit",editUser);
        $(document).on("click","#updateBtnFld",updateUser);


       /* $(document).on("click","#updateBtnFld",(function() {
            alert('No user chosen for update!! Click on the edit button of the user info to '
                  + 'be updated');
        }));*/

    }
    function createUser() {
        if($usernameFld.val() !== "" && $passwordFld.val() !== "" && $passwordFld.val()!== ""
        && $firstNameFld.val()!== "" &&  $lastNameFld.val()!=="" && $roleFld.val()!=="") {
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

        supportFun(user);

    }

    function findAllUsers() {  }

    function findUserById(userId) {
        var userRetrieved;
        userService
            .findUserById(userId).then(function (userPromiseData) {
            console.log(userPromiseData) });



    }
    function deleteUser() {
        var userId = event.target.id;
        userId = userId.replace("wbdv-rm-","");

        userService
            .deleteUser(userId)
            .then(renderUsers);

        $('.wbdv-rm-row-'+userId).remove();


    }
    function selectUser() {  }

    function updateUser() {
        if(userIdTem!==0) {
            username = $usernameFld.val();
            password = $passwordFld.val();
            firstName = $firstNameFld.val();
            lastName = $lastNameFld.val();
            role = $roleFld.val();

            console.log(username+password+firstName+lastName+role);

            var user = new User(username,password,firstName,lastName,role);
           console.log(userIdTem);

           var userId = userIdTem;

            userService
                .updateUser(userId,user)
                .then(renderUsers);

            $('.wbdv-rm-row-'+userId).find('.wbdv-username').text(username);
            $('.wbdv-rm-row-'+userId).find('.wbdv-password').text('••••••');
            $('.wbdv-rm-row-'+userId).find('.wbdv-first-name').text(firstName);
            $('.wbdv-rm-row-'+userId).find('.wbdv-last-name').text(lastName);
            $('.wbdv-rm-row-'+userId).find('.wbdv-role').text(role);

            $usernameFld.val('');
            $passwordFld.val('');
            $firstNameFld.val('');
            $lastNameFld.val('');
            $roleFld.val('');

            userIdTem=null;


        }else {
            alert('No user chosen for update!! Click on the edit button of the user info to '
                  + 'be updated');
        }


    }

    function editUser() {

        var userId = event.target.id;
        userId = userId.replace("wbdv-ed-","");

        userService
            .findUserById(userId).then(function (userPromiseData) {
            $usernameFld.val(userPromiseData.username);
            $passwordFld.val(userPromiseData.password);
            $firstNameFld.val(userPromiseData.firstName);
            $lastNameFld.val(userPromiseData.lastName);
            $roleFld.val(userPromiseData.role); });

        $("#usernameFld").focus();

        userIdTem=userId;

    }

    function renderUser(user) {  }
    function renderUsers(users) {
        for( var u=0; u < users.length; u++){
            var clone = $intiTemplateFld.clone();
            clone.addClass('wbdv-rm-row-'+users[u].userId).show();
            clone.find(".wbdv-username").html(users[u].username);
            clone.find(".wbdv-password").html('&#8226;&#8226;&#8226;&#8226;&#8226;'
                                                           + '&#8226;');
            clone.find(".wbdv-first-name").html(users[u].firstName);
            clone.find(".wbdv-last-name").html(users[u].lastName);
            clone.find(".wbdv-remove").attr("id","wbdv-rm-"+users[u].userId);
            clone.find(".wbdv-edit").attr("id","wbdv-ed-"+users[u].userId);
            $tbody.append(clone).show();

        }

    }
    function supportFun(users) {
        username = $usernameFld.val();
        password = $passwordFld.val();
        firstName = $firstNameFld.val();
        lastName = $lastNameFld.val();
        role = $roleFld.val();
        var userId = users.getUserId();
        var clone = $intiTemplateFld.clone().show();
        clone.addClass('wbdv-rm-row-'+userId).show();
        clone.find(".wbdv-username").html(username);
        clone.find(".wbdv-password").html('&#8226;&#8226;&#8226;&#8226;&#8226;'
                                          + '&#8226;');
        clone.find(".wbdv-first-name").html(firstName);
        clone.find(".wbdv-last-name").html(lastName);
        clone.find(".wbdv-remove").attr("id","wbdv-rm-"+ userId);
        clone.find(".wbdv-edit").attr("id","wbdv-ed-"+userId);
        $tbody.append(clone).show();

    }


})();
