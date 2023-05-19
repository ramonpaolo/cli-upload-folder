import { S3 } from 'aws-sdk'
import { hostname } from 'os'
import fs from 'fs'
import path from 'path'
import mime from 'mime'


const { ACCESS_KEY_ID, SECRET_ACCESS_KEY } = process.env

const BUCKET = `${ACCESS_KEY_ID}-personal-bucket`

const s3 = new S3({
    credentials: {
        secretAccessKey: String(SECRET_ACCESS_KEY),
        accessKeyId: String(ACCESS_KEY_ID),
    },
})

const file = async (pathToFile: string, folderToUpload?: string) => {
    const filename = path.basename(pathToFile)
    const mimeType = mime.getType(pathToFile)

    fs.readFile(pathToFile, 'utf-8', (err, data) => {
        if(err) return console.error(err)

        uploadFile(data, filename, mimeType!, folderToUpload)
    })
}

const uploadFile = (file: any, filename: string, mimetype: string, folderToUpload?: string) => {
    console.log(filename, mimetype, folderToUpload)

    const batch = s3.upload({
        Bucket: BUCKET,
        Key: folderToUpload ? path.join(folderToUpload, filename) : filename,
        ServerSideEncryption: 'AES256',
        StorageClass: 'INTELLIGENT_TIERING',
        Tagging: `Hostname=${hostname()}`,
        ContentType: mimetype,
        Body: file,
    })

    batch.send((err, data) => {
        if (err) {
            console.log(err)
            return 0;
        }
        console.log(`File: ${data.Key} was upload with success ✅`)
    })
}

export default file