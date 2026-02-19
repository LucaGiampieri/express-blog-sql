function homeRequest(req, res, next) {

    res.on("finish", () => {
        if (req.path === "/") {
            console.log("Ti trovi nella Home");
        }
    })

    next();
}

module.exports = homeRequest;