build:
	daml build
	daml codegen js -o daml.js .daml/dist/*.dar
	cd ui && yarn install --force --frozen-lockfile

clean:
	rm -rf .daml
	rm -rf daml.js
	rm -rf deploy
	rm -rf ui/build
	rm -rf ui/node_modules

.PHONY: ui
ui:
	daml codegen js -o daml.js .daml/dist/*.dar
	cd ui && yarn install --force --frozen-lockfile
	
package:
	rm -rf deploy/	
	mkdir deploy
	cp .daml/dist/dsp-0.0.1.dar deploy/
	cd ui && yarn build
	cd ui && zip -r ../deploy/dsp-ui.zip build/
