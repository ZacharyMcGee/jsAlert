/*
    jsalert.js
    @zacharymcgee
*/

(function(window, document) {
	var jsAlert = {
      id: null,
      type: 'default',
      dismiss: true,
			animate: true,
			animations: {

			},
      style: {
				color: "#fff",
				bgcolor: "#fff",
				borderbottom: "1px solid #fff",
				width: "100%",
				paddingtop: "0px",
				paddingleft: "0px",
				paddingright: "0px",
				paddingbottom: "0px",
				margintop: "0px",
				marginleft: "0px",
				marginright: "0px",
				marginbottom: "0px",
      },
      dismissStyle: {

      },

		// Create the div container for the alert
    createAlert: function () {
			jsAlert.removeAllAlerts('jsalert-container'); // Remove any jsalert-container divs

      var jsalertContainer = document.createElement('div');
      var id = 'jsalert' + Date.now(); // Give a unique div id

      jsAlert.id = id;
      jsalertContainer.setAttribute('id', id);
      jsalertContainer.className = 'jsalert-container';

      return jsalertContainer;
    },

		// Remove all instances of a class
		removeAllAlerts: function (className) {
    	var elements = document.getElementsByClassName(className);
    	while(elements.length > 0){
        	elements[0].parentNode.removeChild(elements[0]);
    	}

			// Remove style we create
			if(document.getElementById("jsalert-style")) {
				document.getElementById("jsalert-style").remove();
			}
		},

    destroyAlert: function (x, time) {
      setTimeout(function(){ x.parentNode.removeChild(x); }, time);
    },

    DropDownAnimation: function (x) {
			var height = x.getBoundingClientRect().height;
      var css = '@-webkit-keyframes fadein {from {top: ' + (-1 * height) + 'px; opacity: 0;}to {top: 0px; opacity: 1;} } @keyframes fadein {from {top: ' + (-1 * height) + 'px; opacity: 0;}to {top: 0px; opacity: 1;} }',
      head = document.head || document.getElementsByTagName('head')[0],
      style = document.createElement('style');

      if(x.getAttribute('style')){
				if(!jsAlert.dismiss){
					x.setAttribute("style", x.getAttribute('style') + "-webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s ; animation: fadein 0.5s, fadeout 0.5s 2.5s ;");
				}
				else
				{
        	x.setAttribute("style", x.getAttribute('style') + "-webkit-animation: fadein 0.5s; animation: fadein 0.5s;");
				}
			}
      else
      {
				if(!jsAlert.dismiss) {
					x.setAttribute("style", "-webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s ; animation: fadein 0.5s, fadeout 0.5s 2.5s ;");
				}
				else
				{
        	x.setAttribute("style", "-webkit-animation: fadein 0.5s; animation: fadein 0.5s;");
				}
      }

			if(!jsAlert.dismiss) {
				css = css + '@-webkit-keyframes fadeout { from {top: ' + height + ' opacity: 1;} to {top: 0; opacity: 0;} } @keyframes fadeout {from {top: ' + height + ' opacity: 1;}to {top: 0; opacity: 0;}}';
				jsAlert.destroyAlert(x, 3000);
			}

      head.appendChild(style);

      style.type = 'text/css';
			style.id = 'jsalert-style';
      if (style.styleSheet){
        style.styleSheet.cssText = css;
      } else {
          style.appendChild(document.createTextNode(css));
      }

    },

    createStyle: function(settings, x) {
			x.setAttribute('style', ""); // Set style attribute to something besides null

			if(settings.style.color) {
				x.setAttribute('style', x.getAttribute('style') + "color:" + settings.style.color + ";");
			}
			if(settings.style.bgcolor) {
				x.setAttribute('style', x.getAttribute('style') + "background-color:" + settings.style.bgcolor + ";");
			}
			if(settings.style.border) {
				x.setAttribute('style', x.getAttribute('style') + "border:" + settings.style.color + ";");
			}
			if(settings.style.width) {
				x.setAttribute('style', x.getAttribute('style') + "width:" + settings.style.width + ";");
			}
      if(settings.style.paddingtop) {
        x.setAttribute('style', x.getAttribute('style') + "padding-top:" + settings.style.paddingtop + ";");
      }
			if(settings.style.paddingleft) {
				x.setAttribute('style', x.getAttribute('style') + "padding-left:" + settings.style.paddingleft + ";");
			}
			if(settings.style.paddingright) {
				x.setAttribute('style', x.getAttribute('style') + "padding-right:" + settings.style.paddingright + ";");
			}
      if(settings.style.paddingbottom) {
        x.setAttribute('style', x.getAttribute('style') + "padding-bottom:" + settings.style.paddingbottom + ";");
      }
      if(settings.style.margintop) {
        x.setAttribute('style', x.getAttribute('style') + "margin-top:" + settings.style.margintop + ";");
      }
			if(settings.style.marginleft) {
				x.setAttribute('style', x.getAttribute('style') + "margin-left:" + settings.style.marginleft + ";");
			}
			if(settings.style.marginright) {
				x.setAttribute('style', x.getAttribute('style') + "margin-right:" + settings.style.marginright + ";");
			}
      if(settings.style.marginbottom) {
        x.setAttribute('style', x.getAttribute('style') + "margin-bottom:" + settings.style.marginbottom + ";");
      }
      return x;
    },

    updateSettings: function (settings) {
      for(var i in settings){
        if(i) {
          jsAlert[i] = settings[i];
        }
      }
      console.log(jsAlert);
    },

    build: function (message, settings) {
      var x = jsAlert.createAlert();

      if(settings){
        jsAlert.updateSettings(settings);
        console.log(jsAlert);
      }

      // Add Dismiss Button
      if(jsAlert.dismiss) {
        x.innerHTML = x.innerHTML + "<div class='jsalert-dismiss' onClick='jsAlert.destroyAlert(" + jsAlert.id + "," + 0 + ")'></div>"
      }

      // Override Stylesheet
      if(settings) {
        x = jsAlert.createStyle(settings, x);
      }

			x.classList.add("jsalert-" + jsAlert.type);
			console.log(x);
			x.innerHTML += "<p>" + message + "</p>";

			jsAlert.execute(x);
    },

		execute: function (x) {
			document.body.appendChild(x);
			if(jsAlert.animate) {
				jsAlert.DropDownAnimation(x);
			}
		},

		/////////////////////////////////////////////////////////////////////////////////
	 //	jsAlert.Alert(); | jsAlert.Success(); | jsAlert.Warning() | jsAlert.Error() //
	/////////////////////////////////////////////////////////////////////////////////

		Alert: function (message, settings) {
			jsAlert.type = "alert";
			jsAlert.build(message, settings);
		},

		Success: function (message, settings) {
			jsAlert.type = "success";
			jsAlert.build(message, settings);
		},

		Warning: function (message, settings) {
			jsAlert.type = "warning";
			jsAlert.build(message, settings);
		},

		Error: function (message, settings) {
			jsAlert.type = "error";
			jsAlert.build(message, settings);
		},
	};

  this.jsAlert = jsAlert;

})(window, document);
