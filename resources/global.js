$('.feature').popover({trigger:'hover'});

var servers = ['vanilla','yourbox','pixelmon'];

function capitiliseFL(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

for(i=0;i<servers.length;i++) {
	$('#server_list').append('<span>'+capitiliseFL(servers[i])+':</span><span class="right" id="server_'+servers[i]+'_players">???</span><div class="progress"><div id="server_'+servers[i]+'_progress" class="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="0" style="width:0%;"></div></div>');
}

setInterval(function(){
	if($('#advertisments:visible').length == 0) {
		$('#admodal').modal('show');
	}
	for(i=0;i<servers.length;i++) {
		$.get('http://'+servers[i]+'.avarelcraft.com/status',function(data){
			$('#server_'+servers[i]+'_players').text(data);
			data = data.split('/');
			$('#server_'+servers[i]+'_progress').attr('aria-valuenow',data[0]).attr('aria-valuemax',data[1]).attr('style','width:'+parseInt(data[0])/parseInt(data[1])+'%;');
		}).fail(function(data){
			console.log(servers[i]);
			$('#server_'+servers[i]+'_players').text("Offline");
		});
	}
},2500);

$('#server_list .loading').remove();