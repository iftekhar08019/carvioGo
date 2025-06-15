import React from 'react';
import Hero from '../components/Hero';
import Feature from '../components/Features';
import RecentList from '../components/RecentList';

const Home = () => {
    return (
        <div>
            <Hero />
            <Feature />
            <RecentList />
        </div>
    );
};

export default Home;
