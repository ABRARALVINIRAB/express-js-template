//express come from express 
const express = require('express');
const toolsController = require('../../controllers/tools.controller');
const { limiter } = require('../../middleware/limiter');
const viewCount = require('../../middleware/viewCount');
const router = express.Router();

// router.get('/:id', (req, res) => {
//     res.send('tools found with id')
// })
// router.post('/tools', (req, res) => {
//     res.send('tools added')
// })
//combinedly use cas 2ta route i same

//api documentation/route documentation


router
    .route('/')
    /**
   * @api {get} /tools All tools
   * @apiDescription Get all the tools
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [limit=10]  Users per page
   *
   * @apiSuccess {Object[]} all the tools.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
    .get(toolsController.getAllTools)
    /**
   * @api {post} /tools save a tool
   * @apiDescription new tools add in the api
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [limit=10]  Users per page
   *
   * @apiSuccess {Object[]} all the tools.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
    .post(toolsController.addATool)
//viewCount router level middleware
router.
    route('/:id').
    get(limiter, viewCount, toolsController.getToolDetails)
    .patch(toolsController.updateTool)
    .delete(toolsController.deleteATool)

module.exports = router;