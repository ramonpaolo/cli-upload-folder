#!/usr/bin/env node

import dotenv from 'dotenv'
import fs from 'fs'
import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'

import directory from './directory'
import file from './file'
import { logError } from './utils'

dotenv.config()

const argv = yargs(hideBin(process.argv))
    .nargs('path-local', 1)
    .describe('path-local', 'path to local files')
    .nargs('path-upload', 1)
    .describe('path-upload', 'path to web files on S3')
    .demandOption(['path-local'])
    .help('h')
    .alias('h', 'help')
    .argv as any;

const path = argv['path-local']
const folderToUpload = argv['path-upload']

fs.stat(path, (err, data) => {
    if (err) return logError(err)

    const isDirectory = data.isDirectory()

    console.clear()

    if (isDirectory) return directory(path, folderToUpload)
    return file(path, folderToUpload)
})