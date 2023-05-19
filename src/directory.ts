import { exec } from 'child_process'
import fs from 'fs'

const directory = async (path: string) => {
    console.log(path)

    exec(`cd ${path} && ls -la`, (err, stdout, stderr) => {
        if(err){
            console.log(err)
            console.log(stderr)
            return 0;
        }
        
        console.log(stdout)
    })
}

export default directory