import React from 'react';
import Appoinment from './Appoinment';
import Header from './Header';
import InfoCards from './infoCard/InfoCards';
import Services from './Services/Services';
import Testimonials from './Testimonila/Testimonials';



const Home = () => {
    return (
     <main className="">
         <Header/>
        <InfoCards/>
        <Services/>
        <Appoinment/>
        <Testimonials/>
     </main>
    );
};

export default Home;