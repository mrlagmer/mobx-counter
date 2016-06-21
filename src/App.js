import React from 'react'
import ReactDOM from 'react-dom'
import {useStrict} from 'mobx';

import CounterApp from './components/CounterApp'
import CounterStore from './store/CounterStore'

//useStrict(true);

var store = new CounterStore();

export default React.createClass({
  render() {
    return <div>
      <CounterApp store={ store } />
    </div>
  }
})
