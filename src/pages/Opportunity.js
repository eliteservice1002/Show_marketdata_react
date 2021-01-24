import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { APIUrl } from '../config.js';
import './Opportunity.css';

const Opportunity = () => {

  const [datas, setDatas] = useState([]);
  const [productdatas, setProductdatas] = useState([]);
  const [currentpage, setCurrentPage] = React.useState(1)

  var fetchTimeout = useRef(null)

  const fetchData = useCallback(async () => {
    const url = APIUrl + 'results'
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
    <div className="Opportunity">
      <div className="container">
        <table>
          <tr className='header'>
            <td>Time</td>
            <td>Id</td>
            <td>Coin A</td>
            <td>Coin B</td>
            <td>Exchange A</td>
            <td>Exchange B</td>
            <td>Max Bid Price</td>
            <td>Min Ask Price</td>
            <td>Difference</td>
            <td>Difference %</td>
          </tr>
          {productdatas.map(line => {
            return (
              <tr>
                <td>{line.created_at}</td>
                <td>{line.id_int}</td>
                <td>{line.coin_a}</td>
                <td>{line.coin_b}</td>
                <td>{line.exchange_a}</td>
                <td>{line.exchange_b}</td>
                <td>{(Math.round(line.max_bid_price * 100) / 100).toFixed(2)}</td>
                <td>{(Math.round(line.min_ask_price * 100) / 100).toFixed(2)}</td>
                <td>{(Math.round(line.difference * 100) / 100).toFixed(2)}</td>
                <td>{(Math.round(line.difference_pc * 100) / 100).toFixed(2)}</td>
              </tr>
            )
          })
          }
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

export default Opportunity;
