exports.hello = (req, res) => {
    res.send('Hello, World!');
};

exports.helloUser = (req, res) => {
    const username = req.params.username;
    res.send(`Hello, ${username}!`);
};
