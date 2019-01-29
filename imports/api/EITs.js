import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export const EITs = new Mongo.Collection("eit");

Meteor.methods({
    'eit.insert'(firstname, lastname, gender, dob) {
        check(firstname, String);
        check(lastname, String);
        check(gender, String);
        check(dob, Date);

        EITs.insert({
            firstname: firstname,
            lastname: lastname,
            gender: gender,
            dob: dob,
            createdAt: new Date()
        });

    },
    'eit.update'(eit_id, firstname, lastname, gender, dob) {
        check(firstname, String);
        check(lastname, String);
        check(gender, String);
        check(dob, Date);

        EITs.update(eit_id, {
            $set: {
                firstname: firstname,
                lastname: lastname,
                gender: gender,
                dob: dob,
            }
        });
    },
    'eit.fetch'(id) {
        return EITs.find({_id: id}).fetch();
    },
    'eit.fetch_all'() {
        return EITs.find({}, {sort: {createdAt: -1}});
    },
    'eit.delete'(id) {
        check(id, String);
        EITs.remove(id);
    }
});