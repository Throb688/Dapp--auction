var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var  path = require('path');
var fs = require('fs'); 


router.get('/', function(req, res, next) {
  res.render('seller')
});
router.post('/',function(req,res,next){
    var form=new formidable.IncomingForm();
    form.uploadDir=__dirname;
    form.keepExtensions=true;
 
var targetDir=path.join(__dirname,'../public/images');
fs.access(targetDir,function(err){
 
    if(err){
        fs.mkdirSync(targetDir);
    }
    _fileParse();
});
function _fileParse(){
    form.parse(req,function(err,fields,files){
        console.log(fields);
          if(err) throw err;
            var fileUrl=[];
            var errCount=0;
            var keys=Object.keys(files);
            keys.forEach(function(key){
             var filePath=files[key].path;
             var fileExt=filePath.substring(filePath.lastIndexOf('.'));
             if(('.jpg.jpeg.png.gif').indexOf(fileExt.toLowerCase())==-1){
                errCount+=1;
             }
             else{
                var fileName=new Date().getTime()+fileExt;
                var targetFile=path.join(targetDir,fileName);
                //
                   fs.renameSync(filePath,targetFile);
                   fileUrl.push('/images/'+fileName);
             }
            })
		 res.render('seller1',{
			fileUrl:fileUrl,
			GoodsName:fields.GoodsName,
			describe:fields.describe,
			price:fields.price,
			time:fields.time,
		 })
    })
}
 
 
})
  
  module.exports = router;