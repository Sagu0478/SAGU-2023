const bcrypt = require("bcryptjs");
const { query } = require("../../server/db.js");


async function handler(req, res) {
  try {
    const queryText = 
      "SELECT id, name, base_price FROM menu_items where id = ?";

    const values = [req.body.id];

    const results = await query(queryText, values);

    const item = results[0];

    if (
      results.length === 0 ||
      !(await bcrypt.compare(req.body.name, item.name))
    ) {
      return res
        .status(401)
        .json({ success: false, message: "No Item Found" });
    }

    console.log("Item added: ", item);


    res
      .status(200)
      .json({ success: true, message: "Item added successfully" });
  } catch (error) {
    console.error("Error during adding: ", error);
    res.status(500).json({ success: false, message: "Adding failed" });
  }
}

module.exports = handler;
