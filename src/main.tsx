import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { createBrowserRouter, RouterProvider } from "react-router"
import { App } from "./App"
import { store } from "./app/store"
import "./index.css"
import { HomePage } from "./pages/home/page"
const container = document.getElementById("root")

const pages = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/test",
    element: <App />,
  },
]

const router = createBrowserRouter(pages)

if (container) {
  const root = createRoot(container)

  root.render(
    <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
