export class CommonCodeRes {
    code:number
    message?:string
    data?: any
}

export interface GetFileDownloadUrlRes {
    code:number
    data?:{
        checksums: any
        download_url:string
        sys_metadata: any
    }
    message?:string
}

export interface UploadFileRes {
    code:number
    data?:{
        file_token:string
    }
    message?:string
}
