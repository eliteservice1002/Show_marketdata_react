import React, { 
  useState, 
  useEffect,
} from 'react';

import { APIUrl, exchanges, pairs } from '../config.js';
import './Tickers.css';

const Tickers = () => {

  const [ data, setData ] = useState([])
  const [ selectedPairs, setSelectedPairs ] = useState([])
  const [ selectedExchanges, setSelectedExchanges ] = useState([])
  const [ pairsAll, setPairsAll] = useState(true)
  const [ exchangesAll, setExchangesAll ] = useState(true)


  useEffect(()=>{
    const fetchData = async () => {
      const url = APIUrl + 'data' +
        '?exchanges=' + selectedExchanges.map(sel=>sel) 
        + '&pairs=' + selectedPairs.map(sel=>sel)
        + '&limit=50'
      console.log("URL:", url)
      const resp = await fetch(url)
      const newData = await resp.json()
      setData(newData)
    }

    fetchData()
    
  }, [selectedPairs, selectedExchanges])


  const queryPairs = (e) => {

    if (e.target.value === 'all') {
      setPairsAll(e.target.checked)
      selectedExchanges(exchanges)
      return
    }

    if (!e.target.checked) {
      let value = e.target.value
      setSelectedPairs(pairs => (
        pairs.filter(sel => sel !== value)
      ))
    }

    if (e.target.checked) {
      let value = e.target.value
      setSelectedPairs(pairs => (
        [
          ...pairs,
          value
        ]
      ))
  
    }


  }

  const queryExchanges = (e) => {
    if (!e.target.checked) {
      let value = e.target.value
      setSelectedExchanges(exchs => (
        exchs.filter(sel => sel !== value)
      ))
    }
    if (e.target.checked) {
      let value = e.target.value
      setSelectedExchanges(exchs => (
        [
          ...exchs,
          value
        ]
      ))
    }
  }

  return (
          <div className="Tickers">
            <div className="container">

              <div>
                <h3>Pares</h3>
      {/*            <span>
                    <input type="checkbox" id="pairs" name="pairs" value="all" 
                      onClick={(e)=>queryPairs(e)}
                      checked={pairsAll ? 'true' : 'false'}/>
                    <label for="pairs"> Todos</label>   
                  </span>
        */}
                {
                  pairs.map(pair => {
                    return <span>
                      <input type="checkbox" id={pair.name} name={pair.name} value={pair.value} 
                        onClick={(e)=>queryPairs(e)}
                        checked={selectedPairs.includes(pair.value)}/>
                      <label for={pair.name}>&nbsp;{pair.value}</label>
                    </span>
                  })
                }
              </div>

              <div>
                <h3>Exchanges</h3>
      {/*            <span>
                    <input type="checkbox" id="exchanges" name="exchanges" value="all" 
                      onClick={(e)=>queryExchanges(e)}
                      checked={exchangesAll ? 'true' : 'false'}/>
                    <label for="exchanges"> Todos</label>   
                  </span>
        */}
                {
                  exchanges.map(exchange => {
                    return <span>
                      <input type="checkbox" id={exchange.value} name={exchange.value} value={exchange.value} 
                        onClick={(e)=>queryExchanges(e)}
                        checked={selectedExchanges.includes(exchange.value)}/>
                      <label for={exchange.value}>&nbsp;{exchange.name}</label>
                    </span>
                  })
                }
              </div>

              <table>
                <tr className='header'>
                  <td>Exchange</td>
                  <td>Pair</td>
                  <td>Last Price</td>
                  <td>Bid</td>
                  <td>Ask</td>
                  <td>High</td>
                  <td>Low</td>
                  <td>Volume</td>
                  <td className='datetime'>DateTime</td>
                </tr>
                { data.map(line => {
                  return (
                    <tr>
                      <td className='exchange'>{exchanges.filter(exch=>exch.value===line.exchange)[0].name}</td>
                      <td className='bold'>{line.pair}</td>
                      <td>{line.last}</td>
                      <td>{line.bid}</td>
                      <td>{line.ask}</td>
                      <td>{line.high}</td>
                      <td>{line.low}</td>
                      <td>{line.volume}</td>
                      <td>{line.timestamp}</td>
                    </tr>
                    )
                })
                }
              </table>
            </div>
          </div>
  );
}

export default Tickers;
