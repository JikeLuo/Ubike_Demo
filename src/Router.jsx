import { lazy, Suspense } from 'react';

import Navbar from './component/navbar/Navbar'
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import useMediaQuery from './hooks/useMediaQuery';


const Information = lazy(() => import('./page/Information'))
const Introduce = lazy(() => import('./page/Introduce'))
const News = lazy(() => import('./page/News'))
const Payment = lazy(() => import('./page/Payment'))
const Activity = lazy(() => import('./page/Activity'))

const Main = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
`

function App() {
  const matches = useMediaQuery('(max-width: 950px)')
  return (
    <Main>
      <Navbar matches={matches} />
      <Suspense fallback={<div>loading</div>} >
        <Routes>
          <Route
            path='/'
            element={<Information matches={matches} />}
          />
          <Route
            path='information'
            element={<Information matches={matches} />}
          />
          <Route
            path='introduce'
            element={<Introduce />}
          />
          <Route
            path='news'
            element={<News />}
          />
          <Route
            path='payment'
            element={<Payment />}
          />
          <Route
            path='activity'
            element={<Activity />}
          />
        </Routes>

      </Suspense>
    </Main >
  );
}

export default App;
