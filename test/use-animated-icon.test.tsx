import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { createRef, forwardRef } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { AnimatedIconHandle, AnimatedIconProps } from '../src/lib/types';
import { useAnimatedIcon, type AnimatedIconOptions } from '../src/lib/use-animated-icon';

interface Call {
	target: unknown;
	finish: () => void;
}

const mocks = vi.hoisted(() => ({
	calls: [] as Call[],
}));

vi.mock('framer-motion', () => ({
	useAnimation: () => ({
		start: (target: unknown) =>
			new Promise<void>((resolve) => {
				mocks.calls.push({ target, finish: resolve });
			}),
	}),
}));

const targets = () => mocks.calls.map((call) => call.target);

const finish = async (index: number) => {
	await act(async () => {
		mocks.calls[index].finish();
	});
};

const makeIcon = (options?: AnimatedIconOptions) =>
	forwardRef<AnimatedIconHandle, AnimatedIconProps>((props, ref) => {
		const { iconProps, strokeWidth } = useAnimatedIcon(ref, props, options);
		return <div data-testid="icon" data-stroke={strokeWidth} {...iconProps} />;
	});

const Icon = makeIcon();
const icon = () => screen.getByTestId('icon');

const setReducedMotion = (matches: boolean) => {
	const listeners = new Set<() => void>();
	const query = {
		matches,
		addEventListener: (_: string, listener: () => void) => listeners.add(listener),
		removeEventListener: (_: string, listener: () => void) => listeners.delete(listener),
	};
	window.matchMedia = (() => query) as unknown as typeof window.matchMedia;
	return (next: boolean) => {
		query.matches = next;
		act(() => listeners.forEach((listener) => listener()));
	};
};

beforeEach(() => {
	mocks.calls.length = 0;
	setReducedMotion(false);
});

afterEach(() => {
	cleanup();
	vi.useRealTimers();
});

describe('hover', () => {
	it('plays the animation, then settles to rest', async () => {
		render(<Icon />);
		fireEvent.mouseEnter(icon());
		expect(targets()).toEqual(['animate']);
		await finish(0);
		expect(targets()).toEqual(['animate', 'normal']);
		await finish(1);
		expect(targets()).toEqual(['animate', 'normal']);
	});

	it('returns to rest when the pointer leaves', async () => {
		render(<Icon />);
		fireEvent.mouseEnter(icon());
		fireEvent.mouseLeave(icon());
		expect(targets()).toEqual(['animate', 'normal']);
		await finish(0);
		expect(targets()).toEqual(['animate', 'normal']);
	});

	it('does nothing when hoverable is off', () => {
		render(<Icon hoverable={false} />);
		fireEvent.mouseEnter(icon());
		fireEvent.mouseLeave(icon());
		expect(targets()).toEqual([]);
	});

	it('keeps replaying with loopOnHover until the pointer leaves', async () => {
		render(<Icon loopOnHover />);
		fireEvent.mouseEnter(icon());
		await finish(0);
		await finish(1);
		expect(targets()).toEqual(['animate', 'normal', 'animate']);
		fireEvent.mouseLeave(icon());
		await finish(2);
		expect(targets()).toEqual(['animate', 'normal', 'animate', 'normal']);
	});

	it('still calls the handlers passed by the user', () => {
		const onPointerEnter = vi.fn();
		const onMouseEnter = vi.fn();
		const onMouseLeave = vi.fn();
		const onClick = vi.fn();
		render(
			<Icon
				onPointerEnter={onPointerEnter}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				onClick={onClick}
			/>
		);
		fireEvent.pointerEnter(icon());
		fireEvent.mouseEnter(icon());
		fireEvent.click(icon());
		fireEvent.mouseLeave(icon());
		expect(onPointerEnter).toHaveBeenCalledTimes(1);
		expect(onMouseEnter).toHaveBeenCalledTimes(1);
		expect(onMouseLeave).toHaveBeenCalledTimes(1);
		expect(onClick).toHaveBeenCalledTimes(1);
	});
});

describe('touch', () => {
	it('plays once on a tap instead of looping', async () => {
		render(<Icon loopOnHover />);
		fireEvent.pointerEnter(icon(), { pointerType: 'touch' });
		fireEvent.mouseEnter(icon());
		await finish(0);
		await finish(1);
		expect(targets()).toEqual(['animate', 'normal']);
	});

	it('loops again once a mouse takes over', async () => {
		render(<Icon loopOnHover />);
		fireEvent.pointerEnter(icon(), { pointerType: 'touch' });
		fireEvent.mouseEnter(icon());
		fireEvent.mouseLeave(icon());
		mocks.calls.length = 0;
		fireEvent.pointerEnter(icon(), { pointerType: 'mouse' });
		fireEvent.mouseEnter(icon());
		await finish(0);
		await finish(1);
		expect(targets()).toEqual(['animate', 'normal', 'animate']);
	});
});

