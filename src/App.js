import About from "./components/About";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Portofolio from "./components/Portofolio";
import SocialLinks from "./components/SocialLinks";

function App() {
  return (
   <div>
      <NavBar/>
      <Home/>
      <About/>
      <Portofolio/>
      <Experience/>
      <Contact/>
      
      <SocialLinks/>
   </div>
  );
}

export default App;
