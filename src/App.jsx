import './App.css';
import './style/footer.css';
import './style/header.css';
import './style/conteiner.css'
import Header from './components/Header.jsx'
import Container from './components/Container.jsx'
import Footer from './components/Footer.jsx'
function App() {


  return (
    <>
      <div className="main">
          <div className="header"><Header/></div>
          <div className="container"><Container/></div>
          <div className="footer"><Footer/></div>
      </div>
    </>
  )
}

export default App
