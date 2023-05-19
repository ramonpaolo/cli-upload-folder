import chalk from "chalk"

const logSuccess = (text: string) => console.log(chalk.green(text))

const logError = (text: Error | string) => console.log(chalk.red(text))

export {
    logSuccess,
    logError,
}