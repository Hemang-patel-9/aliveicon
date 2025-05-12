import { motion } from "framer-motion";
import React from "react";

type Props = {
	size?: number;
	color?: string;
	className?: string;
};

export const ClockIcon: React.FC<Props> = ({
	size = 24,
	color = "currentColor",
	className = "",
}) => {
	return (
		<motion.svg
			className={className}
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke={color}
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			initial={{ rotate: 0 }}
			animate={{ rotate: 360 }}
			transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
		>
			<circle cx="12" cy="12" r="10" />
			<polyline points="12 6 12 12 16 14" />
		</motion.svg>
	);
};
