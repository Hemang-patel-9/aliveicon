'use client';

import { use, useEffect, type ReactNode } from 'react';
import { dropGate, gateFor, isServerRendered } from '@/lib/hydration-gate';
import { loadBlocks } from '@/lib/icon-registry';

interface ChunkGateProps {
	id: string;
	blocks: string[];
	eager: boolean;
	inline?: boolean;
	children: ReactNode;
}

export function ChunkGate({ id, blocks, eager, inline = false, children }: ChunkGateProps) {
	useEffect(() => () => dropGate(id), [id]);

	if (typeof window !== 'undefined' && !inline) {
		const gate = gateFor(id);
		if (!gate.open && eager && !isServerRendered(id)) gate.release();
		use(gate.promise);
	}

	use(loadBlocks(blocks));

	return <>{children}</>;
}
