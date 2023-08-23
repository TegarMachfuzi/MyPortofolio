import About from "./components/About";
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

      <SocialLinks/>
   </div>
  );
}

export default App;
