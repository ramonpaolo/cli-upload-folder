import dotenv from 'dotenv'
import fs from 'fs'

import directory from './directory'
import file from './file'

dotenv.config()

const path = process.argv[2]
const folderToUpload = process.argv[3]

fs.stat(path, (err, data) => {
    if(err) return console.error(err)

    const isDirectory = data.isDirectory()

    console.clear()

    if(isDirectory) return directory(path, folderToUpload)
    return file(path, folderToUpload)
})