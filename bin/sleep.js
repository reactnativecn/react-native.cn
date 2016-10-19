var args = process.argv.slice(2)

var delay = args[0]

var preamble = '[sleep #' + process.pid + '] '

if (typeof delay === 'undefined')
{
  throw new Error(preamble + 'delay (in ms) not specified')
}

if (delay != parseInt(delay))
{
  throw new Error(preamble + 'invalid delay: "' + delay + '"')
}

// console.log(preamble + 'sleeping for ' + delay + ' milliseconds')

setTimeout(function()
  {
    // console.log(preamble + 'woken up after ' + delay + ' milliseconds')
    process.exit(0)
  },
  delay)