import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthContext } from './Context/AuthContext'
import { Protected } from './Routes/Protected'
import { Signin } from './Routes/Signin'
import { Homepage } from './Routes/HomePage'
import { Admin } from './Routes/Admin'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />
    },
    {
      path: "/admin",
      element: <Protected><Admin /></Protected>
    },
    {
      path: "/signin",
      element: <Signin></Signin>
    }
  ])

  return (
    <AuthContext>
      <RouterProvider router={router}></RouterProvider>
    </AuthContext>
  )
}

export default App