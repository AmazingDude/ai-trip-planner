import { useState } from "react";
import VisualFallback from "./VisualFallback";

function SmartImage({ src, alt = "", title, type, className = "" }) {
	const [hasError, setHasError] = useState(false);
	const imageSrc = typeof src === "string" ? src.trim() : "";

	if (!imageSrc || hasError) {
		return <VisualFallback title={title || alt} type={type} className={className} />;
	}

	return (
		<img
			src={imageSrc}
			alt={alt}
			className={className}
			loading="lazy"
			referrerPolicy="no-referrer"
			onError={() => setHasError(true)}
		/>
	);
}

export default SmartImage;
