var moduleKey = '__export__';

function getLibMember(memberPath) {
	var pathSegments = memberPath.split('.').filter(function(s) {
		return s.length > 0;
	});
	var result = $;

	for (var s in pathSegments) {
		result = result[pathSegments[s]];
	}
	return result;
}

function _(libPath, isFn) {
	libPath = libPath.replace(/\//g, '.')
		.slice(libPath.startsWith('/') ? 1 : 0)
		.slice(0, libPath.endsWith('/') ? -1 : libPath.length);

	$.import(
		`${isFn ?
		    libPath.slice(0, libPath.lastIndexOf('.')) :
		    libPath
		  }.xsjslib`,
		isFn ?
		libPath.substr(libPath.lastIndexOf('.') + 1) :
		moduleKey
	);

	var libMember = getLibMember(`${libPath}.${isFn ? '' : moduleKey}`);

	if (isFn) {
		return libMember;
	} else {
		for (var fn in libMember) {
			$.import(libPath, libMember[fn]);
		}
		return getLibMember(libPath);
	}
}