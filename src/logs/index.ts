import { AuthorModel } from "../models/author.model";
import { BookModel } from "../models/book.model";
import { LogModel } from "../models/log.model";

function generateLog(data: any) { // To make it truly typesafe, install the mongodb package and import type 'ChangeStreamDocument' then use generics to get the correct doc type.
  return {
    item: data.documentKey._id,
    itemType: `${data.ns.db}.${data.ns.coll}`,
    action: data.fullDocument.lastUpdatedData.action,
    actionType: data.fullDocument.lastUpdatedData.actionType,
    operationType: data.operationType,
    user: data.fullDocument.lastUpdatedData.user,
    changes: data.updateDescription,
    description: data.fullDocument.lastUpdatedData.description,
    createdAt: new Date(),
    lastUpdatedMeta: {
      ...data.fullDocument.lastUpdatedMeta,
      resumeToken: data._id,
    }
  }
}


export async function startLogging(){

    const latestAuthorLog = await LogModel.find({ itemType: 'amazon.authors' }).sort({ 'createdAt': 'desc'}).limit(1);
    const latestBookLog = await LogModel.find({ itemType: 'amazon.books' }).sort({ 'createdAt': 'desc'}).limit(1);
    

    AuthorModel.watch([], {
        fullDocument: 'updateLookup',
        fullDocumentBeforeChange: 'whenAvailable',
        resumeAfter: latestAuthorLog[0].lastUpdatedMeta?.resumeToken,
    }).
    on('change',async (data) => {
       const doc = await LogModel.insertMany(generateLog(data));
       console.log(doc) 
    })

    BookModel.watch([], {
        fullDocument: 'updateLookup',
        fullDocumentBeforeChange: 'whenAvailable',
        resumeAfter: latestBookLog[0].lastUpdatedMeta?.resumeToken,
    })
    .on('change', async (data) => {
        const doc = await LogModel.insertMany(generateLog(data));
        console.log(doc)
    })

}
