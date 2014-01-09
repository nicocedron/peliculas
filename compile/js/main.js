$(document).on('ready',function(){

	Pelis.template=$('.listado ul').html();
	Pelis.traer();

});


var Pelis={
	template:null,
	traer:function(){
		$.ajax({
			type:'GET',
			url:'http://www.yaske.to/',
			success:function(data){

				var _html=$(data);
				var peli=[];

				_html.find('.item-movies').each(function(){
					var idiomas=[];

					$('.bottombox li:eq(2) img',this).each(function(){
						idiomas.push({
							name	: 	$(this).prop("title"),
							img 	:   $(this).attr('src'),
						});
					});

					peli.push({
						link	: 	$('a',this).attr('href'),
						img		: 	$('a img',this).attr('src'),
						title	: 	$('.bottombox li:eq(0)',this).attr('title'),
						genero 	: 	$('.bottombox li:eq(1)',this).html(),
						idioma 	: 	idiomas
					});
				});

				Pelis.insertar(peli);
			}
		});
	},

	insertar:function(data){

		var _template=Pelis.template,
			_html='';

		for(i in data){
			var d=data[i];
			var idiomas='';

			for(j in d.idioma){
				var idi=d.idioma[j];
				idiomas+=$($('<span class="bandera">').html('<img src="'+idi.img+'"/>')).html();
			}
			_html+='<li>';


			_html+=	$(_template)
					.find('.title').html(d.title).end()
					.find('.columns')
						.find('.col')
							.find('.image img').attr('src',d.img).end()
							.find('ul')
								.find('.genero').html(d.genero).end()
								.find('.idioma').html(idiomas).end()
							.end()
						.end()
					.end()

					.html();

			_html+='</li>';
		}

		$('.listado ul').html(_html);


	}
}