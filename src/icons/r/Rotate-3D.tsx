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

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

interface Rotate3dHandle {
	startAnimation: () => void
	stopAnimation: () => void
}

interface Rotate3dProps extends HTMLAttributes<HTMLDivElement> {
	size?: number
	autoAnimateOnLoad?: boolean
	hoverable?: boolean
	loopOnHover?: boolean
	animateOnClick?: boolean
}

const Rotate3d = forwardRef<Rotate3dHandle, Rotate3dProps>(
	(
		{
			size = 28,
			className,
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
				opacity: [0.5, 1],
				transition: {
					duration: 0.6,
					delay: i * 0.05,
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
			if (!isControlledRef.current && hoverable)
				controls.start('visible')
			onMouseLeave?.(e)
		}

		const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
			if (animateOnClick) animate()
			onClick?.(e)
		}

		const paths = [
			'M16.466 7.5C15.643 4.237 13.952 2 12 2 9.239 2 7 6.477 7 12s2.239 10 5 10c.342 0 .677-.069 1-.2',
			'M15.194 13.707l3.814 1.86-1.86 3.814',
			'M19 15.57c-1.804.885-4.274 1.43-7 1.43-5.523 0-10-2.239-10-5s4.477-5 10-5c4.838 0 8.873 1.718 9.8 4',
		]

		return (
			<div
				className={cn('inline-block', className)}
				style={{ width: size, height: size }}
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
							variants={{
								visible: { pathLength: 1, opacity: 1 },
							}}
						/>
					))}
				</svg>
			</div>
		)
	}
)

Rotate3d.displayName = 'Rotate3d'
export { Rotate3d }
