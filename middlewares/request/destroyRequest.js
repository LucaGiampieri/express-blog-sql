function destroyRequest(req, res, next) {

    res.on("finish", () => {

        if (res.statusCode >= 200 && res.statusCode < 300) {
            console.log("Hai effettutato una richista DESTROY");
        }

    });

    next();
}

module.exports = destroyRequest;