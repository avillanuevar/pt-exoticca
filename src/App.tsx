import React from 'react';
import HomeCarousel from './view/homeCarousel/homeCarousel';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './App.css';
 

function App() {
  const queryClient = new QueryClient();
  return (
    <div className="App" role='app'>
      <QueryClientProvider client={queryClient}>
        <HomeCarousel/>
      </QueryClientProvider>
    </div>
  );
}

export default App;
