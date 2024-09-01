import { Metadata } from "next";

export const metaGenerator = async (): Promise<Metadata> => {
	return {
		title: `Stack Shop - Admin`,
		description: "A simple e-commerce admin interface for your stack",
	};
};

