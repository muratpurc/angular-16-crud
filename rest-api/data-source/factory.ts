import { JsonDataSource } from './json-data-source';
import { IDataSource } from '../defines';

export class Factory
{

    static getDataSourceInstance(table: string, type: string = 'json'): IDataSource
    {
        switch (type) {
            case 'json':
                return new JsonDataSource(table);
            default:
                throw new Error(`Data source '${type}' not supported!`)
        }
    }

}