import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Feature from '../components/Features';
import RecentList from '../components/RecentList';
import CustomerReviews from '../components/CustomerReview';
import { SpecialOffers } from '../components/SpecialOffers';
import Loading from '../components/Loading';

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);

    // Simulate loading for the page
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div>
            <Hero />
            <Feature />
            <RecentList />
            <CustomerReviews />
            <SpecialOffers />
        </div>
    );
};

export default Home;
