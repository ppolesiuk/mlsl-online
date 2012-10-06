CodeMirror.defineMode('ocaml', function(config) {

  var words = {
    'true': 'atom',
    'false': 'atom',
    'and': 'keyword',
	'attr': 'keyword',
    'begin': 'keyword',
	'const': 'keyword',
    'end': 'keyword',
	'else': 'keyword',
	'fix': 'keyword',
	'fragment': 'keyword',
    'fun': 'keyword',
    'if': 'keyword',
    'in': 'keyword',
    'let': 'keyword',
    'match': 'keyword',
    'rec': 'keyword',
    'then': 'keyword',
	'vertex': 'keyword',
	'sampler': 'keyword',
	'shader': 'keyword',
	'when': 'keyword',
    'with': 'keyword',
    'min': 'builtin',

	'bool': 'def',
	'float': 'def',
	'int': 'def',
	'mat22': 'def',
	'mat23': 'def',
	'mat24': 'def',
	'mat32': 'def',
	'mat33': 'def',
	'mat34': 'def',
	'mat42': 'def',
	'mat43': 'def',
	'mat44': 'def',
	'sampler2D': 'def',
	'samplerCube': 'def',
	'unit': 'def',
	'vec2': 'def',
	'vec3': 'def',
	'vec4': 'def'
  };

  function tokenBase(stream, state) {
    var sol = stream.sol();
    var ch = stream.next();

    if (ch === '"') {
      state.tokenize = tokenString;
      return state.tokenize(stream, state);
    }
    if (ch === '(') {
      if (stream.eat('*')) {
        state.commentLevel++;
        state.tokenize = tokenComment;
        return state.tokenize(stream, state);
      }
    }
    if (ch === '/') {
	  if (stream.eat('/')) {
        stream.eatWhile(/[^\n]/);
        return "comment";
      }
    }
    if (ch === '~') {
      stream.eatWhile(/\w/);
      return 'variable-2';
    }
    if (ch === '`') {
      stream.eatWhile(/\w/);
      return 'quote';
    }
    if (/\d/.test(ch)) {
      stream.eatWhile(/[\d]/);
      if (stream.eat('.')) {
        stream.eatWhile(/[\d]/);
      }
      return 'number';
    }
    if ( /[+\-*&%=<>!?|]/.test(ch)) {
      return 'operator';
    }
    stream.eatWhile(/\w/);
    var cur = stream.current();
    return words[cur] || 'variable';
  }

  function tokenString(stream, state) {
    var next, end = false, escaped = false;
    while ((next = stream.next()) != null) {
      if (next === '"' && !escaped) {
        end = true;
        break;
      }
      escaped = !escaped && next === '\\';
    }
    if (end && !escaped) {
      state.tokenize = tokenBase;
    }
    return 'string';
  };

  function tokenComment(stream, state) {
    var prev, next;
    while(state.commentLevel > 0 && (next = stream.next()) != null) {
      if (prev === '(' && next === '*') state.commentLevel++;
      if (prev === '*' && next === ')') state.commentLevel--;
      prev = next;
    }
    if (state.commentLevel <= 0) {
      state.tokenize = tokenBase;
    }
    return 'comment';
  }

  return {
    startState: function() {return {tokenize: tokenBase, commentLevel: 0};},
    token: function(stream, state) {
      if (stream.eatSpace()) return null;
      return state.tokenize(stream, state);
    }
  };
});
  
CodeMirror.defineMIME('text/x-mlsl', 'mlsl');
