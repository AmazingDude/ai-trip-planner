import { Heart } from "lucide-react";

function Footer() {
	return (
		<div className="mt-7 border-t bg-gray-50 p-4">
			<h3 className="flex items-center justify-end gap-1 pr-5 text-sm text-[#31363F]">
				Made with <Heart className="size-4 fill-[#64a69c] text-[#64a69c]" /> in{" "}
				<span className="text-[#64a69c]">Pakistan</span>
			</h3>
		</div>
	);
}

export default Footer;
