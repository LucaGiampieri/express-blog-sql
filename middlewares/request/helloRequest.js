function helloRequest(req, res, next) {

    res.on("finish", () => {

        if (res.statusCode >= 200 && res.statusCode < 300) {
            console.log("Complimenti hai effettuato la tua richiesta con successo");
        }

    });

    next();
}

module.exports = helloRequest;