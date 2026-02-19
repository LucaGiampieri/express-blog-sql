function showRequest(req, res, next) {

    res.on("finish", () => {

        if (res.statusCode >= 200 && res.statusCode < 300) {
            console.log("Hai effettutato una richista SHOW");
        }

    });

    next();
}

module.exports = showRequest;