'use client'

import { motion, useAnimation } from 'framer-motion'
import {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useRef,
} from 'react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

interface Redo2Handle {
	startAnimation: () => void
	stopAnimation: () => void
}

interface Redo2Props extends React.HTMLAttributes<HTMLDivElement> {
	size?: number
	className?: string
	style?: React.CSSProperties
	autoAnimateOnLoad?: boolean
	hoverable?: boolean
	loopOnHover?: boolean
	animateOnClick?: boolean
}

const Redo2 = forwardRef<Redo2Handle, Redo2Props>(
	(
		{
			size = 28,
			className,
			style,
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
			await controls.start((i) => ({
				pathLength: [0, 1],
				opacity: [0, 1],
				transition: {
					duration: 0.6,
					delay: i * 0.1,
					ease: 'easeInOut',
				},
			}))
			await controls.start('visible')
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
				stopAnimation: () => controls.start('visible'),
			}
		})

		const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current && hoverable) animate()
			onMouseEnter?.(e)
		}

		const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current && hoverable) controls.start('visible')
			onMouseLeave?.(e)
		}

		const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
			if (animateOnClick) animate()
			onClick?.(e)
		}

		const paths = [
			'M15 14l5-5-5-5', // arrow
			'M20 9H9.5A5.5 5.5 0 0 0 4 14.5 5.5 5.5 0 0 0 9.5 20H13', // curve
		]

		return (
			<div
				className={cn('inline-block', className)}
				style={{ width: size, height: size, ...style }}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onClick={handleClick}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="100%"
					height="100%"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					{paths.map((d, i) => (
						<motion.path
							key={i}
							d={d}
							initial="visible"
							animate={controls}
							custom={i}
							variants={{ visible: { pathLength: 1, opacity: 1 } }}
						/>
					))}
				</svg>
			</div>
		)
	}
)

Redo2.displayName = 'Redo2'
export { Redo2 }
