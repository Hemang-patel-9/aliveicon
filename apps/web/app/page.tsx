import { Gallery } from '@/components/gallery/Gallery';

export default function HomePage() {
	return (
		<div className="mx-auto w-full max-w-(--content-max)">
			<h1 className="sr-only">Animated icons for React</h1>
			<Gallery />
		</div>
	);
}
