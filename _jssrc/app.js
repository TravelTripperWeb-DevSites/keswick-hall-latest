//fallback ready document
function readyDoc(fn) {
	var d = document;
	(d.readyState == 'loading') ? d.addEventListener('DOMContentLoaded', fn): fn();
}

readyDoc(function() {
  // cendyn newsletter post data
  if (document.getElementsByName('newsletterForm').length > 0) {
    document.getElementsByName('newsletterForm')[0].onsubmit = function() {
      var formId = document.getElementsByName('formID')[0].value
      var url = 'https://web2.cendynhub.com/FormsRest/submit/' + formId + '?format=json';
      var data = JSON.stringify({
        "PostData": {
          "emailAddress": document.getElementsByName('emailAddress')[0].value
        }
      });
      makeRESTCall(url, data, function() {
        window.location = '/thankyou/';
      })
      return false;
    }
  }

  function makeRESTCall(url, data, callback) {
		var request = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

		request.onreadystatechange = function() {
			if (request.readyState == 4 && request.status == 200) {
				console.log(request.responseText);
				if (callback) {
					callback(request.responseText);
				}
			}
		}
		request.open('post', url, true);
		request.setRequestHeader('Content-Type', 'application/json');
		request.send(data);
	}
});
