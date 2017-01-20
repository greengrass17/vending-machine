function VendingMachine(coins) {
  this.coins = coins;
}

VendingMachine.prototype.vending = function(price, credit) {
  const addCoins = (credit) => {
    for (let prop in credit) {
      if (this.coins[prop] !== undefined) this.coins[prop] += credit[prop];
    }
  }

  const removeCoins = (result) => {
    for (let prop in result) {
      if (result.hasOwnProperty(prop)) {
        this.coins[prop] -= result[prop];
      }
    }

  }

  const sumCredit = (credit) => {
    let sum = 0;
    for (let prop in credit) {
      if (credit.hasOwnProperty(prop)) {
        sum += +prop * credit[prop];
      }
    }
    return sum;
  }

  const checkBalance = (credit) => {
    for (let prop in credit) {
      if (this.coins[prop] === undefined) return false;
    }
    if (sumCredit(credit) < price) return false;
    return true;
  }

  // Check insufficient balance
  if (!checkBalance(credit)) return credit;

  // Get sum credit
  let change = sumCredit(credit) - price;

  // Add coins
  addCoins(credit);

  // Handle exact price
  if (change === 0) return {}

  // Loop in sortedCoins
  const coinKeys = Object.keys(this.coins);
  const coinVals = coinKeys.map(coin => this.coins[coin])
  let intervals = [1]
  for (let i = 1; i < coinVals.length; i++) {
    intervals.push(intervals[i-1] * (coinVals[i-1] + 1))
  }

  const getSum = (coins) => {
    return coins.reduce((acc, curr, i) => {
      return acc + curr * (+coinKeys[i])
    }, 0)
  }

  const getResult = (coins) => {
    let out = {}
    coinKeys.forEach((coin, i) => {
      if (coins[i] > 0) out[coin] = coins[i]
    })
    return out
  }

  let result = [coinVals]
  let max = Array(coinVals.length).fill(0)
  let i = 1;
  while (getSum(result[i-1]) > 0 && getSum(result[i-1]) !== change) {
    if (getSum(result[i-1]) > getSum(max) && getSum(result[i-1]) <= change) max = result[i-1]
    if (result[i-1][0] !== 0) {
      result.push(result[i-1].map((val, j) => {
        return (j === 0)? val - 1: val
      }))
    } else {
      let newResult = result[i-1].map(k => k)
      let j = 0
      while (result[i-1][j] === 0 && j < result[i-1].length) {
        newResult[j] += coinVals[j]
        j++
      }
      if (j < result[i-1].length) newResult[j]--
      result.push(newResult)
    }
    i++
  }
  if (getSum(result[i-1]) === 0) result[i-1] = max

  // Remove change coins from machine
  removeCoins(getResult(result[i-1]));

  return getResult(result[i-1]);
}

module.exports =  VendingMachine
