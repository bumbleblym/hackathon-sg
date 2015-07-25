Schema = {};

Schema.UserProfile = new SimpleSchema({
    firstName: {
        type: String,
        regEx: /^[a-zA-Z-]{2,25}$/,
        optional: false
    },
    lastName: {
        type: String,
        regEx: /^[a-zA-Z]{2,25}$/,
        optional: false
    },
    birthday: {
        type: Date,
        optional: false
    },
    gender: {
        type: String,
        allowedValues: ['Male', 'Female'],
        optional: true
    }, 
});

Schema.User = new SimpleSchema({
    username: {
        type: String,
        regEx: /^[a-z0-9A-Z_]{3,15}$/
    },
    emails: {
        type: [Object],
        // this must be optional if you also use other login services like facebook,
        // but if you use only accounts-password, then it can be required
        optional: true
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    phoneNumber: {
        type: Number
    },
    createdAt: {
        type: Date
    },
    profile: {
        type: Schema.UserProfile,
        optional: true
    },
    teachingSubjects: {
        type: Object,
        optional: true,
        blackbox: true
    },
    pricePerHour: {
        type: Number,
        optional: false
    }
});

Meteor.users.attachSchema(Schema.User);