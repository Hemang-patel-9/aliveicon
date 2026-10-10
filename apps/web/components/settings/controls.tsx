'use client';

import { useId, useState, type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { COLOR_FALLBACK, type ColorField, type NumberField } from '@/lib/settings/schema';

interface ShellProps {
	id: string;
	label: string;
	hint?: string;
	children: ReactNode;
	trailing?: ReactNode;
}

export function FieldShell({ id, label, hint, children, trailing }: ShellProps) {
	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-center justify-between gap-3">
				<label htmlFor={id} className="text-text text-sm font-medium">
					{label}
				</label>
				{trailing}
			</div>
			{children}
			{hint ? <p className="text-subtle text-xs">{hint}</p> : null}
		</div>
	);
}

interface SliderProps {
	field: NumberField;
	value: number;
	onChange: (value: number) => void;
}

export function SliderControl({ field, value, onChange }: SliderProps) {
	const id = useId();
	const [draft, setDraft] = useState<string | null>(null);

	const commit = () => {
		if (draft !== null && draft.trim() !== '') onChange(Number(draft));
		setDraft(null);
	};

	return (
		<FieldShell
			id={id}
			label={field.label}
			hint={field.hint}
			trailing={
				<span className="border-hair rounded-sm bg-surface focus-within:border-border-strong flex h-6 items-center px-1.5">
					<input
						type="number"
						inputMode="decimal"
						aria-label={`${field.label} value`}
						min={field.min}
						max={field.max}
						step={field.step}
						value={draft ?? String(value)}
						onChange={(event) => setDraft(event.target.value)}
						onBlur={commit}
						onKeyDown={(event) => {
							if (event.key === 'Enter') commit();
							if (event.key === 'Escape') setDraft(null);
						}}
						className="text-text font-mono w-12 bg-transparent text-right text-xs outline-none"
					/>
					{field.unit ? (
						<span className="text-subtle font-mono pl-0.5 text-xs">{field.unit}</span>
					) : null}
				</span>
			}
		>
			<input
				id={id}
				type="range"
				className="range"
				min={field.min}
				max={field.max}
				step={field.step}
				value={value}
				onChange={(event) => onChange(Number(event.target.value))}
			/>
		</FieldShell>
	);
}

interface SegmentedProps {
	label: string;
	hint?: string;
	options: { value: string; label: string }[];
	value: string;
	onChange: (value: string) => void;
}

export function SegmentedControl({ label, hint, options, value, onChange }: SegmentedProps) {
	const name = useId();
	const labelId = useId();

	return (
		<div className="flex flex-col gap-2">
			<span id={labelId} className="text-text text-sm font-medium">
				{label}
			</span>
			<div
				role="radiogroup"
				aria-labelledby={labelId}
				className="border-hair rounded-control bg-surface flex gap-0.5 p-0.5"
			>
				{options.map((option) => (
					<label
						key={option.value}
						className={cn(
							'rounded-sm duration-fast has-[:focus-visible]:outline-ring flex min-h-7 flex-1 cursor-pointer items-center justify-center px-2 text-center text-xs font-medium transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-1',
							value === option.value
								? 'bg-raised text-text border-hair'
								: 'text-muted hover:text-text border border-transparent'
						)}
					>
						<input
							type="radio"
							name={name}
							value={option.value}
							checked={value === option.value}
							onChange={() => onChange(option.value)}
							className="sr-only"
						/>
						{option.label}
					</label>
				))}
			</div>
			{hint ? <p className="text-subtle text-xs">{hint}</p> : null}
		</div>
	);
}

interface SwitchProps {
	label: string;
	hint?: string;
	checked: boolean;
	onChange: (value: boolean) => void;
}

export function SwitchControl({ label, hint, checked, onChange }: SwitchProps) {
	const id = useId();
	const hintId = useId();

	return (
		<div className="flex items-start justify-between gap-4">
			<div className="flex flex-col gap-0.5">
				<label htmlFor={id} className="text-text cursor-pointer text-sm font-medium">
					{label}
				</label>
				{hint ? (
					<p id={hintId} className="text-subtle text-xs">
						{hint}
					</p>
				) : null}
			</div>
			<button
				id={id}
				type="button"
				role="switch"
				aria-checked={checked}
				aria-describedby={hint ? hintId : undefined}
				onClick={() => onChange(!checked)}
				className={cn(
					'duration-fast border-hair relative mt-0.5 h-5 w-9 shrink-0 rounded-full transition-colors',
					checked ? 'bg-accent border-accent' : 'bg-sunken border-border-strong'
				)}
			>
				<span
					aria-hidden="true"
					className={cn(
						'duration-fast absolute top-0.5 left-0.5 size-3.5 rounded-full transition-transform',
						checked ? 'bg-on-accent translate-x-4' : 'bg-muted translate-x-0'
					)}
				/>
			</button>
		</div>
	);
}

interface ColorProps {
	field: ColorField;
	value: string;
	onChange: (value: string) => void;
}

const presetLabel = (preset: string) => (preset === 'theme' ? 'Theme default' : preset);

export function ColorControl({ field, value, onChange }: ColorProps) {
	const id = useId();
	const [draft, setDraft] = useState<string | null>(null);
	const customValue = value === 'theme' ? '' : value;
	const isCustom = value !== 'theme' && !field.presets.includes(value);

	const commit = () => {
		if (draft !== null && draft.trim() !== '') {
			onChange(draft.startsWith('#') ? draft : `#${draft}`);
		}
		setDraft(null);
	};

	return (
		<div className="flex flex-col gap-2">
			<span id={id} className="text-text text-sm font-medium">
				{field.label}
			</span>
			<div role="radiogroup" aria-labelledby={id} className="flex flex-wrap items-center gap-2">
				{field.presets.map((preset) => (
					<button
						key={preset}
						type="button"
						role="radio"
						aria-checked={value === preset}
						aria-label={presetLabel(preset)}
						title={presetLabel(preset)}
						onClick={() => onChange(preset)}
						className={cn(
							'rounded-full size-6 border p-0.5',
							value === preset ? 'border-text' : 'border-border-strong'
						)}
					>
						<span
							className="bg-icon block size-full rounded-full"
							style={preset === 'theme' ? undefined : { backgroundColor: preset }}
						/>
					</button>
				))}
				{field.allowCustom ? (
					<label
						className={cn(
							'rounded-full relative size-6 cursor-pointer border p-0.5',
							isCustom ? 'border-text' : 'border-border-strong'
						)}
					>
						<span className="sr-only">Custom color</span>
						<input
							type="color"
							value={customValue.length === 7 ? customValue : COLOR_FALLBACK}
							onChange={(event) => onChange(event.target.value)}
							className="absolute inset-0 size-full cursor-pointer opacity-0"
						/>
						<span
							aria-hidden="true"
							className="border-border-strong block size-full rounded-full border border-dashed"
							style={isCustom ? { backgroundColor: value, borderStyle: 'solid' } : undefined}
						/>
					</label>
				) : null}
				{field.allowCustom ? (
					<input
						type="text"
						aria-label="Hex color"
						placeholder={COLOR_FALLBACK}
						maxLength={7}
						spellCheck={false}
						value={draft ?? customValue}
						onChange={(event) => setDraft(event.target.value)}
						onBlur={commit}
						onKeyDown={(event) => {
							if (event.key === 'Enter') commit();
							if (event.key === 'Escape') setDraft(null);
						}}
						className="border-hair rounded-sm bg-surface text-text font-mono h-6 w-[5.5rem] px-1.5 text-xs outline-none focus:border-border-strong"
					/>
				) : null}
			</div>
		</div>
	);
}
