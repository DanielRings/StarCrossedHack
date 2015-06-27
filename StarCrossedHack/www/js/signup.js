function post(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}

function signUp(email, password) {
    console.log("SignUp Clicked");
    console.log("Email: " + email + "\nPassword: " + password);
    var url = "https://api.idolondemand.com/1/api/sync/adduser/v1?";
    var apikey = "4a0d6484-82ce-4f42-a5fc-d1f03c516edf";
    var post = $.post(url,
        {
            "store": "users",
            "apikey": apikey,
            "email": email,
            "password" : password
        });
    post.done(function (data) {
        console.log(data);
    });
}