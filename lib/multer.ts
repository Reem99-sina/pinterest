
import fs from "fs"
import multer, { FileFilterCallback } from "multer"
import path from "path"
const videotype={
    Type:['video/mp4','video/x-flv','video/quicktime',"image/jpeg","image/jpg","image/png"]
}

const myMulter=(customPath:string, customvalid:string[]) =>{
    
        if (!customPath) {
            customPath = "general"
        }
        const fullPath = path.join(__dirname, `${customPath}`)

        console.log(customPath)
        if (!fs.existsSync(customPath)) {
            fs.mkdirSync(customPath, { recursive: true })
        }
        const fileFilte=(req: any, file: Express.Multer.File, cb: FileFilterCallback) =>{
            
            if (customvalid.includes(file.mimetype)) {
                cb(null, true)
            } else {
                // req.imagevalidtype = true
                cb(null, false)
            }
        }
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                console.log(file.originalname,"ffile.originalname",file)
                cb(null, "/public/uploads")
            }, filename: function (req, file, cb) {
                console.log(file.originalname,"ffile.originalname",file)
                const filestoragename = Date.now() +"_" + path.extname(file.originalname)
               console.log(file.originalname,"ffile.originalname",file)
                cb(null, filestoragename)
            }
        })
        // const storage = multer.diskStorage({});

        const upload = multer({ storage:storage, limits: {
            fileSize: 1000 * 1024 * 1024, // 100MB limit

          }, })
       
        return upload
    
}

export { myMulter, videotype }