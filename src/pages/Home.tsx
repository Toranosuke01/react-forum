import Header from '../components/Header';
import ThreadList from '../components/ThreadList';
import { Suspense } from 'react';

function Home() {
  return (
    <div className="App">
      <Header />
      <Suspense fallback={<p>Now Loading...</p>}>
        <ThreadList />
      </Suspense>
    </div>
  );
}

export default Home;
