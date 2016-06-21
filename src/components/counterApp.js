import React from 'react';
import {observer} from 'mobx-react';


class Counter extends React.Component {
  handleAdd = (e) => {
    const {store, id} = this.props;
    store.add(e.target.id);
  }

  handleSub = (e) => {
    const {store, id} = this.props;
    store.sub(e.target.id);
  }

  render() {
    const { title, count, id } = this.props
    return  <div>
              <h2>{title}</h2>
              {count} <button id={id} onClick={this.handleAdd}>Add</button><button id={id} onClick={this.handleSub}>Subtract</button>
            </div>
  }
}

class NewCounter extends React.Component {
  handleCreate = (e) => {
    const {store} = this.props;
    store.setCounter(document.getElementById('counterName').value)
    document.getElementById('counterName').value = '';
  }

  render() {
    return (
      <div>
        <input id="counterName" type="text" />
        <button type="button" className="button" id="counterAdd" onClick={this.handleCreate} >Add Counter</button>
      </div>
    )
  }
}

@observer
export default class CounterApp extends React.Component {
  render() {
    const {store} = this.props;
    return(
      <div>
        <h1>MobX Add Counter</h1>
        <NewCounter store={store} />
        <h1>Counters</h1>
        <h2>Total {store.total} </h2>
        {store.counters.map(counter => <Counter title={counter.title} count={counter.count} id={counter.id} store={store} key={counter.id} />  )}
      </div>
    )
  }
}
