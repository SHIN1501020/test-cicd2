import { Suspense } from 'react';
import Loading from './components/Loading';
import { Outlet } from 'react-router';
import './App.css';

export default function App() {
  return (
    <div className='wrap'>
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </div>
  );
}
