const apiAdapter = require("../../apiAdapter");
const { URL_SERVICE_ORDER_PAYMENT } = process.env;

const api = apiAdapter(URL_SERVICE_ORDER_PAYMENT);

module.exports = async (req, res) => {
   try {
      const webhook = await api.post("/api/webhook", req.body);
      return res.json(webhook.data);
   } catch (e) {
      if (e.code === "ECONNREFUSED") {
         return res.status(500).json({
            status: "error",
            message: "Service unavailable",
         });
      }
      const { status, data } = e.response;
      return res.status(status).json(data);
   }
};
