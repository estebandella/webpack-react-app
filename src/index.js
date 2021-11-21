// import React from 'react' //lo quito configurando BABEL
import ReactDOM from 'react-dom'
import App from './App'
import './styles.css '

ReactDOM.render(
    <App />,                             //este tocken dene ser interpretado por BABEL para que WEBPACK lo entienda
    document.getElementById('root')
    )