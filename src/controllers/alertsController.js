const sendTextMessage = require('../utils/sendTextMessage')
exports.sendAlert = (req, res) => {
    //sendTextMessage('TESTNUMBER', 'HI James This is your app dude');
    res.json({
        'status' : 'success',
        body: req.body
    })
}