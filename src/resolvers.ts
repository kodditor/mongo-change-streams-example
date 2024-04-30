import { AuthorModel } from "./models/author.model";
import { BookModel } from "./models/book.model"


export const SchemaResolvers = {
    Query: {
        books: async (_: any, __: any, ___: any, ____: any) => {
            return BookModel.find();
        },
        getBook: async(_: any, { id }: any, ___: any, ____: any) => {
            await BookModel.findById(id);
        },

        authors: async (_: any, __: any, ___: any, ____: any) => {
            return AuthorModel.find();
        },
        getAuthor: async (_: any, { id }: any, ___: any, ____: any) => {
            return BookModel.findById(id);
        }, 
    },
    Mutation: {
        createBook: async (_: any, { title, publisher, authorId }: any, ___: any, ____: any) => {
        
            const timestamp = new Date();
            await BookModel.insertMany({
                title: title,
                publisher: publisher,
                author: authorId,
                lastUpdatedData: {
                    user: 'test-user-1',
                    action: 'create:books',
                    actionType: 'create',
                    description: 'User created a new Book'
                },
                lastUpdatedMeta: {
                    ipAddress: '1.1.1.1',
                    userAgent: 'Something like gecko',
                    origin: 'localhost',
                    timestamp: timestamp,
                },
                createdAt: timestamp
            })
            return true;
        },
        createAuthor: async (_: any, { authorName }: any, ___: any, ____: any) => {
            const timestamp = new Date();
            await AuthorModel.insertMany({
                authorName: authorName,
                lastUpdatedData: {
                    user: 'test-user-2',
                    action: 'create:authors',
                    actionType: 'create',
                    description: 'User created a new Book'
                },
                lastUpdatedMeta: {
                    ipAddress: '1.1.1.1',
                    userAgent: 'Something like gecko',
                    origin: 'localhost',
                    timestamp: timestamp,
                },
                createdAt: timestamp
            })
            return true;
        },
    }
}