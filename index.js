var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: false })

module.exports = function(username, password, callback) {
  if (typeof username !== "string" || typeof password !== "string") {
    throw "Missing username or password.";
  } else {
    nightmare
      .goto('https://online.americanexpress.com/myca/logon/us/action/LogonHandler?request_type=LogonHandler&Face=en_US&inav=iNavLnkLog')
      .type('#lilo_userName', username)
      .type('#lilo_password', password)
      .click('#lilo_formSubmit')
      .wait('#ah-content-container')
      .evaluate(function () {
        var data = {};
        data.paymentDue = document.querySelector('.ah-current-balance .ah-whole').innerText;
        data.paymentDue += document.querySelector('.ah-current-balance .ah-decimal').innerText;
        data.currentBalance = document.querySelector('#ah-outstanding-balance-value').innerText;
       
        var billingPeriodString = document.querySelector('.ah-current-activity-amount').innerText.replace(",", "");
        try {
          data.currentPeriod = "$" + billingPeriodString.match(/\d+(?:\.\d+)?/)[0];
        } catch (e) {
          data.currentPeriod = null;
        }
        data.points = document.querySelector('#ah-membership-rewards-points').innerText;

        // attempt to force points into int. 
        try {
          data.points = parseInt(data.points.replace(",", ""));
        } catch (e) {
          console.error("Error casting points into int.", e)
        }
        return data;
      })
      .end()
      .then(function (result) {
        if (typeof callback === "function") {
          callback(result)
        } else {
          console.log(result)
        }
      })
      .catch(function (error) {
        console.error('Failed.', error);
      });

  }
}