import {Template} from "meteor/templating";
import {ReactiveDict} from "meteor/reactive-dict";

import "./body.html";
import {studentConn} from "../api/student.js";

let deleteEits = [];

Template.body.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
    this.state.set('theArray', []);
});


Template.body.helpers({
    DOBs: function () {
        return this.dob.toDateString()
    },
    students: function () {
        return studentConn.find({}, {
            sort: {
                createdAt: -1
            }
        });
    }
});

Template.eitList.helpers({
    DOBs: function () {
        return this.dob.toDateString()
    }
});

Template.body.events({
    'submit #data-capture'(event) {
        event.preventDefault();
        const target = event.target;
        var firstname = target.firstname.value;
        var lastname = target.lastname.value;
        var gender = target.gender.value;
        var dob = target.DateofBirth.value.split("-");
        var DateofBirth = new Date(Number(dob[0]), Number(dob[1]) - 1, Number(dob[2]));

        Meteor.call('eits.insert', firstname, lastname, gender, DateofBirth)
    },
    'change .checkedValue'(event, instance) {
        // var getAll = instance.state.get('theArray')
        if (event.target.checked) {
            // getAll.push(this._id)
            // instance.state.set('theArray',getAll)

            deleteEits.push(this._id);
        } else {
            deleteEits.splice(deleteEits.indexOf(this._id), 1)
            // instance.state.set('theArray', getAll)
        }
    },
    'click #delete-eit'(event, instance) {
        // console.log('i think');
        // var getAll = instance.state.get('theArray')
        // console.log(student);
        deleteEits.forEach(function (id) {
            Meteor.call('eits.delete', id)
        })
    }
});