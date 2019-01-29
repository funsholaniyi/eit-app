import {Template} from "meteor/templating";

import "./body.html";
import {Students} from "../api/students.js";

var deleteEits = [];
var createMode = true;

Template.body.helpers({
    students: function () {
        return Students.find({}, {
            sort: {
                createdAt: -1
            }
        });
    }
});

Template.eitList.helpers({
    dob: function () {
        return this.dob.toDateString();
    },
});

Template.body.events({
    'submit .form'(event) {
        event.preventDefault();
        const target = event.target;
        var firstname = target.firstname.value;
        var lastname = target.lastname.value;
        var gender = target.gender.value;
        var dob = target.dob.value.split("-");
        var dob = new Date(Number(dob[0]), Number(dob[1]) - 1, Number(dob[2]));
        var student_id = target.student_id.value;

        if (!createMode && student_id) {
            Meteor.call('student.update', student_id, firstname, lastname, gender, dob);
            createMode = true;
        } else {
            Meteor.call('student.insert', firstname, lastname, gender, dob);
        }
        target.reset();

        var table = document.getElementById("table");
        table.scrollIntoView();
    },
    'click .single-edit'() {
        var id = this._id;
        var theStudent = Students.find({_id: id}).fetch()[0];

        var target = document.getElementById('form');
        target.firstname.value = theStudent.firstname;
        target.lastname.value = theStudent.lastname;
        target.gender.value = theStudent.gender;
        target.dob.value = theStudent.dob.toISOString().substring(0, 10);

        target.student_id.value = id;

        var form = document.getElementById('jumbotron');
        form.scrollIntoView();
        createMode = false;
    },
    'click .single-delete'() {
        Meteor.call('student.delete', this._id)
    },
    'change .checkbox'(event) {
        if (event.target.checked) {
            deleteEits.push(this._id);
        } else {
            deleteEits.splice(deleteEits.indexOf(this._id), 1);
        }
        console.log(deleteEits);
    },
    'click .bulk-delete'() {
        deleteEits.forEach(function (id) {
            Meteor.call('student.delete', id)
        });
    }
});