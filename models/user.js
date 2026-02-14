const {ObjectId} = require("mongodb");
const {getdb} = require("../utils/databaseUtil");

module.exports = class User{
    constructor(fname, email, password, _id){
        this.fname = fname;
        this.email = email;
        this.password = password;
        if (_id) {
            this._id = _id;
        }
    };

    save(){
        const db = getdb();
        return db.collection("user").insertOne(this);   
    }

    static findbyemail(email){
        const db = getdb();
        return db.collection("user").findOne({email: email});
    }

    static async updatePass(email, password) {
        const db = getdb();

        const result = await db.collection("user").updateOne(
            {email: email},
            {$set:{password: password}}
        );
        return result.modifiedCount === 1;
    }
}