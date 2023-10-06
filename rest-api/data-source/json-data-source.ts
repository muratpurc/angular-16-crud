import fs from 'fs';
import { IDataSource } from '../defines';

export class JsonDataSource implements IDataSource
{

    private tablesPath: string = 'db/%s.json';
    private currentTablePath: string = '';

    constructor(tableName: string)
    {
        this.currentTablePath = this.tablesPath.replace('%s', tableName);
        fs.access(this.currentTablePath, fs.constants.F_OK, (err) => {
            if (err) {
                throw err;
            }
        });
    }

    async getData(): Promise<any[]>
    {
        try {
            const data = fs.readFileSync(this.currentTablePath, 'utf-8');
            //console.log('JsonDataSource.getData() data', data);
            const json = JSON.parse(data);
            //console.log('JsonDataSource.getData() json', json);
            return typeof json.length !== 'undefined' ? json : [];
        } catch (err) {
            console.log('JsonDataSource.getData() err', err);
            return [];
        }
    }

    async persistData(data: any[]): Promise<boolean>
    {
        try {
            const jsonStr = JSON.stringify(data);
            await fs.writeFileSync(this.currentTablePath, jsonStr);
            return true;
        } catch (err) {
            console.log('JsonDataSource.persistData() err', err);
            return false;
        }
    }

}
