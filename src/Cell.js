class Cell {
  constructor(x, y, cellSize) {
    this.x = x;
    this.y = y;
    this.cellSize = cellSize;
    this.id = `${this.x}/${this.y}`
    this.active = false;
    this.seen = false;
  }
  render() {
    const div = document.createElement('div')
    div.id = this.id
    div.classList.add('sq', 't', 'l', 'b', 'r');
    div.style.height = `${this.cellSize}px`;
    div.style.width = `${this.cellSize}px`;
    return div
  }
  on() {
    document.getElementById(this.id).classList.add('on')
  }
  off() {
    document.getElementById(this.id).classList.remove('on')
  }

  toggleActive() {
    if (!this.active) {
      this.active = true;
      document.getElementById(this.id).classList.add('active')
    } else {
      this.active = false;
      document.getElementById(this.id).classList.remove('active')
    }
  }

  toggleSeen() {
    if (!this.seen) {
      this.seen = true;
      document.getElementById(this.id).classList.add('seen')
    } else {
      this.seen = false;
      document.getElementById(this.id).classList.remove('seen')
    }
  }

  removeBorder(coords) {
    const newX = coords.split('/')[0];
    const newY = coords.split('/')[1];

    if (newX > this.x) {
      document.getElementById(this.id).style.borderRight = 'none';
      document.getElementById(`${this.x + 1}/${this.y}`).style.borderLeft = 'none';
      document.getElementById(this.id).classList.remove('r');
      document.getElementById(`${this.x + 1}/${this.y}`).classList.remove('l');

    }
    if (newX < this.x) {
      document.getElementById(this.id).style.borderLeft = 'none';
      document.getElementById(`${this.x - 1}/${this.y}`).style.borderRight = 'none';
      document.getElementById(this.id).classList.remove('l');
      document.getElementById(`${this.x - 1}/${this.y}`).classList.remove('r');
    }
    if (newY > this.y) {
      document.getElementById(this.id).style.borderBottom = 'none';
      document.getElementById(`${this.x}/${this.y + 1}`).style.borderTop = 'none';
      document.getElementById(this.id).classList.remove('b');
      document.getElementById(`${this.x}/${this.y + 1}`).classList.remove('t');
    }
    if (newY < this.y) {
      document.getElementById(this.id).style.borderTop = 'none';
      document.getElementById(`${this.x}/${this.y - 1}`).style.borderBottom = 'none';
      document.getElementById(this.id).classList.remove('t');
      document.getElementById(`${this.x}/${this.y - 1}`).classList.remove('b');
    }
  }

}

export default Cell