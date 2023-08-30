const apiAdapter = require("../../apiAdapter");
const {
    URL_COURSE_SERVICE
} = process.env;

const api = apiAdapter(URL_COURSE_SERVICE);

module.exports = async  (req, res) => {
    try {
        const userId = req.user.data.id;
        console.log(req.user);
        const myCourses = await api.get(`/api/my-courses`, {
            params: {
                user_id: userId
            }
        });
        return res.json(myCourses.data);
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