import { Tutorial } from "../models/tutorial.model";
import { ResponseToTutorial } from "./response-to-tutorial";

export class Response {

    private _success:boolean = false;
    private _message:string = '';
    private _data:any = null;

    public get success(): boolean
    {
        return this._success;
    }

    public set success(value:boolean)
    {
        this._success = value;
    }

    public get message(): string
    {
        return this._message;
    }

    public set message(value:string)
    {
        this._message = value;
    }

    public get data(): any
    {
        return this._data;
    }

    public set data(value:any)
    {
        this._data = value;
    }

    constructor(response: any)
    {
        this.success = typeof response.success !== 'undefined' && response.success === 'true';
        this.message = typeof response.message !== 'undefined' ? response.message : '';
        this.data = typeof response.data !== 'undefined' ? response.data : null;
    }

    public hasError(): boolean
    {
        return !this.success;
    }

    public toTutorial(): Array<Tutorial>
    {
        return ResponseToTutorial.convert(this.data);
    }

}
