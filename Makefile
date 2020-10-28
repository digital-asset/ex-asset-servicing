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

ui:
	rm -rf ui/build/
	cd ui && yarn build

package:
	rm -rf deploy/	
	mkdir deploy
	cp .daml/dist/asset-servicing-0.0.1.dar deploy/
	cd ui && zip -r ../deploy/asset-servicing-ui.zip build/
