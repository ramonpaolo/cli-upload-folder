import fs from 'fs'
import path from 'path'

import file from './file'

const directory = async (pathToDirectory: string, folderToUpload?: string) => {
    fs.readdir(pathToDirectory, 'utf-8', (err, files) => {
        if(err) return console.log(err)

        files.map((filename) => file(path.join(pathToDirectory, filename), folderToUpload))
    })
}

export default directory