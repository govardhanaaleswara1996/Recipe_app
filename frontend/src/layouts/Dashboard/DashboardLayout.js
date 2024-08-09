import { useOutlet } from "react-router-dom";
import Header from "../../components/dashboard/Header";
import RecipesList from "../../components/dashboard/RecipesList";
import Footer from "../../components/dashboard/Footer";
import CategoryList from "../../components/dashboard/CategoryList";
import AddRecipe from "../../components/addRecipe/AddEditRecipe";
import ViewRecipe from "../../components/viewRecipe/ViewRecipe";
import Dashboard from "../../components/dashboard/Dashboard";

const DashboardLayout = () => {
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

export default DashboardLayout;