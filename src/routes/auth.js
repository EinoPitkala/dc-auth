const router = require('express').Router();


router.get('/redirect', (req, res) => {
    res.json({
        status: 200,
    })
})


module.exports = router;