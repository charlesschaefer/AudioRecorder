<?php // grava_audio.php
session_start();
$session_id = session_id();
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	parse_str($_SERVER['QUERY_STRING'], $params);
	$name = "/tmp/{$session_id}.wav";
	$content = file_get_contents('php://input');
	$fh = fopen($name, 'w') or die("can't open file");
	fwrite($fh, $content);
	fclose($fh);
} else {
	if (isset($_GET['save'])) {// converts to mp3 using lame
		$cmd = "lame /tmp/{$session_id}.wav /tmp/{$session_id}.mp3";
		exec($cmd);
	} elseif (file_exists("/tmp/{$session_id}.wav")) {
		readfile("/tmp/{$session_id}.wav");
	}
}
