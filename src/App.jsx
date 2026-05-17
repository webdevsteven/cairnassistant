import { createHashRouter, RouterProvider, Outlet, useLocation } from 'react-router-dom'
import BottomNav from './components/layout/BottomNav'
import CharactersPage from './pages/CharactersPage'
import CreationWizardPage from './pages/CreationWizardPage'
import CharacterSheetPage from './pages/CharacterSheetPage'
import RulesPage from './pages/RulesPage'

function Layout() {
  const location = useLocation()
  const hideNav = location.pathname.startsWith('/create')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', background: '#0c0a09' }}>
      <main style={{
        flex: 1,
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        paddingBottom: hideNav ? 0 : '4rem'
      }}>
        <Outlet />
      </main>
      {!hideNav && <BottomNav />}
    </div>
  )
}

const router = createHashRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <CharactersPage /> },
      { path: '/create', element: <CreationWizardPage /> },
      { path: '/character/:id', element: <CharacterSheetPage /> },
      { path: '/rules', element: <RulesPage /> },
    ]
  }
])

export default function App() {
  return <RouterProvider router={router} />
}
