import React from 'react';
import Hero from '../components/Hero';
import Feature from '../components/Features';
import RecentList from '../components/RecentList';
import CustomerReviews from '../components/CustomerReview';

const Home = () => {
    return (
        <div>
            <Hero />
            <Feature />
            <RecentList />
            <CustomerReviews />
        </div>
    );
};

export default Home;
