build:
	daml build
	daml codegen ts -o daml2ts -p package.json .daml/dist/*.dar
	cd daml2ts/asset-servicing-0.0.1 && yarn build
	cd ui && yarn build
	daml start --start-navigator='no'
