import Cell from './Cell.js'
const container = document.getElementById('maze-container')

class Maze {
  constructor(cellSize, size) {
    this.size = size;
    this.cellSize = cellSize;
    this.cellCount = size * size;
    this.cellList = [];
    this.seenList = [];
    this.activeList = [];

  }
  renderCells() {
    const index = this.size
    const containerSize = this.cellSize * index;
    container.style.width = `${containerSize}px`;
    container.style.height = `${containerSize}px`;
    for (let i = index; i > 0; i--) {
      for (let t = 1; t <= this.size; t++) {
        const cell = new Cell(t, i, this.cellSize);
        this.cellList.push(cell);
        container.appendChild(cell.render());
      }
    }
  }

  makeMaze() {

    setTimeout(() => {

      let cellxy = this.activeList[this.activeList.length - 1];
      let newCoords = this.moveRandom(cellxy);

      if (!newCoords) {
        let lastCellxy = this.activeList.pop();
        let lastCell = this.findCellById(lastCellxy);
        lastCell.toggleActive();
        lastCell.toggleSeen();

      } else {
        let newCell = this.findCellById(newCoords);
        this.activeList.push(newCoords);
        this.seenList.push(newCoords);
        newCell.toggleActive();
        
        let oldCell = this.findCellById(cellxy);
        oldCell.removeBorder(newCoords);
      }
      this.makeMaze();

    }, 10);
  }

  moveRandom(cell) {
    let moves = [];
    let x = +cell.split(',')[0];
    let y = +cell.split(',')[1];

    if (y < this.size) {
      let up = `${x},${y + 1}`;
      if (this.seenList.indexOf(up) === -1) { moves.push(up) }
      // this.seenList.indexOf(up) > -1 ? null : moves.push(up)
    }

    if (y > 1) {
      let down = `${x},${y - 1}`;
      if (this.seenList.indexOf(down) === -1) { moves.push(down) }
      // this.seenList.indexOf(down) > -1 ? null : moves.push(down)
    }

    if (x > 1) {
      let left = `${x - 1},${y}`;
      if (this.seenList.indexOf(left) === -1) { moves.push(left) }
      // this.seenList.indexOf(left) > -1 ? null : moves.push(left)
    }

    if (x < this.size) {
      let right = `${x + 1},${y}`;
      if (this.seenList.indexOf(right) === -1) { moves.push(right) }
      // this.seenList.indexOf(right) > -1 ? null : moves.push(right)
    }

    if (!moves.length) { return null; }

    let random = Math.floor(Math.random() * moves.length);
    return moves[random];
  }

  findCellById(id) {
    return this.cellList.find(cell => {
      return cell.id === id;
    })
  }

}




export default Maze