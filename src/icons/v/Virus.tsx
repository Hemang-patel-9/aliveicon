'use client';

import { motion, type Variants } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import type { AnimatedIconHandle, AnimatedIconProps } from '../../lib/types';
import { useAnimatedIcon } from '../../lib/use-animated-icon';

const popVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: (i: number) => ({
		scale: [1, 1.35, 1],
		transition: { duration: 0.4, delay: i * 0.08, ease: 'easeInOut' },
	}),
};

const spikeVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const pulseVariants: Variants = {
	normal: { scale: 1, transition: { duration: 0.2 } },
	animate: {
		scale: [1, 1.08, 1],
		transition: { duration: 0.5, ease: 'easeInOut' },
	},
};

const Virus = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
	({ className, size = 28, style, ...props }, ref) => {
		const { controls, iconProps } = useAnimatedIcon(ref, props);

		return (
			<div
				className={cn('inline-block', className)}
				style={{ width: size, height: size, ...style }}
				{...iconProps}
			>
				<svg
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					width="100%"
					height="100%"
				>
					<motion.path
						d="M12 14.991h.01"
						variants={popVariants}
						initial="normal"
						animate={controls}
						custom={0}
					/>
					<motion.path d="M12 22v-3" variants={spikeVariants} initial="normal" animate={controls} />
					<motion.path d="M12 2v3" variants={spikeVariants} initial="normal" animate={controls} />
					<motion.path d="M13 22h-2" variants={spikeVariants} initial="normal" animate={controls} />
					<motion.path d="M13 2h-2" variants={spikeVariants} initial="normal" animate={controls} />
					<motion.path
						d="M13.99 10H14"
						variants={popVariants}
						initial="normal"
						animate={controls}
						custom={1}
					/>
					<motion.path
						d="m16.5 19.794-1-1.733"
						variants={spikeVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m16.5 4.205-1 1.732"
						variants={spikeVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m19.794 16.5-1.732-1"
						variants={spikeVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m19.794 7.5-1.732 1"
						variants={spikeVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path d="M2 12h3" variants={spikeVariants} initial="normal" animate={controls} />
					<motion.path d="M2 13v-2" variants={spikeVariants} initial="normal" animate={controls} />
					<motion.path d="M22 12h-3" variants={spikeVariants} initial="normal" animate={controls} />
					<motion.path d="M22 13v-2" variants={spikeVariants} initial="normal" animate={controls} />
					<motion.path
						d="m4.206 16.5 1.732-1"
						variants={spikeVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m4.206 7.5 1.732 1"
						variants={spikeVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m7.5 19.794 1-1.733"
						variants={spikeVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m7.5 4.205 1 1.732"
						variants={spikeVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M9 12h.01"
						variants={popVariants}
						initial="normal"
						animate={controls}
						custom={2}
					/>
					<motion.circle
						cx="12"
						cy="12"
						r="7"
						variants={pulseVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

Virus.displayName = 'Virus';

export { Virus };
