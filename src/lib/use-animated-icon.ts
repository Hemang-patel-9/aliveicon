'use client';

import { useAnimation } from 'framer-motion';
import {
	useCallback,
	useEffect,
	useImperativeHandle,
	useRef,
	type ForwardedRef,
	type MouseEvent,
} from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from './types';

export type AnimationDefinition = Parameters<ReturnType<typeof useAnimation>['start']>[0];

export interface AnimatedIconOptions {
	rest?: string;
	animate?: AnimationDefinition;
	cycleMs?: number;
}

export function useAnimatedIcon(
	ref: ForwardedRef<AnimatedIconHandle>,
	{
		autoAnimateOnLoad = false,
		hoverable = true,
		loopOnHover = false,
		animateOnClick = false,
		onMouseEnter,
		onMouseLeave,
		onClick,
		...domProps
	}: Omit<AnimatedIconProps, 'size'>,
	{ rest = 'normal', animate = 'animate', cycleMs }: AnimatedIconOptions = {}
) {
	const controls = useAnimation();
	const runRef = useRef(0);
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

	const play = useCallback(
		async (loop: boolean) => {
			const run = ++runRef.current;
			clearTimer();
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

	const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
		if (hoverable && !isControlled) play(loopOnHover);
		onMouseEnter?.(e);
	};

	const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
		if (hoverable && !isControlled) stop();
		onMouseLeave?.(e);
	};

	const handleClick = (e: MouseEvent<HTMLDivElement>) => {
		if (animateOnClick) play(false);
		onClick?.(e);
	};

	return {
		controls,
		iconProps: {
			...domProps,
			onMouseEnter: handleMouseEnter,
			onMouseLeave: handleMouseLeave,
			onClick: handleClick,
		},
	};
}
