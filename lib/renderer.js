	const electron = require('electron');
	const ipc = electron.ipcRenderer;
	const remote = electron.remote;
	const clipboard = electron.clipboard;


	const mainProcess = remote.require('./main');
	const openFile = mainProcess.openFile;

	const $ = require('jquery');
	const marked = require('marked');

	$('#open-file').on('click', function(){
		mainProcess.openFile();
	});

	$('#copy-html').on('click', function(){
		var html = $('.rendered-html').html();
		clipboard.writeText(html);
	});


	ipc.on('file-opened',function(event, file, content){
		$('.raw-markdown').text(content);
		renderMarkdownToHTML(content);
	});

	$('.raw-markdown').on('keyup', function(){
		var content = $(this).val();
		renderMarkdownToHTML(content);
	})

	function renderMarkdownToHTML(content){
		var html = marked(content);
		$('.rendered-html').html(html);
	}
