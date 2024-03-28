import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import Quizes from "./Pages/Quizes";
import { Toaster } from "react-hot-toast";


function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home></Home>
    },
    {
      path: "/quiz/:name",
      element: <Quizes/>
    }
  ])
  return (
    <div className="">
      <Toaster/>
      <RouterProvider router={router}>

      </RouterProvider>
    </div>
  );
}

export default App;
