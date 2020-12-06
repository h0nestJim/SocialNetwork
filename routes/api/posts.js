const express = require('express');
const router = express.Router();

//@route   GET api/Users
//@desc    Test route
//@access  public

router.get('/', (req, res) => {
    res.send('post Route');
});
//exports the route to this file
module.exports = router;