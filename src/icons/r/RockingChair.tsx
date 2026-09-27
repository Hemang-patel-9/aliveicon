'use client'

import { motion, useAnimation } from 'framer-motion'
import {
	forwardRef,
	useImperativeHandle,
	useRef,
	useCallback,
	useEffect,
	type HTMLAttributes,
} from 'react'
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

interface RockingChairHandle {
	startAnimation: () => void
	stopAnimation: () => void
}

interface RockingChairProps extends HTMLAttributes<HTMLDivElement> {
	size?: number
	autoAnimateOnLoad?: boolean
	hoverable?: boolean
	loopOnHover?: boolean
	animateOnClick?: boolean
}

const rockingVariants = {
	normal: { rotate: 0 },
	animate: {
		rotate: [-2, 2, -1.5, 1.5, -1, 1, -0.5, 0],
		transition: {
			duration: 2,
			repeat: Infinity,
			ease: 'easeInOut',
			times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
		},
	},
}

const RockingChair = forwardRef<RockingChairHandle, RockingChairProps>(
	(
		{
			className,
			size = 28,
			autoAnimateOnLoad = false,
			hoverable = true,
			loopOnHover = false,
			animateOnClick = false,
			onMouseEnter,
			onMouseLeave,
			onClick,
			...props
		},
		ref
	) => {
		const controls = useAnimation()
		const loopRef = useRef(loopOnHover)
		const isControlledRef = useRef(false)

		const animate = useCallback(async () => {
			await controls.start('animate')
			if (loopRef.current) animate()
		}, [controls])

		useEffect(() => {
			loopRef.current = loopOnHover
		}, [loopOnHover])

		useEffect(() => {
			if (autoAnimateOnLoad) animate()
		}, [autoAnimateOnLoad, animate])

		useImperativeHandle(ref, () => {
			isControlledRef.current = true
			return {
				startAnimation: animate,
				stopAnimation: () => controls.start('normal'),
			}
		})

		const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current && hoverable) animate()
			onMouseEnter?.(e)
		}

		const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current && hoverable) controls.start('normal')
			onMouseLeave?.(e)
		}

		const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
			if (animateOnClick) animate()
			onClick?.(e)
		}

		return (
			<div
				className={cn('inline-block', className)}
				style={{ width: size, height: size }}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onClick={handleClick}
				{...props}
			>
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					width="100%"
					height="100%"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					variants={rockingVariants}
					initial="normal"
					animate={controls}
				>
					<polyline points="3.5 2 6.5 12.5 18 12.5" />
					<line x1="9.5" y1="12.5" x2="5.5" y2="20" />
					<line x1="15" y1="12.5" x2="18.5" y2="20" />
					<path d="M2.75 18a13 13 0 0 0 18.5 0" />
				</motion.svg>
			</div>
		)
	}
)

RockingChair.displayName = 'RockingChair'
export { RockingChair }
