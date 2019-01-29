import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export const Students = new Mongo.Collection("student");

Meteor.methods({
    'student.insert'(firstname, lastname, gender, dob) {
        check(firstname, String);
        check(lastname, String);
        check(gender, String);
        check(dob, Date);

        Students.insert({
            firstname: firstname,
            lastname: lastname,
            gender: gender,
            dob: dob,
            createdAt: new Date()
        });

    },
    'student.update'(student_id, firstname, lastname, gender, dob) {
        check(firstname, String);
        check(lastname, String);
        check(gender, String);
        check(dob, Date);

        Students.update(student_id, {
            $set: {
                firstname: firstname,
                lastname: lastname,
                gender: gender,
                dob: dob,
            }
        });
    },
    'student.fetch'(id) {
        return Students.find({_id: id}).fetch();
    },
    'student.fetch_all'() {
        return Students.find({}, {sort: {createdAt: -1}});
    },
    'student.delete'(id) {
        check(id, String);
        Students.remove(id);
    }
});