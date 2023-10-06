import { Tutorial } from "../models/tutorial.model";

export class ResponseToTutorial {

    static convert(data: any): Array<Tutorial>
    {
        const instatiate = (data: any): Tutorial => {
            const tutorial = new Tutorial();
            tutorial.id = typeof data.id !== 'undefined' ? data.id : null;
            tutorial.title = typeof data.title === 'string' ? data.title : null;
            tutorial.description = typeof data.description === 'string' ? data.description : null;
            tutorial.published = typeof data.published === 'boolean' ? data.published : null;
        
            return tutorial;
        };

        if (Array.isArray(data)) {
            return data.map((item) => {
                return instatiate(item);
            })
        } else if (data && typeof data === 'object' && data.constructor === Object) {
            return [instatiate(data)];
        } else {
            return [instatiate({})];
        }
    }

}
