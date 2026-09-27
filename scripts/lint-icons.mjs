import fs from 'node:fs';
import path from 'node:path';

const iconsDir = 'src/icons';

const legacyIcons = [
	'a/AlarmClockCheck',
	'a/AlarmClockMinus',
	'a/AlarmClockPlus',
	'a/Annoyed',
	'a/Antenna',
	'a/Aperture',
	'a/AppWindowMac',
	'a/ArrowDown01',
	'a/ArrowDown10',
	'a/ArrowDownAZ',
	'a/ArrowDownToLine',
	'a/ArrowDownZA',
	'a/Axe',
	'b/BadgeAlert',
	'b/BatteryCharging',
	'b/BatteryFull',
	'b/BatteryLow',
	'b/BatteryMedium',
	'b/BatteryPlus',
	'b/BatteryWarning',
	'b/Bell',
	'b/BellRing',
	'b/BetweenHorizontalStart',
	'b/BetweenVerticalEnd',
	'b/Blocks',
	'b/BookAudio',
	'b/Bot',
	'b/BowArrow',
	'b/Brush',
	'c/CalendarSearch',
	'c/CalendarSync',
	'c/ChartBarBig',
	'c/ChevronsDownUp',
	'c/ChevronsLeftRight',
	'c/ChevronsLeftRightEllipsis',
	'c/ChevronsRightLeft',
	'c/ChevronsUpDown',
	'r/Radar',
	'r/RedoDot',
	'r/RefreshCcw',
	'r/RefreshCcwDot',
	'r/RefreshCw',
	'r/Regex',
	'r/RemoveFormatting',
	'r/Replace',
	'r/ReplaceAll',
	'r/Rocket',
	'r/RockingChair',
	'r/RollerCoaster',
	'r/Rotate3d',
	'r/RotateCcw',
	'u/UndoDot',
	'u/UnfoldHorizontal',
	'u/UnfoldVertical',
	'u/Ungroup',
	'u/University',
	'v/Vibrate',
	'w/Wind',
	'w/WindArrowDown',
	'w/Wine',
	'w/WineOff',
	'w/Workflow',
	'w/Worm',
	'w/WrapText',
	'w/Wrench',
];

const rules = [
	["missing 'use client'", (src) => /^'use client';/.test(src)],
	['has console calls', (src) => !/\bconsole\./.test(src)],
	['defines its own cn()', (src) => !/function cn\(|from '(clsx|tailwind-merge)'/.test(src)],
	[
		'viewBox is not 0 0 24 24',
		(src, name) => name === 'XTwitter' || src.includes('viewBox="0 0 24 24"'),
	],
	['svg is missing aria-hidden', (src) => src.includes('aria-hidden="true"')],
	['stroke is not currentColor', (src) => src.includes('stroke="currentColor"')],
	['missing displayName', (src, name) => src.includes(`${name}.displayName = '${name}'`)],
];

const problems = [];
let count = 0;

for (const letter of fs.readdirSync(iconsDir).sort()) {
	for (const file of fs.readdirSync(path.join(iconsDir, letter)).sort()) {
		const name = path.basename(file, '.tsx');
		const id = `${letter}/${name}`;
		const src = fs.readFileSync(path.join(iconsDir, letter, file), 'utf8');
		const usesHook = src.includes('useAnimatedIcon(');
		count++;

		for (const [message, ok] of rules) {
			if (!ok(src, name)) problems.push(`${id}: ${message}`);
		}
		if (usesHook && legacyIcons.includes(id)) {
			problems.push(`${id}: uses useAnimatedIcon now, remove it from legacyIcons`);
		}
		if (!usesHook && !legacyIcons.includes(id)) {
			problems.push(`${id}: should use useAnimatedIcon`);
		}
	}
}

for (const id of legacyIcons) {
	if (!fs.existsSync(path.join(iconsDir, `${id}.tsx`)))
		problems.push(`${id}: in legacyIcons but not found`);
}

if (problems.length) {
	console.error(problems.join('\n'));
	process.exit(1);
}
console.log(`${count} icons ok`);
