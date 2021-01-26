import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { CertificationUrl } from '../config.jsx';
import './ResultCertification.css';
var flag = 0;

const ResultCertification = () => {

  const [datas, setDatas] = useState([]);
  const [productdatas, setProductdatas] = useState([]);
  const [currentpage, setCurrentPage] = React.useState(1)
  const [recalculate_hash, setRecalculateHash] = useState([])

  var fetchTimeout = useRef(null)

  const fetchData = useCallback(async () => {
    let newArr = []
    const url = CertificationUrl + 'results'
    const resp = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const newData = await resp.json()
    if (flag === 0) {
      setDatas(newData.results)
      newData.results.map((val, index) => {
        newArr.push('')
      })
      setRecalculateHash(newArr);
      flag++;

    }
    flag++;
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

  const Recalculate_Hash = useCallback(async (param, index) => {
    let newArr = [];
    const url = CertificationUrl + `cert/result/${param}`
    const resp = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const newData = await resp.json()
    recalculate_hash.map((val, i) => {
      if (index === i)
        newArr.push(newData.hash ? newData.hash : val)
      else
        newArr.push(val)
    })
    setRecalculateHash(newArr)
  })

  return (
    <div className="ResultCertification">
      <div className="container">
        <table>
          <thead>
            <tr>
              <td>Result_ID</td>
              <td>Timestamp</td>
              <td>Result_Hash</td>
              <td>Recalculate_Hash</td>
              <td>Recertify</td>
            </tr>
          </thead>

          <tbody>
            {productdatas.map((line, index) => {
              return (
                <tr key={index.toString()}>
                  <td>{line.result_id}</td>
                  <td>{line.timestamp}</td>
                  <td>{line.result_hash}</td>
                  <td>{recalculate_hash[index]}</td>
                  <button
                    onClick={() => { Recalculate_Hash(line.result_id, index) }}
                  >Recertify</button>
                </tr>
              )
            })}
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

export default ResultCertification;
