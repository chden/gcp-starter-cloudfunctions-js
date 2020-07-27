const cors = require('cors')({
    origin: true,
});

exports.main = (req, res) => {
    cors(req, res, () => {});
    res.send('Hello, World!');
};
