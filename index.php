<HTML>
<HEAD>
 <TITLE>MLSL online!</TITLE>
 <LINK href="css/codemirror.css" rel="stylesheet"/>
</HEAD>
<BODY>
<H1>MLSL online!</H1>
<FORM action='mlsloutput.php' method='POST'>
 <TEXTAREA name='mlslSource' id='mlslSource'>// Type MLSL code here!</TEXTAREA>
 <BR/>
 Target: 
 <SELECT name='target' size='1'>
  <OPTION>agal</OPTION>
  <OPTION>agalAsm</OPTION>
  <OPTION>dummy</OPTION>
 </SELECT>
 <BR/>
 <INPUT type='submit' value='Compile MLSL'/>
</FORM>
<SCRIPT src="js/codemirror.js"></SCRIPT>
<SCRIPT src="mode/mlsl/mlsl.js"></SCRIPT>
<SCRIPT>
 var editor = CodeMirror.fromTextArea(document.getElementById('mlslSource'), 
	{ lineNumbers: true, mode: 'ocaml' });
</SCRIPT>
</BODY>
</HTML>
