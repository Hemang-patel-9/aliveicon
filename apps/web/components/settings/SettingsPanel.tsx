'use client';

import { useSyncExternalStore } from 'react';
import { CheckGlyph, LinkGlyph, ResetGlyph } from '@/components/ui/glyphs';
import { useIsCopied, copyText } from '@/lib/copy-store';
import {
	fields,
	GROUP_LABELS,
	GROUP_ORDER,
	isDefault,
	type Field,
	type GroupId,
	type Settings,
} from '@/lib/settings/schema';
import { resetSettings, setSettings, shareUrl, useSettings } from '@/lib/settings/store';
import {
	getThemeChoice,
	setThemeChoice,
	subscribeTheme,
	type ThemeChoice,
} from '@/lib/theme-store';
import { siteConfig } from '@/site.config';
import { ColorControl, SegmentedControl, SliderControl, SwitchControl } from './controls';

const { modes } = siteConfig.theme;

const themeOptions: { value: ThemeChoice; label: string }[] = [
	{ value: 'light', label: 'Light' },
	{ value: 'dark', label: 'Dark' },
	...(modes.allowSystem ? [{ value: 'system' as const, label: 'System' }] : []),
];

function ThemeControl() {
	const choice = useSyncExternalStore(
		subscribeTheme,
		() => getThemeChoice(modes.default),
		() => modes.default
	);

	return (
		<SegmentedControl
			label="Theme"
			options={themeOptions}
			value={choice}
			onChange={(value) => setThemeChoice(value as ThemeChoice)}
		/>
	);
}

function FieldControl({ field, settings }: { field: Field; settings: Settings }) {
	const value = settings[field.key];

	switch (field.kind) {
		case 'number':
			return (
				<SliderControl
					field={field}
					value={value as number}
					onChange={(next) => setSettings({ [field.key]: next })}
				/>
			);
		case 'color':
			return (
				<ColorControl
					field={field}
					value={value as string}
					onChange={(next) => setSettings({ [field.key]: next })}
				/>
			);
		case 'option':
			return (
				<SegmentedControl
					label={field.label}
					hint={field.hint}
					options={field.options.map((option) => ({
						value: option,
						label: field.labels[option] ?? option,
					}))}
					value={value as string}
					onChange={(next) => setSettings({ [field.key]: next })}
				/>
			);
		case 'toggle':
			return (
				<SwitchControl
					label={field.label}
					hint={field.hint}
					checked={value as boolean}
					onChange={(next) => setSettings({ [field.key]: next })}
				/>
			);
	}
}

function ShareButton() {
	const copied = useIsCopied('settings-link');

	return (
		<button
			type="button"
			onClick={() => copyText('settings-link', shareUrl(), 'settings link')}
			className="border-hair rounded-control bg-surface text-text hover:border-border-strong duration-fast flex h-(--control-h) flex-1 items-center justify-center gap-2 text-sm font-medium transition-colors"
		>
			{copied ? <CheckGlyph /> : <LinkGlyph />}
			{copied ? 'Link copied' : 'Copy link'}
		</button>
	);
}

export function SettingsPanel() {
	const settings = useSettings();
	const visible = fields.filter((f) => f.visible && (!f.when || f.when(settings)));
	const anyChanged = fields.some((f) => f.visible && !isDefault(settings, f.key));

	return (
		<div className="flex flex-col gap-6 p-4">
			<ThemeControl />
			{GROUP_ORDER.map((group: GroupId) => {
				const inGroup = visible.filter((f) => f.group === group);
				if (inGroup.length === 0) return null;
				const keys = fields.filter((f) => f.group === group).map((f) => f.key);
				const changed = keys.some((key) => !isDefault(settings, key));

				return (
					<section
						key={group}
						aria-label={GROUP_LABELS[group]}
						className="border-t-hair flex flex-col gap-4 pt-4"
					>
						<div className="flex items-center justify-between">
							<h2 className="text-subtle font-mono text-xs tracking-wide uppercase">
								{GROUP_LABELS[group]}
							</h2>
							{changed ? (
								<button
									type="button"
									onClick={() => resetSettings(keys)}
									className="text-subtle hover:text-text rounded-sm duration-fast text-xs transition-colors"
								>
									Reset
								</button>
							) : null}
						</div>
						{inGroup.map((field) => (
							<FieldControl key={field.key} field={field} settings={settings} />
						))}
					</section>
				);
			})}
			<div className="border-t-hair flex gap-2 pt-4">
				{siteConfig.features.shareSettingsLink ? <ShareButton /> : null}
				<button
					type="button"
					disabled={!anyChanged}
					onClick={() => resetSettings()}
					className="border-hair rounded-control bg-surface text-text hover:border-border-strong duration-fast flex h-(--control-h) flex-1 items-center justify-center gap-2 text-sm font-medium transition-colors disabled:opacity-40"
				>
					<ResetGlyph />
					Reset all
				</button>
			</div>
		</div>
	);
}
