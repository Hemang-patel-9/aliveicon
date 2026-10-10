'use client';

import { use, useEffect, type ReactNode } from 'react';
import { dropGate, gateFor, isServerRendered } from '@/lib/hydration-gate';
import { isLetterLoaded, loadLetters } from '@/lib/icon-registry';

interface ChunkGateProps {
	id: string;
	letters: string[];
	eager: boolean;
	children: ReactNode;
}

export function ChunkGate({ id, letters, eager, children }: ChunkGateProps) {
	useEffect(() => () => dropGate(id), [id]);

	if (typeof window !== 'undefined') {
		const gate = gateFor(id);
		if (!gate.open) {
			if (eager && !isServerRendered(id)) gate.release();
			else use(gate.promise);
		}
	}

	if (!letters.every(isLetterLoaded)) use(loadLetters(letters));

	return <>{children}</>;
}
