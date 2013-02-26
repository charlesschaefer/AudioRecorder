/**
 * Lib que auxilia na gravação de áudios
 *
 * @param string script_base Base URL to this directory
 * @param string url URL used to send the audio data to the server
 * @param HTMLElement el HTML element where the SWF of Wami will be placed
 * @param string [save_url] Saving URL (if it differs from the URL where the audio data is sent)
 * @uses Wami http://code.google.com/p/wami-recorder/
 */
function AudioRecorder(script_base, url, el, save_url) {
	this.url = url+"?";
	if (save_url === undefined) {
		save_url = url;
	}
	this.save_url = save_url;

	// removes the flash container, if exists
	$(el).find('#flash').remove();
	// adds the flash container
	$(el).append('<div id="flash"></div>');

	var script = document.createElement('script');
	$('body').append(script);

	script.onload = function() {
		Wami.setup({id: 'flash', swfUrl: script_base + "/wami/Wami.swf"});
	};
	script.src = script_base + '/wami/recorder.js';
}

/**
 * Start to capture de audio.
 */
AudioRecorder.prototype.start = function() {
	Wami.startRecording(this.url);
};
/**
 * Stop the capture of the audio.
 */
AudioRecorder.prototype.stop = function() {
	Wami.stopRecording();
	Wami.stopPlaying();
};
/**
 * Play the audio sent to the server. Server must serve the Wav file
 */
AudioRecorder.prototype.play = function() {
	Wami.startPlaying(this.url);
};
/**
 * Stop the audio preview
 */
AudioRecorder.prototype.pause = function() {
	Wami.stopPlaying();
};
/**
 * saves the audio in the server
 */
AudioRecorder.prototype.save = function(fn) {
	$.ajax({
		url: this.save_url, 
		complete: function() {
			fn && fn();
		}
	});
};
