class Tabel {
  constructor (defaultItems) {
    this._store = defaultItems ? defaultItems : []
  }

  get list() {
    return this._store;
  }

  wipe () {
    this._store = []
  }

  toggle (item) {
    if (this._store.includes(item)) {
      const index = this._store.indexOf(item);
      if (index > -1) {
        this._store.splice(index, 1);
      }
    } else {
      this._store.push(item)
    }
  }
}

export default Tabel