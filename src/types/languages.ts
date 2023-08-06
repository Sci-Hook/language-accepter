export type languages = {
    "accepted-languages":string[],
    "default-language":string,
    "alternative-languages"?:{},
    "autocreate-lanuage-cookie"?:{
        name:string,
        expires:number
    },
    "language-info-locations"?:string[]
}