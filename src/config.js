const APIUrl = process.env.REACT_APP_API_URL
const APIControlUrl = process.env.REACT_APP_API_CONTROL_URL
const CertificationUrl = process.env.REACT_APP_API_CERTIFICATION_URL

const pairs = [
  {
    name: 'ethbtc',
    value: 'ETH/BTC'
  },
  {
    name: 'btcusdt',
    value: 'BTC/USDT'
  },
  {
    name: 'ethusdt',
    value: 'ETH/USDT'
  },
  {
    name: 'btcusd',
    value: "BTC/USD", 
  }, 
  {
    name: 'ethusd',
    value: "ETH/USD",  
  },
  {
    name: 'btceur',
    value: "BTC/EUR", 
  },
  {
    name: 'etheur',
    value: "ETH/EUR",  
  }, 
  {
    name: 'btcgbp',
    value: "BTC/GBP",  
  },
  {
    name: 'ethgbp',
    value: "ETH/GBP", 
  }, 
  {
    name: 'btcjpy',
    value: "BTC/JPY", 
  }, 
  {
    name: 'ethjpy',
    value: "ETH/JPY", 
  }, 

]


const coins_a = [ 'BTC', 'ETH' ]

const coins_b = [ 'BTC', 'USDT', 'USD', 'EUR', 'GBP', 'JPY' ]

const exchanges = [
  {
    name: 'Bitfinex',
    value: 'Bitfinex'
  },
  {
    name: 'Binance',
    value: 'Binance'
  },
  {
    name: 'Bittrex',
    value: 'Bittrex'
  },
  {
    name: 'Kraken',
    value: 'Kraken'
  },
  {
    name: 'Poloniex',
    value: 'Poloniex'
  },
  {
    name: 'Cex.io',
    value: 'Cex'
  },
  {
    name: 'Liquid',
    value: 'Liquid'
  },
  ]


export { 
	APIUrl, 
  APIControlUrl,
  CertificationUrl, 
	exchanges, 
	pairs,
  coins_a,
  coins_b,
};