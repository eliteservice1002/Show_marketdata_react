import React, { 
  useState, 
  useEffect,
} from 'react';

import {
  Row,
  Col,
  Button,
  Dropdown, DropdownMenu, DropdownToggle, DropdownItem,
} from 'reactstrap';

import { APIControlUrl, APIUrl, exchanges, coins_a, coins_b } from '../config.jsx';
import './Control.css';


const Control = () => {

  const [ form, setForm ] = useState({})
  const [ data, setData ] = useState([])
  const [ dropdownOpen, setDropdownOpen ] = useState({
    exchange_a: false,
    exchange_b: false,
    coin_a: false,
    coin_b: false,
  })

  useEffect(() => {
    const date = new Date()
    const from_date = date.toISOString().substring(0, 10)
    const from_time = date.toTimeString().split(' ')[0]
    document.getElementById('timestamp_from_date').value = from_date
    document.getElementById('timestamp_from_time').value = from_time
    document.getElementById('timestamp_to_date').value = from_date
    document.getElementById('timestamp_to_time').value = from_time

    setForm({
      timestamp_from_date: from_date,
      timestamp_from_time: from_time,
      timestamp_to_date: from_date,
      timestamp_to_time: from_time,
    })

    const fetchData = async() => {
      const resp = await fetch(APIUrl + 'instances')
      const status = await resp.json()
      setData(status)
    }

    fetchData()

  }, [])

  const updateForm = data => {
    const field = data.name
    const value = data.value
    setForm(form => ({
        ...form,
        [field]: value,
    }))
  }

  const sendForm = async () => {
    const data = {
      ...form,
      id: parseInt(Math.random() * 1000000),
      timestamp_start: new Date().toISOString().substr(0,18),
      timestamp_from: (form.timestamp_from_date ? form.timestamp_from_date : '') + (form.timestamp_from_time ? ('T' + form.timestamp_from_time) : '') ,
      timestamp_to: (form.timestamp_to_date ? form.timestamp_to_date : '') + (form.timestamp_to_time ? ('T' + form.timestamp_to_time) : ''),
    }

    const resp = await fetch(APIControlUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const status = await resp.json()
    console.log("RESPONSE:", status)

    const post = await fetch(APIUrl + 'instance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(status),
    })

    const postStatus = await post.json() 
    console.log("POST:", postStatus)

    setData(data => [
      status,
      ...data,
    ])
  }

  const dropdownToggle = (name) => {
    setDropdownOpen(prev => { 
      return({
        ...prev, 
        [name]: !prev[name]
      })
    })
  }


  return (
          <div className="Control">
            <div className="container">

              <form name="controlForm">
                
                <Row>
                  <Col className="labels">
                    <label for="timestamp_from_date" className="label">Start time</label>
                  </Col>
                  <Col className="inputs">
                    &nbsp;<input name="timestamp_from_date" id="timestamp_from_date" type="date" onChange={(e)=>updateForm(e.target)} />
                    &nbsp;<input name="timestamp_from_time" id="timestamp_from_time" type="time" onChange={(e)=>updateForm(e.target)} />
                  </Col>
                </Row>

                <Row>
                  <Col className="labels">
                    <label for="timestamp_to_date">End time</label>
                  </Col>
                  <Col className="inputs">
                    &nbsp;<input name="timestamp_to_date" id="timestamp_to_date" type="date" onChange={(e)=>updateForm(e.target)} />
                    &nbsp;<input name="timestamp_to_time" id="timestamp_to_time" type="time" onChange={(e)=>updateForm(e.target)} />
                  </Col>
                </Row>

                <Row>
                  <Col className="labels">
                    <label for="exchange_a">Exchange A</label>
                  </Col>
                  <Col className="inputs">

                    <Dropdown isOpen={dropdownOpen["exchange_a"]} toggle={()=>dropdownToggle("exchange_a")}>
                      <DropdownToggle caret>
                        {form.exchange_a || 'Select one'}
                        </DropdownToggle>
                      <DropdownMenu>
                        {
                          exchanges.map((exchange, i) => {
                            return <DropdownItem selected={exchange.value === form.exchange_a} key={i} onClick={()=>updateForm({
                              name: 'exchange_a', value: exchange.value
                            })}>
                              {exchange.name}
                            </DropdownItem>
                          })
                        }
                      </DropdownMenu>
                    </Dropdown>

                  </Col>
                </Row>

                <Row>
                  <Col className="labels">
                    <label for="exchange_b">Exchange B</label>
                  </Col>
                  <Col className="inputs">

                    <Dropdown isOpen={dropdownOpen["exchange_b"]} toggle={()=>dropdownToggle("exchange_b")}>
                      <DropdownToggle caret>
                        {form.exchange_b || 'Select one'}
                        </DropdownToggle>
                      <DropdownMenu>
                        {
                          exchanges.map((exchange, i) => {
                            return <DropdownItem selected={exchange.value === form.exchange_b} key={i} onClick={()=>updateForm({
                              name: 'exchange_b', value: exchange.value
                            })}>
                              {exchange.name}
                            </DropdownItem>
                          })
                        }
                      </DropdownMenu>
                    </Dropdown>

                  </Col>
                </Row>

                <Row>
                  <Col className="labels">
                    <label for="coin_a">Coin A</label>
                  </Col>
                  <Col className="inputs">

                    <Dropdown isOpen={dropdownOpen["coin_a"]} toggle={()=>dropdownToggle("coin_a")}>
                      <DropdownToggle caret>
                        {form.coin_a || 'Select one'}
                        </DropdownToggle>
                      <DropdownMenu>
                        {
                          coins_a.map((coin, i) => {
                            return <DropdownItem selected={coin === form.coin_a} key={i} onClick={()=>updateForm({
                              name: 'coin_a', value: coin
                            })}>
                              {coin}
                            </DropdownItem>
                          })
                        }
                      </DropdownMenu>
                    </Dropdown>

                  </Col>
                </Row>

                <Row>
                  <Col className="labels">
                    <label for="coin_b">Coin B</label>
                  </Col>
                  <Col className="inputs">

                    <Dropdown isOpen={dropdownOpen["coin_b"]} toggle={()=>dropdownToggle("coin_b")}>
                      <DropdownToggle caret>
                        {form.coin_b || 'Select one'}
                        </DropdownToggle>
                      <DropdownMenu>
                        {
                          coins_b.map((coin, i) => {
                            return <DropdownItem selected={coin === form.coin_b} key={i} onClick={()=>updateForm({
                              name: 'coin_b', value: coin
                            })}>
                              {coin}
                            </DropdownItem>
                          })
                        }
                      </DropdownMenu>
                    </Dropdown>

                  </Col>
                </Row>

                <Row>
                  <Col className="labels">
                    <label for="account_a">Account A</label>
                  </Col>
                  <Col className="inputs">
                    &nbsp;<input name="account_a" type="text" onChange={(e)=>updateForm(e.target)} />
                  </Col>
                </Row>

                <Row>
                  <Col className="labels">
                    <label for="account_b">Account B</label>
                  </Col>
                  <Col className="inputs">
                    &nbsp;<input name="account_b" type="text" onChange={(e)=>updateForm(e.target)} />
                  </Col>
                </Row>

                <Row>
                  <Col className="labels">
                    <label for="derrumbe">Derrumbe</label>
                  </Col>
                  <Col className="inputs">
                    &nbsp;<input name="derrumbe" type="text" onChange={(e)=>updateForm(e.target)} />
                  </Col>
                </Row>


                <Row>
                  <Col className="labels">
                    <label for="highest_fee">Highest fee</label>
                  </Col>
                  <Col className="inputs">
                    &nbsp;<input name="highest_fee" type="text" onChange={(e)=>updateForm(e.target)} />
                  </Col>
                </Row>

                <Row>
                  <Col className="labels">
                    <label for="min_investment_amount">Min investment amount</label>
                  </Col>
                  <Col className="inputs">
                    &nbsp;<input name="min_investment_amount" type="text" onChange={(e)=>updateForm(e.target)} />
                  </Col>
                </Row>

                <Row>
                  <Col className="labels">
                    <label for="max_invesment_amount">Max investment amount</label>
                  </Col>
                  <Col className="inputs">
                    &nbsp;<input name="max_invesment_amount" type="text" onChange={(e)=>updateForm(e.target)} />
                  </Col>
                </Row>

                <Row>
                  <Col className="labels">
                    <label for="total_investment">Total investment</label>
                  </Col>
                  <Col className="inputs">
                    &nbsp;<input name="total_investment" type="text" onChange={(e)=>updateForm(e.target)} />
                  </Col>
                </Row>

                <Row>
                  <Col className="labels">
                    <label for="total_investment_by_market">Total investment by market</label>
                  </Col>
                  <Col className="inputs">
                    &nbsp;<input name="total_investment_by_market" type="text" onChange={(e)=>updateForm(e.target)} />
                  </Col>
                </Row>


                <Row>
                  <Col className="labels">
                    <label for="sell_market_min_cost">Sell market min cost</label>
                  </Col>
                  <Col className="inputs">
                    &nbsp;<input name="sell_market_min_cost" type="text" onChange={(e)=>updateForm(e.target)} />
                  </Col>
                </Row>

                <Row>
                  <Col className="labels">
                    <label for="buy_market_max_cost">Buy market max cost</label>
                  </Col>
                  <Col className="inputs">
                    &nbsp;<input name="buy_market_max_cost" type="text" onChange={(e)=>updateForm(e.target)} />
                  </Col>
                </Row>


                <Row className="center">
                  <Button className="button" onClick={()=>sendForm()}>START BOT</Button>
                </Row>
              </form>


              <table>
                <tr className='header'>
                  <td>ID</td>
                  <td>Start</td>
                  <td>End</td>
                  <td>Exchange A</td>
                  <td>Exchange B</td>
                  <td>Coin A</td>
                  <td>Coin B</td>
                  <td>Account A</td>
                  <td>Account B</td>
                  <td>Derrumbe</td>
                  <td>Highest fee</td>
                  <td>Min inv amount</td>
                  <td>Max inv amount</td>
                  <td>Total inv</td>
                  <td>Total by mark</td>
                  <td>Sell min</td>
                  <td>Buy max</td>
                </tr>
                { data.map(line => {
                  return (
                    <tr>
                      <td>{line.id}</td>
                      <td>{line.timestamp_from}</td>
                      <td>{line.timestamp_to}</td>
                      <td>{line.exchange_a}</td>
                      <td>{line.exchange_b}</td>
                      <td>{line.coin_a}</td>
                      <td>{line.coin_b}</td>
                      <td>{line.account_a}</td>
                      <td>{line.account_b}</td>
                      <td>{line.derrumbe}</td>
                      <td>{line.highest_fee}</td>
                      <td>{line.min_investment_amount}</td>
                      <td>{line.max_investment_amount}</td>
                      <td>{line.total_investment}</td>
                      <td>{line.total_investment_by_market}</td>
                      <td>{line.sell_market_min_cost}</td>
                      <td>{line.buy_market_max_cost}</td>
                    </tr>
                    )
                })
                }
              </table>
            </div>
          </div>
  );
}

export default Control;
