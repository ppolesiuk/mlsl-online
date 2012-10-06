<HTML>
<HEAD>
 <TITLE>MLSL online!</TITLE>
 <LINK href="styles/github.css" rel="stylesheet"/>
</HEAD>
<BODY>
 <SCRIPT src="highlight.pack.js"></SCRIPT>
  <?php

function tempdir($dir, $prefix) {
	$tempfile = tempnam($dir, $prefix);
	if (file_exists($tempfile))
		unlink($tempfile);
	mkdir($tempfile);
	if (is_dir($tempfile))
	return $tempfile;
}

function js_quote($str) {
	return str_replace("\n", "\\n", str_replace("\r", "\\r", "\"" . addslashes($str) . "\""));
}

$mlsl_source = $_POST["mlslSource"];
$casedir = tempdir("/tmp/", "mlsl_run_");

chdir($casedir);
file_put_contents($casedir . "/source.mlsl", $mlsl_source);

$output = [];
print("<H1>Output:</H1><PRE><CODE>");
exec("mlsl -t " . $_POST["target"] . " source.mlsl", $output);

foreach($output as $line) {
	print($line . "\n");
}

print("</CODE></PRE><H1>Files:</H1>");
$files = scandir($casedir);
$i = 0;
foreach($files as $file) {
	if ($file[0] != '.') {
		print("<H3>" . $file . "</H3><PRE><CODE id='mlsl_output". $i . "'></CODE></PRE><SCRIPT>\n");
		print("document.getElementById('mlsl_output" . $i . "').innerHTML = hljs.highlightAuto(" .
		js_quote(file_get_contents($file)) . ").value;\n");
		print("</SCRIPT>");
		unlink($file);
	}
	$i++;
}

rmdir($casedir);
?>
</BODY>
</HTML>
