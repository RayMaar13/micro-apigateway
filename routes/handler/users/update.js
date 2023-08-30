const apiAdapter = require("../../apiAdapter");
const {
    URL_USER_SERVICE
} = process.env;

const api = apiAdapter(URL_USER_SERVICE);

module.exports = async  (req, res) => {
    try {
        const id = req.user.data.id;
        const user = await api.put(`/users/${id}`, req.body);
        return res.json(user.data);
    } catch (e) {
        if (e.code === "ECONNREFUSED") {
            return res.status(500).json({
                status: "error",
                message: "Service unavailable"
            })
        }
        const {status, data} = e.response;
        return  res.status(status).json(data);
    }
}