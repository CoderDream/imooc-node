function pet(words) {
  this.words = words

  console.log(this.words)
  console.log(this === global)
 // console.log(this)
  // this
}

pet('...')