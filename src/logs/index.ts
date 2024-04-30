import { AuthorModel } from "../models/author.model";
import { BookModel } from "../models/book.model";
import { LogModel } from "../models/log.model";


export async function startLogging(){

    AuthorModel.watch([], {
        fullDocument: 'updateLookup',
        fullDocumentBeforeChange: 'whenAvailable'
    }).
    on('change',async (data) => {
        console.log(data);
        console.log('\nlastUpdated: ', data.fullDocument.lastUpdatedData)
        await LogModel.insertMany({
            item: data.documentKey._id,
            itemType: `${data.ns.db}.${data.ns.coll}`,
            action: data.fullDocument.lastUpdatedData.action,
            actionType: data.fullDocument.lastUpdatedData.actionType,
            operationType: data.operationType,
            user: data.fullDocument.lastUpdatedData.user,
            changes: data.updateDescription,
            description: data.fullDocument.lastUpdatedData.description,
            lastUpdatedMeta: data.fullDocument.lastUpdatedMeta
        });
        
    })

    BookModel.watch([], {
        fullDocument: 'updateLookup',
        fullDocumentBeforeChange: 'whenAvailable'
    })
    .on('change', async (data) => {
        console.log(data);
        await LogModel.insertMany({
            item: data.documentKey._id,
            itemType: `${data.ns.db}.${data.ns.coll}`,
            action: data.fullDocument.lastUpdatedData.action,
            actionType: data.fullDocument.lastUpdatedData.actionType,
            operationType: data.operationType,
            user: data.fullDocument.lastUpdatedData.user,
            changes: data.updateDescription,
            description: data.fullDocument.lastUpdatedData.description,
            lastUpdatedMeta: data.fullDocument.lastUpdatedMeta
        });
    })

}