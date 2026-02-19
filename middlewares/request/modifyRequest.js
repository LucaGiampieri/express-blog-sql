function modifyRequest(req, res, next) {

    res.on("finish", () => {

        if (res.statusCode >= 200 && res.statusCode < 300) {
            console.log("Hai effettutato una richista MODIFY");
        }

    });

    next();
}

module.exports = modifyRequest;