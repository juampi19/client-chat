
import {createBrowserRouter, Link, RouterProvider} from 'react-router-dom'
import './App.css'
import { Login } from './components/Login'
import { Chat } from './components/Chat'
import { useState } from 'react';



function App() {
  const [user, setUser] = useState(null);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <h1>Hello World</h1>
          <Link to="login">Login</Link>
        </div>
      ),
    },
    {
      path: "login",
      element: <Login setUser={setUser}/>,
    },
    {
      path: "chat",
      element: <Chat user={user}/>,
    },
  ]);

  return <RouterProvider router={routes} />
  
}

export default App
