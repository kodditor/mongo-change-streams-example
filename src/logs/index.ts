import { AuthorModel } from "../models/author.model";
import { BookModel } from "../models/book.model";


export async function startLogging(){

    AuthorModel.watch([], {
        fullDocument: 'updateLookup',
        fullDocumentBeforeChange: 'whenAvailable'
    } ).
    on('change',(data) => {
        console.log(data)
    })

    BookModel.watch()
    .on('change', (data) => {
        console.log(data)
    })

}