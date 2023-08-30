const apiAdapter = require("../../apiAdapter");
const { URL_COURSE_SERVICE } = process.env;

const api = apiAdapter(URL_COURSE_SERVICE);

module.exports = async (req, res) => {
   try {
      const course = await api.post("/api/courses", req.body);
      return res.json(course.data);
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
