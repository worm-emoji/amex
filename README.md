# amex
library for getting amex balance + more from americanexpress.com

## usage

`npm install amex`

```js
var amex = require("amex");
// takes about 10 seconds
amex("username", "pa$$w0rd", function(data) {
	console.log(data);
});
```

## output

amex returns an object that looks like this
```js
{ currentBalance: '$100',
  currentPeriod: '$2000.00',
  paymentDue: '$0.00',
  points: 100000 }
```

## license

copyright (c) 2016 luke miles. licensed for use under MIT.