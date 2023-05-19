import { S3 } from 'aws-sdk'
import { hostname } from 'os'
import fs from 'fs'
import path from 'path'
import mime from 'mime'
import chalk from 'chalk'

const logSuccess = (text: string) => {
    console.log(chalk.green(text))
}

const { ACCESS_KEY_ID, SECRET_ACCESS_KEY, BUCKET, STORAGE_CLASS } = process.env

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

        uploadFile(data, pathToFile, filename, mimeType!, folderToUpload)
    })
}

const uploadFile = (file: any, pathToFile: string, filename: string, mimetype: string, folderToUpload?: string) => {
    const batch = s3.upload({
        Bucket: String(BUCKET),
        Key: folderToUpload ? path.join(folderToUpload, filename) : filename,
        ServerSideEncryption: 'AES256',
        StorageClass: STORAGE_CLASS,
        Tagging: `Hostname=${hostname()}`,
        ContentType: mimetype,
        Body: file,
    })

    batch.send((err, data) => {
        if (err) {
            console.log(err)
            return 0;
        }
        logSuccess(`File '${pathToFile}' was uploaded with success ✅`)
    })
}

export default file