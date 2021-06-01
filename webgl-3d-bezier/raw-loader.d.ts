declare module '!!raw-loader!*' {
    const contents: string
    export = contents
}

declare module '*.glsl' {
    const contents: string
    export default contents
}
