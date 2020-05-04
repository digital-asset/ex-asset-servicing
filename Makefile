build:
	rm -rf .daml
	rm -rf daml2js
	rm -rf ui/build
	daml build
	daml codegen js -o daml2js .daml/dist/*.dar
	cd ui && yarn install --force --frozen-lockfile
	cd ui && yarn build

ui:
	rm -rf ui/build/
	cd ui && yarn build

package:
	rm -rf deploy/	
	mkdir deploy
	cp .daml/dist/asset-servicing-0.0.1.dar deploy/
	cd ui && zip -r ../deploy/asset-servicing-ui.zip build/
