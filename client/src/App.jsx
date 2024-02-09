import { useRef, useEffect } from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Navbar from './components/NavBar';
import Auth from './utils/auth';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  if (!Auth.loggedIn()) { return; }

  const token = Auth.getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const videoRef = useRef(null);

  useEffect(() => {
    // Set the playback rate to 0.5 to slow down the video
    if (videoRef.current) {
      videoRef.current.playbackRate = 1;
    }
  }, []);

  return (
    <>
      <ApolloProvider client={client}>
        <div className="app-background">
          <video autoPlay loop muted playsInline className="background-video" ref={videoRef}>
            <source src="/sproutsedited.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <Navbar />
          <main>
            <Outlet />
          </main>
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;