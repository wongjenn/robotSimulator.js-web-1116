'use strict';

class Robot {
  constructor(){
    this.validDirections = [ 'north', 'east', 'south', 'west' ];
  }
  orient(direction){
    if (this.validDirections.includes(direction)){
      this.bearing = direction
    } else {
      throw new Error('Invalid Robot Bearing');
    }
  }
  turnRight(){
    this.bearing = this.validDirections[Math.floor(((this.validDirections.indexOf(this.bearing)+1)%this.validDirections.length))]
    // var index = this.validDirections.indexOf(this.bearing)
    // if(index >= 0 && index < this.validDirections.length - 1){
    //   this.bearing = this.validDirections[index + 1]
    // } else {
    //   this.bearing = this.validDirections[0]
    // }
    return this.bearing
  }
  turnLeft(){

    this.bearing = this.validDirections[Math.floor(((this.validDirections.indexOf(this.bearing)+this.validDirections.length-1)%this.validDirections.length))]
    // var index = this.validDirections.indexOf(this.bearing)
    // if(index >= 1 && index < this.validDirections.length){
    //   this.bearing = this.validDirections[index - 1]
    // } else {
    //   this.bearing = this.validDirections[this.validDirections.length - 1]
    // }
    return this.bearing
  }
  at(x, y){
    this.coordinates = [x, y]
  }
  advance(){
    switch (this.bearing) {
      case 'north':
        this.coordinates[1] += 1
        break;
      case 'east':
        this.coordinates[0] += 1
        break;
      case 'south':
        this.coordinates[1] -= 1
        break;
      case 'west':
        this.coordinates[0] -= 1
        break;
    }
    this.coordinates
  }
  instructions(directionLetter){
    var moves = []
    directionLetter.split('').forEach(function(letter){
      switch (letter) {
      case 'L':
        moves.push("turnLeft")
        break
      case 'R':
        moves.push("turnRight")
        break
      case 'A':
        moves.push("advance")
        break
      }
    })
    return moves
  }

  place(data){
    this.at(data.x, data.y)
    this.orient(data.direction)
  }

  evaluate(string){
    var newArr = this.instructions(string)
    var rob = this
    for (var i = 0; i < newArr.length; i++){
      switch (newArr[i]) {
        case 'turnLeft':
          this.turnLeft()
          break
        case 'turnRight':
          this.turnRight()
          break
        case 'advance':
          this.advance()
          break
      }
    }
  }
}
