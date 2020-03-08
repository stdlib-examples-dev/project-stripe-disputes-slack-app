const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

/**
* An HTTP endpoint that acts as a webhook for Stripe charge.dispute.created event
* @param {object} event
* @param {object} dispute
* @returns {object} result Your return value
*/
module.exports = async (event, dispute) => {

  // Store API Responses
  const result = {};

  let disputeUrl = `https://dashboard.stripe.com/disputes/${dispute.id}`;
  
  await lib.slack.channels['@0.6.6'].messages.create({
    channel: `#general`,
    text: `*New Stripe Dispute*`,
    attachments: [
      {
        'text': `${dispute.evidence.customer_email_address} created a new <${disputeUrl}|dispute>\nAmount: *${dispute.amount} ${dispute.currency.toUpperCase()}*\nReason: *${dispute.reason}*\nStatus: *${dispute.status}*`,
        'color': `#fcba03`
      }
    ]
  });
  

  return result;

};