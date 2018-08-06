// <script src='a.js'></script>
// <script src='b.js'></script>
// <script src='c.js'></script>

// var i = 0
// while (true) {
//   i++
// }

var c = 0

function printIt() {
  console.log(c)
}

function plus01() {
  c += 1
}

function plus02() {
  setTimeout(function () {
    c += 1
  }, 1000)
}

function plus(callback) {
  setTimeout(function () {
    c += 1
    callback()
  }, 1000)
}

plus(printIt)
// printIt()