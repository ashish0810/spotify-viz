export const debug = (message) => {
    console.log(message);
}

export const info = (message) => {
    console.log(message);
}

export const warn = (message) => {
    console.log(message);
}

export default Logger = {
    debug: debug,
    info: info,
    warn: warn,
}