describe('click and mount', () => {
	it('plays on click only with animateOnClick', () => {
		const { rerender } = render(<Icon hoverable={false} />);
		fireEvent.click(icon());
		expect(targets()).toEqual([]);
		rerender(<Icon hoverable={false} animateOnClick />);
		fireEvent.click(icon());
		expect(targets()).toEqual(['animate']);
	});

	it('lets a click finish when the pointer leaves', async () => {
		render(<Icon animateOnClick />);
		fireEvent.mouseEnter(icon());
		fireEvent.click(icon());
		fireEvent.mouseLeave(icon());
		expect(targets()).toEqual(['animate', 'animate']);
		await finish(1);
		expect(targets()).toEqual(['animate', 'animate', 'normal']);
	});

	it('plays once on mount with autoAnimateOnLoad', async () => {
		render(<Icon autoAnimateOnLoad />);
		expect(targets()).toEqual(['animate']);
		await finish(0);
		expect(targets()).toEqual(['animate', 'normal']);
	});

	it('does not cut a mount animation short when the pointer leaves', () => {
		render(<Icon autoAnimateOnLoad />);
		fireEvent.mouseLeave(icon());
		expect(targets()).toEqual(['animate']);
	});

	it('does not play on mount by default', () => {
		render(<Icon />);
		expect(targets()).toEqual([]);
	});
});

describe('ref', () => {
	it('starts and stops through the handle', async () => {
		const ref = createRef<AnimatedIconHandle>();
		render(<Icon ref={ref} />);
		act(() => ref.current?.startAnimation());
		expect(targets()).toEqual(['animate']);
		act(() => ref.current?.stopAnimation());
		expect(targets()).toEqual(['animate', 'normal']);
		await finish(0);
		expect(targets()).toEqual(['animate', 'normal']);
	});

	it('ignores hover while a ref is attached, but not click or mount', () => {
		const ref = createRef<AnimatedIconHandle>();
		render(<Icon ref={ref} animateOnClick autoAnimateOnLoad />);
		expect(targets()).toEqual(['animate']);
		fireEvent.mouseEnter(icon());
		fireEvent.mouseLeave(icon());
		expect(targets()).toEqual(['animate']);
		fireEvent.click(icon());
		expect(targets()).toEqual(['animate', 'animate']);
	});
});

describe('options', () => {
	it('uses custom rest and animate names', async () => {
		const Custom = makeIcon({ rest: 'visible', animate: 'draw' });
		render(<Custom />);
		fireEvent.mouseEnter(icon());
		await finish(0);
		expect(targets()).toEqual(['draw', 'visible']);
	});

	it('ends an endless animation after cycleMs', () => {
		vi.useFakeTimers();
		const Endless = makeIcon({ cycleMs: 1000 });
		render(<Endless />);
		fireEvent.mouseEnter(icon());
		expect(targets()).toEqual(['animate']);
		act(() => vi.advanceTimersByTime(999));
		expect(targets()).toEqual(['animate']);
		act(() => vi.advanceTimersByTime(1));
		expect(targets()).toEqual(['animate', 'normal']);
	});

	it('lets an endless animation run while looping on hover', () => {
		vi.useFakeTimers();
		const Endless = makeIcon({ cycleMs: 1000 });
		render(<Endless loopOnHover />);
		fireEvent.mouseEnter(icon());
		act(() => vi.advanceTimersByTime(5000));
		expect(targets()).toEqual(['animate']);
		fireEvent.mouseLeave(icon());
		expect(targets()).toEqual(['animate', 'normal']);
	});
});

describe('cleanup', () => {
	it('stops after unmount', async () => {
		const { unmount } = render(<Icon loopOnHover />);
		fireEvent.mouseEnter(icon());
		unmount();
		await finish(0);
		expect(targets()).toEqual(['animate']);
	});

	it('clears the cycle timer on unmount', () => {
		vi.useFakeTimers();
		const Endless = makeIcon({ cycleMs: 1000 });
		const { unmount } = render(<Endless />);
		fireEvent.mouseEnter(icon());
		unmount();
		act(() => vi.advanceTimersByTime(2000));
		expect(targets()).toEqual(['animate']);
	});
});

