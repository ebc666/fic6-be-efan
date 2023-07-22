'use strict';

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({strapi}) => ({
    async create(ctx) {
        const result = await super.create(ctx);

        console.log(result.result);

        const midtransClient = require('midtrans-client');
// Create Snap API instance
let snap = new midtransClient.Snap({
        isProduction : false,
        serverKey : 'SB-Mid-server-4BsziLvail4Z4X4h_xJlGqAk',
        clientKey : 'SB-Mid-client-YK19EfMKHmLp1MdK'
    });

let parameter = {
    "transaction_details": {
        "order_id": result.data.id,
        "gross_amount": result.data.attributes.totalPrice
    }, "credit_card":{
        "secure" : true
    }
};


let response = await snap.createTransaction(parameter)


// const midtransClient = require('midtrans-client');
// // Create Core API instance
// let core = new midtransClient.CoreApi({
//         isProduction : false,
//         serverKey : 'SB-Mid-server-bA1VrqoAz5S9IdDj2_ky2T2N',
//         clientKey : 'SB-Mid-client-OEDfZ8tTIqOqJ0Z-'
//     });

// let parameter = {
//     "payment_type": "Gopay",
//     "transaction_details": {
//         "gross_amount": result.data.attributes.totalPrice,
//         "order_id": result.data.id,
//     },
//     "credit_card":{
//         "token_id": 'CREDIT_CARD_TOKEN', // change with your card token
//         "authentication": true
//     }
// };

// // charge transaction
// let response = await core.charge(parameter)

        return response ;
    }
}) );