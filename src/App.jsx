import './styles/App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import  AuthContext  from '../src/context/AuthContext'
import HomePage from './pages/Frontend/HomePage'
import Protected  from './pages/Frontend/Protected'
import Signin  from './pages/Backend/Signin'
import Admin from './pages/Backend/Admin'
import Course from './pages/Backend/Course'
import Job from './pages/Backend/Job'
import Project from './pages/Backend/Project'
import Reference from './pages/Backend/Reference'
import Contact from './pages/Backend/Contact'
import Skill from './pages/Backend/Skill'
import MyProfile from './pages/Backend/MyProfile'
import theme from './theme'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />
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