$(document).ready(function () {
	$('#searchSign').click(function() {
		$(this).hide();
		$('#searchbox, .dismissInput').css({opacity: 0.0, width:'300px',visibility: "visible"}).animate({opacity: 1.0});
});

	$('#searchbox').on('keyup',function (e) {
		if(e.keyCode == 13){
			$('#items').empty();
			var searchVal = document.getElementById('searchbox').value;
			var url = 'http://en.wikipedia.org/w/api.php?format=json&action=query&list=search&srsearch='+searchVal+'&callback=?';
			$.getJSON(url,function (json) {

				$('.search').css({marginTop: '1%'});
				for(var i=0; i < json.query.search.length; i++){	
					document.getElementById('items').innerHTML += "<a class='item' href='https://en.wikipedia.org/wiki/"+
						encodeURIComponent(json.query.search[i].title)+
						"' target='_blank'><div class='searchItem'><h3>"+json.query.search[i].title
						+"</h3><p>"+ json.query.search[i].snippet
						+"</p></div></a>";
				}
			});
		}
	});

	$('.dismissInput').click(function() {
		$(this).css({visibility: "hidden"});
		document.getElementById('searchbox').value = "";
		$('#searchbox').animate({width: '-15px' },500,function () {
			$('#searchbox').css({visibility:'hidden'});
			$('#items').empty();
			$('.search').css({marginTop: '12%'});
			$('#searchSign').show();
		});
		
	});
});