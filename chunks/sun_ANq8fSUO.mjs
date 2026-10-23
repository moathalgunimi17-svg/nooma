const sun = new Proxy({"src":"/C:/Program%20Files/Git/nooma/_astro/sun.CVL0G4Ya.png","width":700,"height":643,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Mkhal/OneDrive/سطح المكتب/pro websites/nooma/src/assets/brand/sun.png";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("C:/Users/Mkhal/OneDrive/سطح المكتب/pro websites/nooma/src/assets/brand/sun.png");
							return target[name];
						}
					});

export { sun as s };
