interface Gate {
	open: boolean;
	promise: Promise<void>;
	release: () => void;
}

const gates = new Map<string, Gate>();

export const SERVER_PREFIX = 's';
export const CLIENT_PREFIX = 'c';

export function chunkId(prefix: string, firstSlug: string) {
	return `${prefix}:${firstSlug}`;
}

export function gateFor(id: string): Gate {
	const existing = gates.get(id);
	if (existing) return existing;

	let resolve: () => void = () => {};
	const promise = new Promise<void>((done) => {
		resolve = done;
	});
	const gate: Gate = {
		open: false,
		promise,
		release: () => {
			if (gate.open) return;
			gate.open = true;
			resolve();
		},
	};
	gates.set(id, gate);
	return gate;
}

export function openGate(id: string) {
	gateFor(id).release();
}

export function dropGate(id: string) {
	gates.delete(id);
}

export function isServerRendered(id: string) {
	if (!id.startsWith(`${SERVER_PREFIX}:`)) return false;
	const tile = document.getElementById(`tile-${id.slice(SERVER_PREFIX.length + 1)}`);
	return tile?.parentElement?.getAttribute('data-chunk') === id;
}
