(function () {

  var lastModified = '__LASTMODIFIED__',
      interval = 2000;

  var Heartbeat = {

    start: function () {      
      if (document.body) Heartbeat.checkForChanges();
      setTimeout(Heartbeat.start, interval);
    },

    checkForChanges: function () {
      var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XmlHttp');
      xhr.open('HEAD', document.location.href, true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status != 304) {
          xhr.getAllResponseHeaders();
	  newLastModified = xhr.getResponseHeader('Last-Modified');
	  if (newLastModified != lastModified) {
	    lastModified = newLastModified
            document.location.reload();
	  }
        }
      }
      xhr.send();
    }

  };

  setTimeout(Heartbeat.start, interval);

})();
