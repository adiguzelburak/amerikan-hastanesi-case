import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { createBrowserRouter, RouterProvider } from "react-router"
import { store } from "./app/store"
import "./index.css"
import { HomePage } from "./pages/home/page"
import Layout from "./components/common/layout"
import { Toaster } from "./components/ui/sonner"
import { ThemeProvider } from "./context/theme-provider"
const container = document.getElementById("root")

const pages = [
  {
    path: "/",
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
]

const router = createBrowserRouter(pages)

if (container) {
  const root = createRoot(container)

  root.render(
    <StrictMode>
      <Provider store={store}>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
          <Toaster position="top-center" duration={1500} />
        </ThemeProvider>
      </Provider>
    </StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
