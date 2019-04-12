const express = require('express');
const router = express.Router();
const request = require('superagent');


// @route   Get api/github/callback
// @desc    
// @access  Public
router.get('/callback', (req, res, next) => {
  const { query } = req;
  // ?code=1823109312093
  const { code } = query;

  if (!code) {
      return res.send({
          success: false,
          message: 'Error: no code'
      });
  }
  
  // Post
  request
    .post('https://github.com/login/oauth/access_token')
    .send({ 
      client_id: 'ebd1328f3e1b75969fd7', 
      client_secret: 'ea9b3367afff04eb7a3ca14541b1070b5f01f351',
      code: code 
    })
    .set('Accept', 'application/json')
    .then(result => {
      const data = result.body;
      res.send(data);
    });

});

// @route   Get api/github/user
// @desc    
// @access  Public
router.get('/user', (req, res, next) => {
  // 7427bd57e2cb35e3c47ac7f2087201b0f54d65f9
	const accessToken = 'ee0f996d6b578484cce17bdcdeb447f05276392d'; 
	
	request
    .get('/https://api.github.com/user')
    //.set('Authorization', 'token ' + accessToken)
    .then(result => {
      res.send(result.body)
		});
});


module.exports = router;