
class PanController {

  constructor() {
    this.reset();
  }

  reset() {
    this.owner = false;
  }

  setResponderOwner(newOwner) {
    if (this.owner && this.owner !== newOwner) {
      return false
    } else {
      this.owner = newOwner;
      console.log('newOwner is ', newOwner);
      return true;
    }
  }

}

module.exports = new PanController;
