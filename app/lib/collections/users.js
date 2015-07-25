Schema = {};

Schema.UserProfile = new SimpleSchema({
    firstName: {
        type: String,
        regEx: /^[a-zA-Z-]{2,25}$/
    },
    lastName: {
        type: String,
        regEx: /^[a-zA-Z]{2,25}$/
    },
    birthday: {
        type: Date
    },
    gender: {
        type: String,
        allowedValues: ['Male', 'Female']
    }
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
        type: String,
        optional: true,
        blackbox: true
    },
    pricePerHour: {
        type: Number,
        optional: false
    },
    age: {
        type : Number
    }
});

Meteor.users.attachSchema(Schema.User);