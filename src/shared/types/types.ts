export type Product = {
    "name": string,
    "image":  File | null | string,
    "type": string,
    "id"?: string
}

export type InputType = 'text' | 'file'