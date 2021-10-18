import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route, Switch,useLocation } from 'react-router-dom'
import Modal from "./components/cardmodal/Modal";
import PModal from './components/publicModal/Modal'
import Home from "./components/Home";
import TrelloBoard from './components/TrelloBoard'

function App() {
  return (
    <Provider store={store}>
      <div className='app'>
      <Router>
        <ModalSwitch/>
      </Router>
      </div>
    </Provider>
  );
  function ModalSwitch() {
    let location = useLocation();
    let background = location.state && location.state.background;
    let listTitle = location.state && location.state.title;
    return (
      <div>
        <Switch location={background || location}>
          <Route exact path="/" children={<Home/>} />
          <Route exact path="/B/:boardID" children={<TrelloBoard/>} />
          <Route exact path="/C/:id" children={<Modal listTitle={listTitle} />} />
          <Route exact path="/P/:id" children={<PModal listTitle={listTitle} />} />
        </Switch>
  
        {/* Show the modal when a background page is set */}
        {background && <Route path='/C/:id' children={<Modal listTitle={listTitle} />} />}
      </div>
    );
  }
}
export default App;