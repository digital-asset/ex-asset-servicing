# Asset Servicing Reference Application

## Prerequisites

* [DAML SDK](https://docs.daml.com/getting-started/installation.html)
* [Yarn](https://yarnpkg.com/lang/en/docs/install/)

## Overview

This reference application demonstrates asset servicing workflows for stocks, listed options and structured products (Autocallable BRC). It covers corporate actions (stock split) and lifecylce events (coupon payment, barrier hit, early redemption). A key feature being demonstrated is the separation of instrument and position lifecycling, where the privacy properties of the model ensure that no position or client data is exposed from the bank to the CSD.

## Quick Start

Build the DAML project:

    daml build

Start the sandbox ledger:

    daml start --start-navigator 'no'

Generate the Typescript code:

    daml codegen ts -o daml2ts -p package.json .daml/dist/*.dar

Install the Javascript dependencies:

    yarn install

Build the UI code:

    yarn workspaces run build

Start up the development server:

    cd ui-ts && yarn start


This opens a browser page pointing to `http://localhost:3000/#/login`.

Note that the development server serves content via `http` and should not be exposed as is to a public-facing network.

## Contributing

We welcome suggestions for improvements via issues, or direct contributions via pull requests.
