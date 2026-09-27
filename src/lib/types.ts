import type { HTMLAttributes } from 'react';

export interface AnimatedIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

export interface AnimatedIconTriggers {
	autoAnimateOnLoad?: boolean;
	hoverable?: boolean;
	loopOnHover?: boolean;
	animateOnClick?: boolean;
}

export interface AnimatedIconProps extends HTMLAttributes<HTMLDivElement>, AnimatedIconTriggers {
	size?: number;
}