describe('reduced motion', () => {
	it('never plays the animation', () => {
		setReducedMotion(true);
		render(<Icon autoAnimateOnLoad animateOnClick />);
		fireEvent.mouseEnter(icon());
		fireEvent.click(icon());
		expect(targets()).not.toContain('animate');
	});

	it('follows the setting while the page is open', () => {
		const change = setReducedMotion(false);
		render(<Icon loopOnHover />);
		fireEvent.mouseEnter(icon());
		expect(targets()).toEqual(['animate']);
		change(true);
		expect(targets()).toEqual(['animate', 'normal']);
		fireEvent.mouseEnter(icon());
		expect(targets()).toEqual(['animate', 'normal', 'normal']);
		change(false);
		fireEvent.mouseEnter(icon());
		expect(targets()).toEqual(['animate', 'normal', 'normal', 'animate']);
	});

	it('works where matchMedia is missing', () => {
		window.matchMedia = undefined as unknown as typeof window.matchMedia;
		render(<Icon />);
		fireEvent.mouseEnter(icon());
		expect(targets()).toEqual(['animate']);
	});
});

describe('wrapper', () => {
	it('is 28px and inline-block by default', () => {
		render(<Icon />);
		expect(icon().style.width).toBe('28px');
		expect(icon().style.height).toBe('28px');
		expect(icon().style.display).toBe('inline-block');
		expect(icon().className).toBe('inline-block');
	});

	it('takes size as a number, a numeric string or a CSS length', () => {
		const { rerender } = render(<Icon size={40} />);
		expect(icon().style.width).toBe('40px');
		rerender(<Icon size="32" />);
		expect(icon().style.width).toBe('32px');
		expect(icon().style.height).toBe('32px');
		rerender(<Icon size="1.5em" />);
		expect(icon().style.width).toBe('1.5em');
		expect(icon().hasAttribute('size')).toBe(false);
	});

	it.each([
		'hidden',
		'block',
		'flex',
		'inline-flex',
		'grid',
		'contents',
		'table-cell',
		'md:hidden',
		'dark:md:hover:flex',
		'!hidden',
		'hidden!',
		'[display:none]',
		'max-md:[display:none]',
		'text-red-500 md:hidden',
	])('leaves display to the class "%s"', (className) => {
		render(<Icon className={className} />);
		expect(icon().style.display).toBe('');
	});

	it.each(['text-red-500', 'overflow-hidden', 'my-icon', 'w-10 h-10', 'table-fixed', 'flex-1'])(
		'keeps inline-block next to the class "%s"',
		(className) => {
			render(<Icon className={className} />);
			expect(icon().style.display).toBe('inline-block');
		}
	);

	it('merges className with tailwind-merge', () => {
		const { rerender } = render(<Icon className="text-red-500" />);
		expect(icon().className).toBe('inline-block text-red-500');
		rerender(<Icon className="hidden" />);
		expect(icon().className).toBe('hidden');
		rerender(<Icon className="md:hidden" />);
		expect(icon().className).toBe('inline-block md:hidden');
	});

	it('lets style override size, display and color', () => {
		render(<Icon size={40} color="red" style={{ width: 10, display: 'flex', color: 'blue' }} />);
		expect(icon().style.width).toBe('10px');
		expect(icon().style.height).toBe('40px');
		expect(icon().style.display).toBe('flex');
		expect(icon().style.color).toBe('blue');
	});

	it('turns color into the text color, not an attribute', () => {
		render(<Icon color="rgb(255, 0, 0)" />);
		expect(icon().style.color).toBe('rgb(255, 0, 0)');
		expect(icon().hasAttribute('color')).toBe(false);
	});

	it('returns strokeWidth for the svg and keeps it off the wrapper', () => {
		const { rerender } = render(<Icon />);
		expect(icon().dataset.stroke).toBe('2');
		rerender(<Icon strokeWidth={1.5} />);
		expect(icon().dataset.stroke).toBe('1.5');
		expect(icon().hasAttribute('strokeWidth')).toBe(false);
		expect(icon().hasAttribute('stroke-width')).toBe(false);
	});

	it('passes other attributes through', () => {
		render(<Icon id="bell" role="img" aria-label="Notifications" />);
		expect(icon().id).toBe('bell');
		expect(icon().getAttribute('role')).toBe('img');
		expect(icon().getAttribute('aria-label')).toBe('Notifications');
	});
});
