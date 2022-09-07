// const getAllTools = (req, res) => {
//     res.send('tools found with id')
// }
let tools = [
    { 'id': 1, 'name': 'abrar' },
    { 'id': 2, 'name': 'alvi' },
    { 'id': 3, 'name': 'nirab' },
]
module.exports.getAllTools = (req, res, next) => {

    const { limit, page } = req.query;
    console.log(limit, page);
    res.json(tools.slice(0,limit))


    // res.send('tools found ')
    // const { ip, query, params, headers, body } = req;
    // console.log(ip, query, params, body, headers);
    // res.download(__dirname + '/tools.controller.js')
    // res.json({'name' : 'alvi', 'bhai': 'yes'})
    // res.redirect('/login');
    // res.send('all tools found')
}
// module.exports = {
//     getAllTools
// }
module.exports.addATool = (req, res) => {
    console.log(req.body);
    tools.push(req.body)
    res.send(tools)
}
module.exports.getToolDetails = (req, res) => {
    const {id}=req.params;
    console.log(id);
    const singleTool=tools.find(tool=>tool.id === Number(id))
    res.status(200).send({
        success: true,
        messages: "Success",
        data: singleTool
      });
      // res.status(500).send({
      //   success: false,
      //   error: "Internal server error."
      // });
    // res.send(singleTool)
}
module.exports.updateTool= (req,res)=>{
    // const newData= req.body;
    const {id} = req.params;
    const filter = {id: id}
    const newData = tools.find(tool=>tool.id = Number(id))
    newData.id=id;
    newData.name=req.body.name;
    console.log(id);
    // console.log(newData);
    res.send(newData)
}
module.exports.deleteATool=(req,res)=>{
    const {id} = req.params;
    const filter ={_id : id};
    console.log(filter);
    const updateTool = tools.filter(tool=>tool.id !== Number(id));
    res.send(updateTool);

}