import sharpService from "astro/assets/services/sharp";

const MAX_WIDTH = 1440;

export default {
	...sharpService,
	async transform(inputBuffer, transformOptions, config) {
		if (transformOptions.width && transformOptions.width > MAX_WIDTH) {
			const ratio = MAX_WIDTH / transformOptions.width;
			transformOptions = {
				...transformOptions,
				width: MAX_WIDTH,
				height: transformOptions.height ? Math.round(transformOptions.height * ratio) : undefined,
			};
		}
		return sharpService.transform(inputBuffer, transformOptions, config);
	},
};
