var config = {
	content: [{
		type: 'row',
		content: [
			{
				type:'component',
				componentName: 'stream',
				title: "stream: cbenni",
				componentState: { channel: 'cbenni' }
			},
			{
				type:'component',
				componentName: 'chat',
				title: "chat: cbenni",
				componentState: { channel: 'cbenni' }
			}
		]
	}]
};

var myLayout = new GoldenLayout( config );

myLayout.registerComponent( 'stream', function( container, state ){
  container.getElement().append($('<iframe src="http://player.twitch.tv/?channel='+state.channel+'&html5" frameborder="0" scrolling="no"></iframe>'));
});
myLayout.registerComponent( 'chat', function( container, state ){
  container.getElement().append($('<iframe src="http://www.twitch.tv/'+state.channel+'/chat?popout=" frameborder="0" scrolling="no"></iframe>'));
});

myLayout.init();

function addTab(newTabConfig) {
	myLayout.root.contentItems[0].addChild(newTabConfig)
}

$(document).contextmenu({
		delegate: "*",
		autoFocus: true,
		preventContextMenuForPopup: true,
		preventSelect: true,
		taphold: true,
		menu: [
			{title: "Add stream...", cmd: "s"},
			{title: "Add chat...", cmd: "c"},
			{title: "Add stream+chat...", cmd: "s+c"}
		],
		// Handle menu selection to implement a fake-clipboard
		select: function(event, ui) {
			var channel = prompt("Channel to add");
			if(channel === undefined || channel === "") {
				return
			}
			var $target = ui.target;
			for(var i=0;i<ui.cmd.length;++i) {
				var cmd = ui.cmd[i];
				if(cmd=="s") {
					addTab({
						type:'component',
						componentName: 'stream',
						title: "stream: "+channel,
						componentState: { channel: channel }
					});
				}
				else if(cmd=="c") {
					addTab({
						type:'component',
						componentName: 'chat',
						title: "chat: "+channel,
						componentState: { channel: channel }
					});
				}
			}
		}
	});