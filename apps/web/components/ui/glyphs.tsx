import type { SVGProps } from 'react';

function Glyph({ children, ...props }: SVGProps<SVGSVGElement>) {
	return (
		<svg
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			width="16"
			height="16"
			{...props}
		>
			{children}
		</svg>
	);
}

export function SunGlyph(props: SVGProps<SVGSVGElement>) {
	return (
		<Glyph {...props}>
			<circle cx="12" cy="12" r="4" />
			<path d="M12 2v2" />
			<path d="M12 20v2" />
			<path d="m4.93 4.93 1.41 1.41" />
			<path d="m17.66 17.66 1.41 1.41" />
			<path d="M2 12h2" />
			<path d="M20 12h2" />
			<path d="m6.34 17.66-1.41 1.41" />
			<path d="m19.07 4.93-1.41 1.41" />
		</Glyph>
	);
}

export function MoonGlyph(props: SVGProps<SVGSVGElement>) {
	return (
		<Glyph {...props}>
			<path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
		</Glyph>
	);
}

export function MonitorGlyph(props: SVGProps<SVGSVGElement>) {
	return (
		<Glyph {...props}>
			<rect width="20" height="14" x="2" y="3" rx="2" />
			<line x1="8" x2="16" y1="21" y2="21" />
			<line x1="12" x2="12" y1="17" y2="21" />
		</Glyph>
	);
}

export function ArrowUpRightGlyph(props: SVGProps<SVGSVGElement>) {
	return (
		<Glyph {...props}>
			<path d="M7 7h10v10" />
			<path d="M7 17 17 7" />
		</Glyph>
	);
}

export function SearchGlyph(props: SVGProps<SVGSVGElement>) {
	return (
		<Glyph {...props}>
			<path d="m21 21-4.34-4.34" />
			<circle cx="11" cy="11" r="8" />
		</Glyph>
	);
}

export function XGlyph(props: SVGProps<SVGSVGElement>) {
	return (
		<Glyph {...props}>
			<path d="M18 6 6 18" />
			<path d="m6 6 12 12" />
		</Glyph>
	);
}

export function CopyGlyph(props: SVGProps<SVGSVGElement>) {
	return (
		<Glyph {...props}>
			<rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
			<path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
		</Glyph>
	);
}

export function CheckGlyph(props: SVGProps<SVGSVGElement>) {
	return (
		<Glyph {...props}>
			<path d="M20 6 9 17l-5-5" />
		</Glyph>
	);
}

export function SlidersGlyph(props: SVGProps<SVGSVGElement>) {
	return (
		<Glyph {...props}>
			<path d="M10 5H3" />
			<path d="M12 19H3" />
			<path d="M14 3v4" />
			<path d="M16 17v4" />
			<path d="M21 12h-9" />
			<path d="M21 19h-5" />
			<path d="M21 5h-7" />
			<path d="M8 10v4" />
			<path d="M8 12H3" />
		</Glyph>
	);
}

export function PlayGlyph(props: SVGProps<SVGSVGElement>) {
	return (
		<Glyph {...props}>
			<path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
		</Glyph>
	);
}

export function ResetGlyph(props: SVGProps<SVGSVGElement>) {
	return (
		<Glyph {...props}>
			<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
			<path d="M3 3v5h5" />
		</Glyph>
	);
}

export function LinkGlyph(props: SVGProps<SVGSVGElement>) {
	return (
		<Glyph {...props}>
			<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
			<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
		</Glyph>
	);
}
