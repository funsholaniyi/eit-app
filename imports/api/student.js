import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export const studentConn = new Mongo.Collection("eits");

Meteor.methods({
    'eits.insert'(firstname, lastname, gender, dob) {
        check(firstname, String);
        check(lastname, String);
        check(gender, String);
        check(dob, Date);

        studentConn.insert({
            firstname: firstname,
            lastname: lastname,
            gender: gender,
            dob: dob
        });

        console.log('inserted');
    },
    'eits.fetch'() {
        return studentConn.find({}, { sort: { createdAt: -1 } }).fetch();
    },
    'eits.delete'(id) {
        check(id, String);
        studentConn.remove(id);
    }
});