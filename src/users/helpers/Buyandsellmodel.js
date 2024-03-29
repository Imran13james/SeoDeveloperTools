const mongoose = require('mongoose');
const { Schema } = mongoose;

function validateDescriptionLength(description) {
    const wordCount = description.trim().split(/\s+/).length;
    return wordCount <= 20;
}

const detailsSchema = new Schema({
    accountFullname: {
        type: String,
        required: true,
    },
    descFull: {
        type: String,
        validate: [validateDescriptionLength, 'Description must be less than 20 words'],
    },
    siteAge: {
        type: Number,
        required: true,
    },
    monthlyProfit: {
        type: Number,
        required: true,
    },
    profitMargin: {
        type: Number,
        required: true,
    },
    pageViews: {
        type: Number,
        required: true,
    },
    profitMultiple: {
        type: String,
        required: true,
    },
    revenueMultiple: {
        type: String,
        required: true,
    },
    moreDetailsimg: {
        type: String,
        validate: {
            validator: (v) => {
                // Ensure it starts with http:// or https://
                return /^https?:\/\//.test(v);
            },
            message: "URL must start with http:// or https://"
        }
    },
    monthlyrevenueimg: {
        type: String,
        validate: {
            validator: (v) => {
                return /^https?:\/\//.test(v);
            },
            message: "URL must start with http:// or https://"
        }
    },
    accountAnalyticsimg: {
        type: String,
        validate: {
            validator: (v) => {
                return /^https?:\/\//.test(v);
            },
            message: "URL must start with http:// or https://"
        }
    },
    googleAnalyticsimg: {
        type: String,
        validate: {
            validator: (v) => {
                return /^https?:\/\//.test(v);
            },
            message: "URL must start with http:// or https://"
        }
    },
    
    moreDetailsDetails: {
        type: String,
    },
   
    monthlyrevenueDetails: {
        type: String,
    },
    
    accountAnalyticsDetails: {
        type: String,
    },
    
    googleAnalyticsDetails: {
        type: String,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const buySellPage = new Schema({
    serialNo: {
        type: Number,
        required: true,
    },
    earningPlatforms: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    aboutThisAccount: {
        accPrice: {
            type: String,
            required: true,
        },
        accName: {
            type: String,
        },
        accountUrl: {
            type: String,
            required: true,
        },
        accountAge: {
            type: Number,
            required: true,
        },
    },
    details: detailsSchema, // Embed detailsSchema as a subdocument
});

const BuyAndSell = mongoose.model('BuyAccountDb', buySellPage);

module.exports = BuyAndSell;


