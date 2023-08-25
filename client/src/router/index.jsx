import { createBrowserRouter, Outlet } from 'react-router-dom';
import AuthProvider from '../context/AuthProvider';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Error from '../pages/Error';
import ProtecedRoute from './ProtecedRoute';
import NoteList from '../components/folders/NoteList';
import Note from '../components/folders/Note';

const AuthLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

export default createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <Error />,
    children: [
      {
        element: <Login />,
        path: '/login',
      },
      {
        element: <ProtecedRoute />,
        children: [
          {
            element: <Home />,
            path: '/',
            loader: async () => {
              const query = `query Folders {
                folders {
                  id
                  createdAt
                  name
                }
              }`;
              const res = await fetch('http://localhost:4000/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({
                  query,
                }),
              });
              const { data } = await res.json();
              console.log('check data in api: ', data);
              return data;
            },
            children: [
              {
                element: <NoteList />,
                path: `folder/:folderId`,
                loader: async ({ params: { folderId } }) => {
                  console.log('check loader params: ', { folderId });
                  const query = `query Folder {
                    folder(folderId: $folderId) {
                      id
                      name
                    }
                  }`;
                  const res = await fetch('http://localhost:4000/graphql', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                    body: JSON.stringify({
                      query,
                      variants: {
                        folderId,
                      },
                    }),
                  });

                  const data = await res.json();
                  console.log('[check data note list]', data);
                  return data;
                },
                children: [
                  {
                    element: <Note />,
                    path: `note/:noteId`,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);
