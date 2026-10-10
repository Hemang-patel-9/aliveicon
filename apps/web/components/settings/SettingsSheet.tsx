'use client';

import { useEffect, useRef } from 'react';
import { XGlyph } from '@/components/ui/glyphs';
import { siteConfig } from '@/site.config';
import { SettingsPanel } from './SettingsPanel';

interface SettingsSheetProps {
	open: boolean;
	onClose: () => void;
}

export function SettingsSheet({ open, onClose }: SettingsSheetProps) {
	const ref = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const dialog = ref.current;
		if (!dialog) return;
		if (open && !dialog.open) dialog.showModal();
		if (!open && dialog.open) dialog.close();
	}, [open]);

	useEffect(() => {
		const query = window.matchMedia(`(min-width:${siteConfig.theme.layout.breakpoints.tablet}px)`);
		const close = (event: MediaQueryListEvent) => {
			if (event.matches) onClose();
		};
		query.addEventListener('change', close);
		return () => query.removeEventListener('change', close);
	}, [onClose]);

	return (
		<dialog
			ref={ref}
			aria-label="Settings"
			className="g-sheet"
			onClose={onClose}
			onClick={(event) => {
				if (event.target === event.currentTarget) onClose();
			}}
		>
			{open ? (
				<div className="flex max-h-[88dvh] flex-col">
					<div className="border-b-hair flex items-center justify-between px-4 py-3">
						<h2 className="text-text text-sm font-medium">Settings</h2>
						<button
							type="button"
							aria-label="Close settings"
							onClick={onClose}
							className="text-muted hover:text-text rounded-sm flex size-8 items-center justify-center"
						>
							<XGlyph />
						</button>
					</div>
					<div className="overflow-y-auto overscroll-contain">
						<SettingsPanel />
					</div>
				</div>
			) : null}
		</dialog>
	);
}
