import 'whatwg-fetch'

export const post = (path, object, success, error) => {
	fetch("http://localhost:8081/" + path, {
  		method: 'POST',
  		 headers: new Headers({
        	'Accept': 'application/json',
        	"Content-Type": "application/json; charset=utf-8",
        	'Access-Control-Allow-Origin': '*',
        	'Access-Control-Allow-Headers': 'Content-Type',
      	}),
  		body: JSON.stringify(object)
	})
	.then((res) => res.json())
	.then(success, error);
}