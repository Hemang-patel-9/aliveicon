'use client';

import { useAnimation } from 'framer-motion';
import {
	useCallback,
	useEffect,
	useImperativeHandle,
	useRef,
	useSyncExternalStore,
	type ForwardedRef,
	type MouseEvent,
	type PointerEvent,
} from 'react';
import { cn } from './cn';
import type { AnimatedIconHandle, AnimatedIconProps } from './types';

export type AnimationDefinition = Parameters<ReturnType<typeof useAnimation>['start']>[0];

export interface AnimatedIconOptions {
	rest?: string;
	animate?: AnimationDefinition;
	cycleMs?: number;
}

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

const DISPLAY_CLASSES = new Set([
	'block',
	'inline-block',
	'inline',
	'flex',
	'inline-flex',
	'grid',
	'inline-grid',
	'hidden',
	'contents',
	'flow-root',
	'list-item',
	'table',
	'inline-table',
	'table-caption',
	'table-cell',
	'table-column',
	'table-column-group',
	'table-footer-group',
	'table-header-group',
	'table-row-group',
	'table-row',
]);

const prefersReducedMotion = () =>
	typeof window !== 'undefined' && Boolean(window.matchMedia?.(REDUCED_MOTION)?.matches);

const subscribeToReducedMotion = (onChange: () => void) => {
	const query = window.matchMedia?.(REDUCED_MOTION);
	query?.addEventListener?.('change', onChange);
	return () => query?.removeEventListener?.('change', onChange);
};

const hasDisplayClass = (className = '') =>
	className.split(/\s+/).some((token) => {
		if (token.includes('[display:')) return true;
		const utility = token.slice(token.lastIndexOf(':') + 1).replace(/^!|!$/g, '');
		return DISPLAY_CLASSES.has(utility);
	});

const toCssSize = (size: number | string) =>
	typeof size === 'string' && size.trim() !== '' && !Number.isNaN(Number(size))
		? Number(size)
		: size;

export function useAnimatedIcon(
	ref: ForwardedRef<AnimatedIconHandle>,
	{
		size = 28,
		color,
		strokeWidth = 2,
		className,
		style,
		autoAnimateOnLoad = false,
		hoverable = true,
		loopOnHover = false,
		animateOnClick = false,
		onPointerEnter,
		onMouseEnter,
		onMouseLeave,
		onClick,
		...domProps
	}: AnimatedIconProps,
	{ rest = 'normal', animate = 'animate', cycleMs }: AnimatedIconOptions = {}
) {
	const controls = useAnimation();
	const shouldReduceMotion = useSyncExternalStore(
		subscribeToReducedMotion,
		prefersReducedMotion,
		() => false
	);
	const runRef = useRef(0);
	const hoverRunRef = useRef(0);
	const touchRef = useRef(false);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const isControlled = ref != null;

	const clearTimer = () => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
	};

	const stop = useCallback(() => {
		runRef.current++;
		clearTimer();
		controls.start(rest);
	}, [controls, rest]);

	useEffect(() => {
		if (shouldReduceMotion) stop();
	}, [shouldReduceMotion, stop]);

	const play = useCallback(
		async (loop: boolean) => {
			const run = ++runRef.current;
			clearTimer();
			if (prefersReducedMotion()) {
				controls.start(rest);
				return;
			}
			if (cycleMs) {
				controls.start(animate);
				if (!loop) {
					timeoutRef.current = setTimeout(() => {
						if (run === runRef.current) controls.start(rest);
					}, cycleMs);
				}
				return;
			}
			do {
				await controls.start(animate);
				if (run !== runRef.current) return;
				await controls.start(rest);
			} while (loop && run === runRef.current);
		},
		[controls, rest, animate, cycleMs]
	);

	useImperativeHandle(
		ref,
		() => ({
			startAnimation: () => {
				play(false);
			},
			stopAnimation: stop,
		}),
		[play, stop]
	);

	useEffect(() => {
		if (autoAnimateOnLoad) play(false);
	}, [autoAnimateOnLoad, play]);

	useEffect(
		() => () => {
			runRef.current++;
			clearTimer();
		},
		[]
	);

	const handlePointerEnter = (e: PointerEvent<HTMLDivElement>) => {
		touchRef.current = e.pointerType === 'touch';
		onPointerEnter?.(e);
	};

	const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
		if (hoverable && !isControlled) {
			play(loopOnHover && !touchRef.current);
			hoverRunRef.current = runRef.current;
		}
		onMouseEnter?.(e);
	};

	const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
		if (hoverable && !isControlled && runRef.current === hoverRunRef.current) stop();
		onMouseLeave?.(e);
	};

	const handleClick = (e: MouseEvent<HTMLDivElement>) => {
		if (animateOnClick) play(false);
		onClick?.(e);
	};

	const dimension = toCssSize(size);

	return {
		controls,
		strokeWidth,
		iconProps: {
			...domProps,
			className: cn('inline-block', className),
			style: {
				width: dimension,
				height: dimension,
				...(hasDisplayClass(className) ? null : { display: 'inline-block' }),
				...(color ? { color } : null),
				...style,
			},
			onPointerEnter: handlePointerEnter,
			onMouseEnter: handleMouseEnter,
			onMouseLeave: handleMouseLeave,
			onClick: handleClick,
		},
	};
}
