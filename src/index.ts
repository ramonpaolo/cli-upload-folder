import dotenv from 'dotenv'
import fs from 'fs'
import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'

import directory from './directory'
import file from './file'

dotenv.config()

const argv = yargs(hideBin(process.argv))
    .command('bucket [name]', 'name of bucket', (yargs) => {
        return yargs
            .positional('bucket', {
                describe: 'where will be upload the files',
                default: process.env.BUCKET,
            })
    })
    .command('path-local [path]', 'local path of files or folders', (yargs) => {
        return yargs
            .positional('path-local', {
                describe: 'path to local files',
                default: './',
            })
    })
    .command('path-upload [path]', 'web path on S3', (yargs) => {
        return yargs
            .positional('path-upload', {
                describe: 'path to store files on S3',
                default: '/',
            })
    })
    .parse() as any

const path = argv['path-local']
const folderToUpload = argv['path-upload']

fs.stat(path, (err, data) => {
    if (err) return console.error(err)

    const isDirectory = data.isDirectory()

    console.clear()

    if (isDirectory) return directory(path, folderToUpload)
    return file(path, folderToUpload)
})