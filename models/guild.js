const mongoose = require('mongoose');

module.exports = mongoose.model('Guild', new mongoose.Schema({
    id: { type: String },

    banlist: { type: Object, default: {
    /*    member: null,
        end_date: new Date()*/
    } },

    addons: { type: Object, default: {
        autorole: {
            enabled: false,
            role: null
        },

        autonick: {
            enabled: false,
            nickname: null
        },

        welcome: {
            enabled: false,
            channel: null,
            background: null
        },

        tickets: {
			enabled: false,
			category: null
		},
    }},

    slowmode: { type: Object, default: {
        users: [],
        channels: []
    }}
}))