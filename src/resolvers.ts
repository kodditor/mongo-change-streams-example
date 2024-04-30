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
                    user: '66304704242179c8c025d181',
                    action: 'create:books',
                    actionType: 'create',
                    description: 'User created a new book'
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
        updateBook:  async (_: any, { id, title, publisher }: any, ___: any, ____: any) => {
            const timestamp = new Date();
            await BookModel.findByIdAndUpdate({_id: id}, {
                ...(title ? { title: title } : {}),
                ...(publisher ? { publisher: publisher } : {}),
                ...({
                    lastUpdatedData: {
                        user: '66304704242179c8c025d183',
                        action: 'update:books',
                        actionType: 'update',
                        description: 'User updated the book',

                    },
                    lastUpdatedMeta: {
                        ipAddress: '1.2.3.4',
                        userAgent: 'something else like gecko',
                        origin: 'localhost:2',
                        timestamp: timestamp,
                    }
                })
            })
            return true;
        },
        createAuthor: async (_: any, { authorName }: any, ___: any, ____: any) => {
            const timestamp = new Date();
            await AuthorModel.insertMany({
                authorName: authorName,
                lastUpdatedData: {
                    user: '66304704242179c8c025d185',
                    action: 'create:authors',
                    actionType: 'create',
                    description: 'User created a new author'
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
        updateAuthor: async (_: any, { id, authorName }: any, ___: any, ____: any) => {
            const timestamp = new Date();
            await AuthorModel.findByIdAndUpdate({_id: id}, {
                authorName: authorName,
                lastUpdatedData: {
                    user: '6630d9989520209c21e02692',
                    action: 'update:authors',
                    actionType: 'update',
                    description: 'User updated the author',

                },
                lastUpdatedMeta: {
                    ipAddress: '1.2.3.4',
                    userAgent: 'Something else like gecko',
                    origin: 'localhost:2',
                    timestamp: timestamp,
                }
            })
            return true;
        }
    }
}