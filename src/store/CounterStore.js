import {observable, computed, action} from 'mobx';
import request from 'superagent';

export default class CounterStore {
  @observable counters = [];

  constructor() {
    this.getCounters();
  }

  @computed get total() {
    let counts = this.counters.map(c => c.count);
    let total = counts.reduce((acc, c) => acc + c, 0);
    return total;
  }

  @action getCounters() {
    fetch('http://localhost:4000/api/v1/counters')
      .then(response => response.json())
      .then(json => this.counters = json)
  }

  @action setCounter(name) {
    request
      .post('http://localhost:4000/api/v1/counter')
      .send({ title: name })
      .set('Accept', 'application/json')
      .end(action("createCounter-callback", (err, res) => {
        this.getCounters();
      }));
  }

  @action add(id) {
    request
      .post('http://localhost:4000/api/v1/counter/inc')
      .send({ id: id })
      .set('Accept', 'application/json')
      .end(action("add-callback", (err, res) => {
        this.getCounters();
      }));
  }

  @action sub(id) {
    request
      .post('http://localhost:4000/api/v1/counter/dec')
      .send({ id: id })
      .set('Accept', 'application/json')
      .end(action("dec-callback", (err, res) => {
        this.getCounters();
      }));
  }
}
