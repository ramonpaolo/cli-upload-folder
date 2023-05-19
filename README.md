# CLI Upload Folder

This CLI was made to upload local files and folders to AWS S3

## Why this was made?

This CLI was made to help people to make backup of your data, including files and folders

## How use?

You need in your environment variable:

- ACCESS_KEY_ID
- SECRET_ACCESS_KEY
- BUCKET
    - Name of bucket where you want to store the files
- STORAGE_CLASS
    - The name of Storage Class available in AWS S3
    - Available Values: `STANDARD`, `REDUCED_REDUNDANCY`, `STANDARD_IA`, `ONEZONE_IA`, `INTELLIGENT_TIERING`, `GLACIER`, `DEEP_ARCHIVE`, `OUTPOSTS`, `GLACIER_IR`, `SNOW`


After this, you can use the command:
```bash
$ cli-upload-folder --path-local ./Documents --path-upload ./Documents-Ramon
```

## Flags availables

```json
{
    "Flags": {
        "--path-local": {
            "required": true,
            "description": "This flag receive the local path on you machine to get the files and folders",
            "example": "cli-upload-folder --path-local ./Images/Images-Family",
        },
        "--path-upload": {
            "required": false,
            "description": "This flag receive the name of directory to upload on AWS S3",
            "example": "cli-upload-folder --path-local ./Documents --path-upload ./Name-Of-Directory-To-Store-On-S3"
        },
    }
}
```

## What technologies this project use?

- NodeJs >= 14.17
- NPM/Yarn
- TypeScript
- AWS
- Yargs

## How to help the project?

Simple, only open an issue and open a PR :)