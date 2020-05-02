build:
	daml build
	rm -rf daml2js
	daml codegen js -o daml2js .daml/dist/*.dar
	cd ui && yarn install --force --frozen-lockfile
	daml start --start-navigator='no'

package:
	rm -rf deploy/	
	mkdir deploy
	daml build
	cp .daml/dist/asset-servicing-0.0.1.dar deploy/
	daml codegen js -o daml2js .daml/dist/*.dar
	cd ui && yarn install --force --frozen-lockfile
	cd ui && yarn build
	cd ui && zip -r ../deploy/asset-servicing-ui.zip build/
