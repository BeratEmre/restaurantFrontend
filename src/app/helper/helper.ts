export default class Helper {
    static isEmpty(str:any):boolean {
        return (!str || str.length === 0)?true:false;
    }
}