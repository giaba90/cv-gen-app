import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthContext } from './Context/AuthContext'
import { Homepage } from './Pages/Frontend/HomePage'
import { Protected } from './Pages/Frontend/Protected'
import { Signin } from './Pages/Backend/Signin'
import Admin from './Pages/Backend/Admin'
import Course from './Pages/Backend/Course'
import Job from './Pages/Backend/Job'
import Project from './Pages/Backend/Project'
import Reference from './Pages/Backend/Reference'
import Contact from './Pages/Backend/Contact'
import Skill from './Pages/Backend/Skill'
import MyProfile from './Pages/Backend/MyProfile'
import theme from './theme'

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
      path: "/admin/istruzione",
      element: <Protected><Course /></Protected>
    },
    {
      path: "/admin/esperienze",
      element: <Protected><Job /></Protected>
    },
    {
      path: "/admin/progetti",
      element: <Protected><Project /></Protected>
    },
    {
      path: "/admin/recensioni",
      element: <Protected><Reference /></Protected>
    },
    {
      path: "/admin/competenze",
      element: <Protected><Skill /></Protected>
    },
    {
      path: "/admin/contatti",
      element: <Protected><Contact /></Protected>
    },
    {
      path: "/admin/profilo",
      element: <Protected><MyProfile /></Protected>
    },
    {
      path: "/signin",
      element: <Signin></Signin>
    }
  ])

  return (
    <ChakraProvider theme={theme}>
      <AuthContext>
        <RouterProvider router={router}></RouterProvider>
      </AuthContext>
    </ChakraProvider>
  )
}

export default App