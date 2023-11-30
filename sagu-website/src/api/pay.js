const { Client } = require("square");
const crypto = require('crypto');

BigInt.prototype.toJSON = function () {
  return this.toString();
};

const { paymentsApi } = new Client({
  accessToken: process.env.NEXT_PUBLIC_SQUARE_SANDBOX_ACCESS_TOKEN,
  environment: "sandbox",
});

async function handler(req, res) {
  if (req.method === "POST") {
    const amount = req.body.amount;
    if (!amount) {
      return res.status(400).json({ error: 'Amount is required' });
    }

    const { result } = await paymentsApi.createPayment({
      idempotencyKey: crypto.randomUUID(),
      sourceId: req.body.sourceId,
      amountMoney: {
        currency: "CAD",
        amount: amount,
      },
    });
    console.log(result);
    res.status(200).json(result);
  } else {
    res.status(500).send();
  }
}

module.exports = handler;
