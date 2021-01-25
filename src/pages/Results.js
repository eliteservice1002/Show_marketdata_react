import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';

import { APIUrl } from '../config.js';
import './Results.css';
import Pagination from '@material-ui/lab/Pagination';

const Results = () => {

  const [datas, setDatas] = useState([]);
  const [productdatas, setProductdatas] = useState([]);
  const [currentpage, setCurrentPage] = React.useState(1)

  var fetchTimeout = useRef(null)

  const fetchData = useCallback(async () => {
    const url = APIUrl + 'txresults'
      + '?limit=1000'
    const resp = await fetch(url)
    const newData = await resp.json()
    setDatas(newData)
    fetchTimeout.current = setTimeout(fetchData, 4000)
  }, [])

  useEffect(() => {
    fetchData()

    return () => {
      clearTimeout(fetchTimeout.current)
    }
  }, [fetchData])

  useEffect(() => {
    handleProductfilter(currentpage);
  }, [datas]);

  const handleProductfilter = (param) => {
    let data = []
    let first = 0;
    let last = 49;

    if (param !== 1) {
      first = (51 * (param - 1)) - 1;
      last = (51 * param - 1) - 1;
    }
    datas.map((val, index) => {
      if (index >= first && index <= last) {
        data.push(val)
      }
    })
    setProductdatas(data)
  }

  const handleChangePage = (event, newPage) => {
    handleProductfilter(newPage)
    setCurrentPage(newPage)
  }

  return (
    <div className="Results">
      <div className="container">
        <table>
          <thead>
            <tr className='header'>
              <td>Time</td>
              <td>Id</td>
              <td>Coin A</td>
              <td>Coin B</td>
              <td>Exchange A</td>
              <td>Exchange B</td>
              <td>Price on sell</td>
              <td>Price on buy</td>
              <td>Qty sell</td>
              <td>Qty buy</td>
              <td>Result in sell</td>
              <td>Result in buy</td>
              <td>Not Executed in coin</td>
              <td>Not Executed in USDT</td>
              <td>Amount</td>
              <td>Earn USDT</td>
              <td>Perc Operation</td>
              <td>Perc Pool</td>
            </tr>
          </thead>

          <tbody>
            {productdatas.map((line, index) => {

              return (

                <tr key={index.toString()}>
                  <td>{line.created_at}</td>
                  <td>{line.id_int}</td>
                  <td>{line.coin_a}</td>
                  <td>{line.coin_b}</td>
                  <td>{line.exchange_a}</td>
                  <td>{line.exchange_b}</td>
                  <td>{(Math.round(line.price_exec_onSELL * 100) / 100).toFixed(2)}</td>
                  <td>{(Math.round(line.price_exec_onBUY * 100) / 100).toFixed(2)}</td>
                  <td>{(Math.round(line.qty_exec_onSELL * 1000000) / 1000000).toFixed(6)}</td>
                  <td>{(Math.round(line.qty_exec_onBUY * 1000000) / 1000000).toFixed(6)}</td>
                  {/* <td>{(Math.round(line.fee_exec_onSELL * 1000000) / 1000000).toFixed(6)}</td>
                  <td>{(Math.round(line.fee_exec_onBUY * 1000000) / 1000000).toFixed(6)}</td> */}
                  <td>{(Math.round(line.result_amount_inSELL * 100000000) / 100000000).toFixed(8)}</td>
                  <td>{(Math.round(line.result_amount_inBUY * 100000000) / 100000000).toFixed(8)}</td>
                  <td>{line.notexecutedamount_inCoin === null ? 0 : (Math.round(line.notexecutedamount_inCoin * 1000000) / 1000000).toFixed(6)}</td>
                  <td>{line.notexecutedamount_inUSDT === null ? 0 : (Math.round(line.notexecutedamount_inUSDT * 1000000) / 1000000).toFixed(6)}</td>
                  <td>{(Math.round(line.net_earn_inbase * 1000000) / 1000000).toFixed(6)}</td>
                  <td>{(Math.round(line.earn_inUSDT * 1000000) / 1000000).toFixed(6)}</td>
                  <td>{(Math.round(line.net_earn_perc * 1000000) / 1000000).toFixed(6)}</td>
                  <td>{(Math.round(line.net_earn_bypool * 1000000) / 1000000).toFixed(6)}</td>
                </tr>
              )

            })
            }
          </tbody>
        </table>
        <div className="pagenation_container">
          <Pagination
            count={Math.ceil(datas.length / 50)}
            color="primary"
            page={currentpage}
            onChange={handleChangePage}
          />
        </div>
      </div>
    </div>
  )
}

export default Results;
