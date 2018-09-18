import {Template} from "meteor/templating";

import "./body.html";
import {EITs} from "../api/EITs.js";

var selectedEits = [];
var createMode = true;

Template.body.helpers({
    eits: function () {
        return EITs.find({}, {
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
        var eit_id = target.eit_id.value;

        if (!createMode && eit_id) {
            Meteor.call('eit.update', eit_id, firstname, lastname, gender, dob);
            createMode = true;
        } else {
            Meteor.call('eit.insert', firstname, lastname, gender, dob);
        }
        target.reset();

    },
    'click .single-edit'() {
        var id = this._id;
        var theeit = EITs.find({_id: id}).fetch()[0];

        var target = document.getElementById('form');
        target.firstname.value = theeit.firstname;
        target.lastname.value = theeit.lastname;
        target.gender.value = theeit.gender;
        target.dob.value = theeit.dob.toISOString().substring(0, 10);

        target.eit_id.value = id;

        createMode = false;
    },
    'click .single-delete'() {
        Meteor.call('eit.delete', this._id)
    },
    'change .checkbox'(event) {
        if (event.target.checked) {
            selectedEits.push(this._id);
        } else {
            selectedEits.splice(selectedEits.indexOf(this._id), 1);
        }
        console.log(selectedEits);
    },
    'click .bulk-delete'() {
        selectedEits.forEach(function (id) {
            Meteor.call('eit.delete', id)
        });
    }
});