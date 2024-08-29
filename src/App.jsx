import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthContext } from './Context/AuthContext'
import { Homepage } from './Pages/Frontend/HomePage'
import { Protected } from './Pages/Frontend/Protected'
import { Signin } from './Pages/Backend/Signin'
import { Admin } from './Pages/Backend/Admin'


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