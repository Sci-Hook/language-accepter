export {};

declare global {
    interface Array<T> {
        syncForEach(any,ending_function?): Array<T>;
    }
}

Array.prototype.syncForEach = function<T>(this: T[], callback: any,ending_function?:any): any {
    return new Promise<any>((resolve, reject) => {
        let index = -1;
        const next = () => {
            index++;     
            if (this.length > index) {
                if (this.length > 0) {
                    callback(this[index], next,index+1,this.length);
                }
            }else{
                if (ending_function) ending_function();
            }
        }
        next();
    });
}