import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthContext } from './Context/AuthContext'
import { Homepage } from './Pages/Frontend/HomePage'
import { Protected } from './Pages/Frontend/Protected'
import { Signin } from './Pages/Backend/Signin'
import { Admin } from './Pages/Backend/Admin'
import Course from './Pages/Backend/Course'
import Job from './Pages/Backend/Job'
import Project from './Pages/Backend/Project'
import Reference from './Pages/Backend/Reference'
import Contact from './Pages/Backend/Contact'
import Skill from './Pages/Backend/Skill'

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
      path: "/admin/course",
      element: <Protected><Course /></Protected>
    },
    {
      path: "/admin/job",
      element: <Protected><Job /></Protected>
    },
    {
      path: "/admin/project",
      element: <Protected><Project /></Protected>
    },
    {
      path: "/admin/reference",
      element: <Protected><Reference /></Protected>
    },
    {
      path: "/admin/skill",
      element: <Protected><Skill /></Protected>
    },
    {
      path: "/admin/contact",
      element: <Protected><Contact /></Protected>
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