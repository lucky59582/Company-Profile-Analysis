var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var router = express.Router();
/* GET home page. */
// router.get('/', function(req, res, next) {
// 	res.redirect("homes.html");
// });
/*   //To Get Company Details Directly
router.post('/lookup', function(req, res){
	cname = (req.body.cname);
	url = 'https://www.zaubacorp.com/companysearchresults/' + JSON.stringify(cname);
	console.log(url);
	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);
			var title;

    //var json = { title : "", release : "", rating : ""};

	    if($('#results').length != 0){
    	console.log("inif");
    	$('#results').filter(function(){
    	var data = $(this);
    	url = data.find("a").first().attr("href");
	
    	console.log("hahf");
    	console.log(url);
    	request(url, function(error, response, html){
    		if(!error){
    			var $ = cheerio.load(html);
    			var table;
    			$('html').filter(function(){
    				var html = $(this);
    				title = html.find('title').first().html();
    				table = (html.find('table').first().html());
    			})

    			res.render('data', {title: title, table: table});
    		}            
    	})
       // json.title = title;
       // json.release = release;
   })
    }
    else
    	res.status(404).send('Company Not Found!');

    }
})
});
*/
router.post('/', function(req, res, next) {
	res.send("homes.html");
});
router.post('/details', function(req, res)
{

    console.log("hello");
	cname = (req.body.cname);
	//url = 'https://www.zaubacorp.com/companysearchresults/' + JSON.stringify(cname);
//	url = 'https://www.zaubacorp.com/companysearchresults/' +(cname);
    urls=['https://www.zaubacorp.com/companysearchresults/','https://www.corporatedir.com/'];
	for(var i=0;i<urls.length;i++)
	{
		console.log(urls);
		url=urls[i]+(cname);
		console.log(url);
		if(i==0){
		request(url, function(error, response, html){
			if(!error)
			{
				var $ = cheerio.load(html);
				// console.log("hereee", html);
				var table;
				var title;
				if($('#results').length != 0){
				console.log("inif");
				$('html').filter(function()
				{
					var html = $(this);
						//console.log(html);
					title = html.find('title').first().html();
							
					table = (html.find('table').html());
					console.log(title);
					console.log("Here Prints the Table");
						//console.log("table", table);
				})
				res.render('data', {title: title, table: table});	
	        }
	        else
		         res.status(404).send('Company Not Found!');


   
	        }
        })
	    }
	
		}

    }
);
	module.exports = router;