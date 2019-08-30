const user = require('../models/user');

let admin = {
    username: "Admin User",
    email: "admin@gmail.com",
    password: "password123",
    role: "admin"
}

user.find({ email: admin.email }).exec(function (err, data) {
    if (data.length !== 0 ) {
        console.log('Admin Already Exist');
    }
    else{
        user.create(admin, function (e) {
            if (e) {
                console.log(e);
            }
            console.log('admin created')
        });
    }
})
