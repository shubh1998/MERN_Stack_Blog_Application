import App from 'App'
import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from 'reportWebVitals'
import 'assets/scss/main.scss'
import { Provider } from 'react-redux'
import { store } from 'redux-thunk/store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)

export default store

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
