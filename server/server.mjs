import express from 'express';
import http from 'http';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import bodyParser from 'body-parser';
import fakeData from './fakeData/index.js';

const app = express();
const httpServer = http.createServer(app);

// mô tả dữ liệu gồm những dữ liệu gì
const typeDefs = `
    type Folder {
        id: String,
        name: String,
        createdAt: String,
        author: Author,
        notes: [Note]
    }

    type Author {
        id: String,
        name: String,
    }

    type Note {
        id: String,
        content: String
    }

    type Query {
        folders: [Folder]
        folder(folderId: String): Folder
    }
`;
// xử lý dữ liệu và trả về dữ liệu cho client
const resolvers = {
  Query: {
    folders: () => {
      return fakeData.folders;
    },
    folder: (parent, args) => {
      const folderId = args.folderId;
      return fakeData.folders.find((folder) => folder.id === folderId);
    },
  },
  Folder: {
    author: (parent, args, context, info) => {
      console.log('check data in line 37: ', { parent, args });
      const authorId = parent.authorId;
      return fakeData.authors.find((author) => author.id === authorId);
    },
    notes: (parent, args) => {
      console.log('check parent note list in line 56: ', parent.id);
      const noteId = parent.id;
      console.log(
        'check note id in line 58: ',
        fakeData.notes.filter((note) => {
          console.log('check note id in line 61', note.id);
          return note.folderId === noteId;
        }),
      );
      return fakeData.notes.filter((note) => note.folderId === noteId);
    },
  },
};

//schema
//resolvers

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(cors(), bodyParser.json(), expressMiddleware(server));

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log('🚀 Server ready at http://localhost:4000');
