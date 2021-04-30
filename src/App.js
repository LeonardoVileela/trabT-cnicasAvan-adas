import React, { Component } from 'react'
import NavBar from './components/NavBar'
import BrandTable from './components/BrandTable'
import ProductTable from './components/ProductTable'
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom"

class App extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props)


  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/product">
              <NavBar></NavBar>
              <div className="container" style={{ marginTop: 20 }}>
                <ProductTable />
              </div>
            </Route>
            <Route path="/" >
              <NavBar></NavBar>
              <div className="container" style={{ marginTop: 20 }}>
                <BrandTable />
              </div>
            </Route>
          </Switch>

        </div>
      </BrowserRouter>
    )
  }
}

export default App







