const apiAdapter = require("../../apiAdapter");
const {
    URL_COURSE_SERVICE
} = process.env;

const api = apiAdapter(URL_COURSE_SERVICE);

module.exports = async  (req, res) => {
    try {
        const userId = req.user.data.id;
        const courseId = req.body.course_id;
        const myCourse = await api.post('/api/my-courses', {
            user_id: userId,
            course_id: courseId
        });
        return res.json(myCourse.data);
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