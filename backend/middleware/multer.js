import multer from "multer"

const storage = multer.diskStorage({

    //what should be the filename store on disk
    filename: function(req,file,callback){
        callback(null, file.originalname)
    }
})

const upload = multer({storage})

export default upload