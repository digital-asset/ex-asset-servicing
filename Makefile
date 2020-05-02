build:
	daml build
	daml codegen ts -o daml2js .daml/dist/*.dar
	cd ui && yarn install --force --frozen-lockfile
	daml start --start-navigator='no'
