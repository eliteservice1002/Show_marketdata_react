import React from 'react';

import {
  Container,
  Row,
  Col,
  Button,
} from 'reactstrap';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';

import Tickers from './pages/Tickers';
import Results from './pages/Results';
import Control from './pages/Control';
import Historic from './pages/Historic';
import Opportunity from './pages/Opportunity';
import OppCertification from './pages/OppCertification';
import ResultCertification from './pages/ResultCertification';

const App = () => {

  return (
    <Container>
      <Router>
        <Row className="header-Div">
          <Col xs="2" className="header_menu">
            <Button>
              <Link to='/control'>Control bot</Link>
            </Button>
          </Col>
          <Col xs="2" className="header_menu">
            <Button>
              <Link to='/tickers'>Tickers</Link>
            </Button>
          </Col>
          <Col xs="2" className="header_menu">
            <Button>
              <Link to='/opportunity'>Opportunity</Link>
            </Button>
          </Col>
          <Col xs="2" className="header_menu">
            <Button>
              <Link to='/oppcertification'>Opp Certification</Link>
            </Button>
          </Col>
          <Col xs="2" className="header_menu">
            <Button>
              <Link to='/results'>Results</Link>
            </Button>
          </Col>
          <Col xs="2" className="header_menu">
            <Button>
              <Link to='/resultcertification'>Results Certification</Link>
            </Button>
          </Col>
          <Col xs="2" className="header_menu">
            <Button>
              <Link to='/historic'>Historic</Link>
            </Button>
          </Col>
          
        </Row>

        <Switch>
          <Route path='/tickers'>
            <Tickers />
          </Route>
          <Route path='/control'>
            <Control />
          </Route>
          <Route path='/opportunity'>
            <Opportunity />
          </Route>
          <Route path='/oppcertification'>
            <OppCertification />
          </Route>
          <Route path='/results'>
            <Results />
          </Route>
          <Route path='/resultcertification'>
            <ResultCertification />
          </Route>
          <Route path='/historic'>
            <Historic />
          </Route>
          
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
