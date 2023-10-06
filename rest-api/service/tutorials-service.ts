import { IDataSource, ITutorial } from '../defines';
import { Factory } from '../data-source/factory';

export class TutorialService {

    private tutorials: Array<ITutorial> = [];
    private dataSource: IDataSource;

    private constructor()
    {
        this.dataSource = Factory.getDataSourceInstance('tutorials');
    }

    static async createInstance(): Promise<TutorialService>
    {
        const service = new TutorialService();
        await service.loadTutorials();
        return service;
    }
    

    private async loadTutorials()
    {
        this.tutorials = await this.dataSource.getData();
        //console.log('TutorialService.loadTutorials() this.tutorials', this.tutorials);
    }

    private async saveTutorials()
    {
        const result = await this.dataSource.persistData(this.tutorials);
    }

    fetchAll(): Array<ITutorial>
    {
        //console.log('TutorialService.fetchAll() this.tutorials', this.tutorials);
        return this.tutorials;
    }

    findByTitle(value:string): Array<ITutorial>
    {
        return this.tutorials.filter((item) => {
            if (item.title.indexOf(value) !== -1) {
                return item;
            }
        });
    }

    fetchById(id:number): Array<ITutorial>
    {
        return this.tutorials.filter((item) => {
            if (item.id === id) {
                return item;
            }
        });
    }

    add(title:string, description:string, published:boolean): number
    {
        let id = this.tutorials.length + 1;
        this.tutorials.push({
            id: id,
            title: title,
            description: description,
            published: published
        });
        this.saveTutorials();
        return id;
    }

    update(id:number, title:string, description:string, published:boolean): boolean
    {
        const result = this.tutorials.map((item, index) => {
            if (item.id === id) {
                this.tutorials[index].title = title;
                this.tutorials[index].description = description;
                this.tutorials[index].published = published;
                this.saveTutorials();
                return true;
            }
        });
        return result.length > 0;
    }

    delete(id:number): boolean
    {
        let pos = this.tutorials.map((item, index) => {
            if (item.id === id) {
                return index;
            }
        });
        if (pos && pos[0]) {
            this.tutorials.slice(0, pos[0]);
            this.saveTutorials();
            return true;
        }
        return false;
    }

    deleteAll(): boolean
    {
        if (this.tutorials.length) {
            this.tutorials = [];
            this.saveTutorials();
            return true;
        }
        return false;
    }

}
