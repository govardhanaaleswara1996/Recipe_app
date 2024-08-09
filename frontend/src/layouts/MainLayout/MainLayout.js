import React from 'react';
import { useOutlet } from 'react-router-dom';
import Header from '../../components/dashboard/Header';
import Footer from '../../components/dashboard/Footer';


const MainLayout = () => {
    const outlet = useOutlet();
    return (<div>
        <header>
          <Header/>
        </header>
      
        <main>  
            {outlet}
            {/* <Dashboard/> */}
        {/* <CategoryList/>              
            <RecipesList /> */}
            {/* <AddRecipe/> */}
            {/* <ViewRecipe/>               */}
        </main>
       
        <footer>
            <Footer/>
        </footer>

    </div>);
};

export default MainLayout;