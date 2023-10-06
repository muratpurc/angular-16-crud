interface ITutorial {
    id: number;
    title: string;
    description: string;
    published: boolean;
}

interface IDataSource {

    getData(): Promise<any[]>;
    persistData(data:any[]): Promise<boolean>;

}

export {
    ITutorial,
    IDataSource
}