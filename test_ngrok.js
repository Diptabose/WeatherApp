const ngrok = require('ngrok');
(async function() {
  const url = await ngrok.connect({authtoken:"2RjLDu4BKQWURKNSoIuiA74MXfp_3pRp62mq6LHqcJYZcPYDv" , addr:3000})
  console.log("Url forwarded to " , url)
})();