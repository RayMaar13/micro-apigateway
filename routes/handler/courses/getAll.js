const apiAdapter = require("../../apiAdapter");
const { URL_COURSE_SERVICE, HOSTNAME_URL } = process.env;

const api = apiAdapter(URL_COURSE_SERVICE);

module.exports = async (req, res) => {
   try {
      const courses = await api.get("/api/courses", {
         params: {
            ...req.query,
            status: "published"
         }
      });

      const coursesData = courses.data;
      const firstPage = coursesData.data.first_page_url.split("?").pop();
      const lastPage = coursesData.data.last_page_url.split("?").pop();

      coursesData.data.first_page_url = `${HOSTNAME_URL}/courses?${firstPage}`; 
      coursesData.data.last_page_url = `${HOSTNAME_URL}/courses?${lastPage}`; 

      if(coursesData.data.next_page_url) {
         const nextPage = coursesData.data.next_page_url.split("?").pop();
         coursesData.data.next_page_url = `${HOSTNAME_URL}/courses?${nextPage}`;
      }
      if(coursesData.data.prev_page_url) {
         const prevPage = coursesData.data.prev_page_url.split("?").pop();
         coursesData.data.prev_page_url = `${HOSTNAME_URL}/courses?${prevPage}`;
      }

      coursesData.data.path = `${HOSTNAME_URL}/courses`
      return res.json(courses.data);
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
