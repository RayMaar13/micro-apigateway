const jwt = require("jsonwebtoken");
const apiAdapter = require("../../apiAdapter");
const {
    URL_USER_SERVICE,
    JWT_SECRET,
    JWT_SECRET_REFRESH_TOKEN,
    JWT_ACCESS_TOKEN_EXPIRED
} = process.env;

const api = apiAdapter(URL_USER_SERVICE);

module.exports = async (req, res) => {
    try {
        const refreshToken = req.body.refresh_token;
        const email = req.body.email;

        if (!refreshToken || !email) {
            return res.status(400).json({
                status: "error",
                message: "invalid error"
            });
        }

        await api.get('/refresh_tokens', {params: {refresh_token: refreshToken}});

        jwt.verify(refreshToken, JWT_SECRET_REFRESH_TOKEN, (err, decoded) => {
            if (err) {
                res.status(403).json({
                    status: "error",
                    message: err.message
                });
            }
            if (email !== decoded.data.email) {
                res.status(400).json({
                    status: "error",
                    message: "email is not valid"
                });
            }
            console.log(decoded)
            const token = jwt.sign({data: decoded.data}, JWT_SECRET, {expiresIn: JWT_ACCESS_TOKEN_EXPIRED});
            return res.json({
                status: "success",
                data: token
            })
        });
    } catch (e) {
        if (e.code === "ECONNREFUSED") {
            return res.status(500).json({
                status: "error",
                message: "Service unavailable"
            })
        }
        const {status, data} = e.response;
        return res.status(status).json(data);
    }
}