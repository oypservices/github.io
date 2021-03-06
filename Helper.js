//Helper Js. Adding this block for documentation and to force commit;


 

function parseUri (str) {
	var	o   = parseUri.options,
		m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
		uri = {},
		i   = 14;

	while (i--) uri[o.key[i]] = m[i] || "";

	uri[o.q.name] = {};
	uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
		if ($1) uri[o.q.name][$1] = $2;
	});

	return uri;
};

/* Parser */

parseUri.options = {
	strictMode: false,
	key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
	q:   {
		name:   "queryKey",
		parser: /(?:^|&)([^&=]*)=?([^&]*)/g
	},
	parser: {
		strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
		loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
	}
};
/*********************************************************************************************************
* Get Todays Date
**********************************************************************************************************/

function getToday()
{
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; //January is 0!
			var yyyy = today.getFullYear();

			if(dd<10) {
			    dd = '0'+dd
			}

			if(mm<10) {
			    mm = '0'+mm
			}

			today = mm + '/' + dd + '/' + yyyy;
		  return today;
}


/****************************************************************************************************************
	Call to the Knack API.  Wrapper around gateway Call
********************************************************************************************************************/

function OYPKnackAPICall (headers, apidata)
{
		return new Promise ((resolve, reject) => {

					console.dir (apidata);
					var resource = 'knackobject';

					console.dir (apidata);

 					OYPServicesAPIPost( resource, headers, apidata )
					    .then (result => {
								console.dir (result) ;
							  console.log('OYPKnackAPICall ' + apidata.method + ' ' + apidata.knackobj + ' suceeded.' );
							 resolve ( result ) ;
						 } 	);
		 })
}

/****************************************************************************************************************
	General AWS call
********************************************************************************************************************/
function  OYPServicesAPIPost( resource, headers, data )
{
		return new Promise ((resolve, reject) => {

			var this_url = 'https://x247dlqfx2.execute-api.us-east-1.amazonaws.com/v1/'  + resource ;

		  console.log (this_url) ;
			console.dir (data) ;

			// Search to see if a contact exist by this name

			if (typeof data == "string") {
				data = JSON.parse(data);
			}

			//console.log(typeof data);

			$.ajax({
						url: this_url ,
						type: 'POST',
						headers: headers,
						data:  JSON.stringify(data) ,
						crossDomain: true,
						datatype: 'json',
						json: true,
						success: function (response) {


						if (response != undefined)
						{
					  	console.dir (response) ;
							if (response.body != undefined)
								response = response.body ;
						}

					resolve(response) ;

						} ,
				error: function (responseData, textStatus, errorThrown) {
						console.log('OYPServicesAPIPost failed.');
						console.log (responseData);
						console.log (textStatus) ;
						console.log (errorThrown);
						reject(errorThrown);
				}// end response function

			}); //end ajax

		}); // end promise

} ;

/****************************************************************************************************************
	Wait funcdtion
********************************************************************************************************************/


function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}
