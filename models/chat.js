const {ObjectId} = require("mongodb");
const {getdb} = require("../utils/databaseUtil");

module.exports = class Chat{
    constructor(userid, usertext, botresponse, _id){
        this.userid = userid;
        this.usertext = usertext;
        this.botresponse = botresponse;
        if (_id) {
            this._id = _id;
        }
    }

    chatSave(){
        const db = getdb();
        return db.collection("chat").insertOne(this);
    }

    static fetchbyId(id){
        const db = getdb();
        return db.collection("chat").find({userid: id}).toArray();
    }
}
