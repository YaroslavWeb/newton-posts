// API
export interface IPost {
    readonly userId         : number
    readonly id             : number
    title                   : string
    body                    : string
}

export interface IComment {
    readonly postId         : number
    readonly id             : number
    name                    : string
    email                   : string
    body                    : string
}

// Компоненты 
export interface IHome {
    posts                   : IPost[]
    countPage               : number
    curPage                 : number
    isLoaded                : boolean
}