import React, {
    useState,
    useEffect,
    useRef,
    useCallback,
  } from 'react';
  
  import { CertificationUrl } from '../config.jsx';
  import './MainnetResultsCertification.css';
  import Pagination from '@material-ui/lab/Pagination';
  
  const MainnetResultsCertification = () => {
  
    const [datas, setDatas] = useState([]);
    const [productdatas, setProductdatas] = useState([]);
    const [currentpage, setCurrentPage] = React.useState(1)
  
    var fetchTimeout = useRef(null)
  
    const fetchData = useCallback(async () => {
      const url = CertificationUrl + 'mainnet/results'
      const resp = await fetch(url)
      const newData = await resp.json()
      setDatas(newData.results)
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
      <div className="MainnetResultsCertification">
        <div className="container">
          <table>
            <thead>
              <tr className='header'>
                <td>Result ID From</td>
                <td>Result ID To</td>
                <td>Timestamp</td>
                <td>Result Hash</td>
              </tr>
            </thead>
  
            <tbody>
              {productdatas.map((line, index) => {
  
                return (
  
                  <tr key={index.toString()}>
                    <td>{line.result_id_from}</td>
                    <td>{line.result_id_to}</td>
                    <td>{line.timestamp}</td>
                    <td>{line.result_hash}</td>
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
  
  export default MainnetResultsCertification;
  