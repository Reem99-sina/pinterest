import { NextResponse } from "next/server";
import type { NextApiRequest, NextApiResponse } from "next";
import * as nc from "next-connect"
import bodyParser from "body-parser";
import { myMulter, videotype } from "@/lib/multer";
import { v2 } from "cloudinary";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};
const handler=nc.createRouter()

const upload = myMulter("../public/uploads", videotype?.Type);
handler.use(upload?.single("file"))
handler.post((req,res)=>{
  console.log(req,"req")

})
v2.config({
  cloud_name: "dbgqtdyw9",
  api_key: "935349317259654",
  api_secret: "1NQlZ7dnvmUsxI7hA0m9xjv7ZV4",
});

// async function handler(req: any, res: any) {
//   if (req.method === "POST") {
//     // Handle the POST request to add video
//     bodyParser.urlencoded({ extended: true });

//     const body = await req.formData();
//     const path = body.get("file");
//     fs.access(path.name, fs.constants.F_OK, (err) => {
//       if (err) {
//         console.error("File does not exist:", path.name, err);
//       }
//     });
//     upload?.single("file")(req, res, async () => {
//       console.log("req.file",req.file);
//       // v2.uploader.upload(`${path.name}`, (error: any, result: { url: any; }) => {
//       //   if (error) {
//       //     console.error("Error uploading image: ", error);
//       //   } else {
//       //     console.log("Successfully uploaded image: ", result.url);
//       //   }
//       // })
//     });
//     // if(middlewareUpload){
//     //     middlewareUpload(body,res,()=>{
//     //         console.log('Middleware function called',body);

//     //     })
//     // }
//     // Save the video file to a storage location
//     // Store video information in a database
//     return NextResponse.json({ message: "Video added successfully" });
//   } else {
//     return NextResponse.json({ message: "Method Not Allowed" });
//   }
// }

export default handler
