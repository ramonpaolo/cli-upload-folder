import fs from 'fs'
import path from 'path'

import file from './file'
import { logError } from './utils'

const directory = async (pathToDirectory: string, folderToUpload?: string) => {
    fs.readdir(pathToDirectory, 'utf-8', (err, files) => {
        if (err) return logError(err)

        files.map((filename) => {
            const pathAbsolute = path.join(pathToDirectory, filename)

            fs.stat(pathAbsolute, (err, data) => {
                if(err) return logError(err)

                const isFile = data.isFile()

                if (isFile)
                    return file(path.join(pathToDirectory, filename), folderToUpload)
                directory(pathAbsolute, folderToUpload)
            })
        })

    })
}

export default directory