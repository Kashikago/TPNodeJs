const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        lowercase: true,
        trim: true,
        require: true,
    },
    lastName: {
        type: String,
        lowercase: true,
        trim: true,
        require: true,
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    phone: {
        type: Number,
        lowercase: true,
        trim: true,
        require: true,
    },
    creationDate: {
        type: String,
        default: () => new Date().toISOString(),
    },
    role: {
        type: String,
        enum: ['Customer', 'Server'],
        default: 'Customer',
    },
});

userSchema.pre('save', function (next) {
    const client = this;
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return next(err);
        }

        bcrypt.hash(client.password, salt, function (err, hash) {
            if (err) {
                return next(err);
            }
            client.password = hash;
            next();
        });
    });
});
const User = mongoose.model('user', userSchema);
module.exports = User;