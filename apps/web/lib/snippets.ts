import type { Settings } from './settings/schema';

const LIBRARY_DEFAULT_SIZE = 28;

export function importSnippet(name: string) {
	return `import { ${name} } from 'aliveicon';`;
}

export function jsxSnippet(name: string, settings: Settings) {
	const props: string[] = [];
	if (settings.iconSize !== LIBRARY_DEFAULT_SIZE) props.push(`size={${settings.iconSize}}`);
	if (settings.iconColor !== 'theme') props.push(`style={{ color: '${settings.iconColor}' }}`);
	if (!settings.hoverable) props.push('hoverable={false}');
	if (settings.loopOnHover) props.push('loopOnHover');
	if (settings.animateOnClick) props.push('animateOnClick');
	if (settings.autoAnimateOnLoad) props.push('autoAnimateOnLoad');
	return `<${name}${props.length ? ` ${props.join(' ')}` : ''} />`;
}

export function copySnippet(name: string, settings: Settings) {
	switch (settings.copyFormat) {
		case 'name':
			return name;
		case 'jsx':
			return jsxSnippet(name, settings);
		default:
			return importSnippet(name);
	}
}
