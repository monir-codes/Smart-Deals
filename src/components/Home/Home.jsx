import React from 'react';
import LatestProducts from '../LatestProducts/LatestProducts';
import HeroSection from '../HeroSection/HeroSection';

const Home = () => {
    const latestProductsPromise = fetch("http://localhost:3000/latest-products").then(res=> res.json());

    return (
        <div>
            <HeroSection></HeroSection>
            <LatestProducts latestProductsPromise={latestProductsPromise}></LatestProducts>
        </div>
    );
};

export default Home;