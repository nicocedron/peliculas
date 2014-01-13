var Seccion={
	inicio:function(){
		Pelis.template=$('.listado ul').html();
		Pelis.traer('http://www.yaske.to/');
	},
	servidor:function(){
		_load=location.hash.replace('#','');
		if(_load=='')
			location.href="home.html";

		

		Pelis.templateServer=$('.servidor ul').html();

		Pelis.servidores(_load);
	},
	reproductor:function(){

	}
}


var Pelis={
	template:null,
	templateServer:null,
	cargando:false,

	servidores:function(_url){
		$.ajax({
			type:'GET',
			url:_url,
			success:function(data){
				var _html=$(data);
				var sr=[];
				
				_html.find('.table_links:eq(0) tbody tr').each(function(){
					
					sr.push({
						server: $('td:eq(1)',this).html(),
						link: 	$('td:eq(0) a',this).attr('href'),
						idioma:$('td:eq(2) img',this).attr('src'),
						calidad: $('td:eq(3) span',this).html().toUpperCase()
					});
				});
				
				console.log(sr);
				Pelis.insertarServidores(sr);
			}
		});
	},

	insertarServidores:function(data){

		var _template=Pelis.templateServer,
			_html='';

		for(i in data){
			var d=data[i];

			_html+='<li>';


			_html+=	$(_template)
					.find('a.link').attr('data-link',d.link).end()
					.find('a.link span:eq(1)').html('OPCION '+(parseInt(i)+1)).end()
					.find('a.link span:eq(2)').html(d.server).end()
					.find('.idioma img').attr('src',d.idioma).end()
					.find('.calidad').html(d.calidad).end()
					.html();

			_html+='</li>';
		}

		$('.servidor ul').html(_html);

		$('.servidor ul li a.link')
									.off('click',Pelis.ver)
									.on('click',Pelis.ver);
		
	},
	ver:function(e){
		e.preventDefault();
		_href='/reproductor.html#'+$(this).data('link');
		location.href=_href;
	},
	traer:function(_url){
		console.log('Extrayendo de '+_url);
		$.ajax({
			timeout: 1500,
			cache:true,
			type:'GET',
			url:_url,
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
						calidad : 	$('.quality',this).html(),
						link	: 	$('a',this).attr('href'),
						img		: 	$('a img',this).attr('src'),
						title	: 	$('.bottombox li:eq(0)',this).attr('title'),
						genero 	: 	$('.bottombox li:eq(1)',this).html(),
						idioma 	: 	idiomas
					});
				});
				
				Pelis.insertar(peli);
			},
		   error: function(request, status) {
		        if(request.status == 0)
		            Pelis.traer('http://www.peliculas-flv.net/');
		    },
		    complete:function(){
		    	console.log('Ext de '+_url);
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
					.find('.image').attr('data-link',d.link).end()
					.find('.image img').attr('src',d.img).end()
					.find('.genero').html(d.genero).end()
					.find('.idioma').html(idiomas).end()
					.find('.calidad').html(d.calidad).end()
					.html();

			_html+='</li>';
		}

		$('.listado ul').html(_html);

		$('.listado ul li a.image').off('click',Pelis.actionClick);
		$('.listado ul li a.image').on('click',Pelis.actionClick);

	},
	actionClick:function(e){
		e.preventDefault();
		_href='/servidor.html#'+$(this).data('link');
		location.href=_href;
	}
}


