class Database {
    static users = [];                  // all users in array

    static initDatabase () {
        this.users = [
            {
                username: "admin",                  // add an admin account if database does not already exist
                password: "admin",
                scores: {
                    science: 0,
                    javascript: 0,
                    perdev: 0,
                    eapp: 0,
                    all: 0                        
                }
            }
        ]

        // localStorage.removeItem("users")  // uncomment this to clear database

        let databaseUsers = JSON.parse(localStorage.getItem("users"));      // get the contents of database
        if (databaseUsers != null) this.users = databaseUsers;                   // if no content on local databse, set the admin user as the first user
        localStorage.setItem("users", JSON.stringify(this.users));    
        }
    static updateUserScore(user, subject, score) {                          // static method that can update scores with parameters of username, subject and score
        this.getUser(user).scores[this.subjectIndex(subject)] = score;      
        localStorage.setItem("users", JSON.stringify(this.users));
    }
    static getUser(username) {                              // loop through all users and return a user based on the username
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].username == username) {
                return this.users[i];
            }
        }
    }
    static addUser(username, password) {            // add user to database
        let newuser = {
            username: username,                  
            password: password,
            scores: {
                science: 0,
                javascript: 0,
                csharp: 0,
                perdev: 0,
                eapp: 0,
                tagalog: 0,
                all: 0                     
            }
        }
        this.users.push(newuser);
        localStorage.setItem("users", JSON.stringify(this.users));
    }
    static sortUsers(subject) {                 // sort users from highest to lowest score based on the subject
        this.users.sort((user1, user2) => user2.scores[this.subjectIndex(subject)] - user1.scores[this.subjectIndex(subject)]);
        localStorage.setItem("users", JSON.stringify(this.users));
    }
    static getScore(username, subject) {
        return this.getUser(username).scores[this.subjectIndex(subject)];       // get score of user
    }
    static subjectIndex(subject){           // dynamically use switch case for subject picking
        switch(subject){                    // this was made so that theres not too much switch cases
            case "PhysicalScience":
                subject = "science";
                break;
            case "JavaScript":
                subject = "javascript"
                break;
            case "CSharp":
                subject = "csharp"
                break;
            case "PerDev":
                subject = "perdev"
                break;
            case "EAPP":
                subject = "eapp"
                break;
            case "Tagalog":
                subject = "tagalog"
                break;
            case "All":
                subject = "all"
                break;
        }
        return subject
    }
    static deleteAccount(username) {            // delete account
        this.users.splice(this.users.findIndex(item => item.username == username), 1);
        localStorage.setItem("users", JSON.stringify(this.users));
    }
}
export default Database;