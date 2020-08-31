# Asset Servicing Reference Application

## Prerequisites

* [DAML SDK](https://docs.daml.com/getting-started/installation.html)
* [Yarn](https://yarnpkg.com/lang/en/docs/install/)

## Overview

This reference application demonstrates asset servicing workflows for stocks, listed options and structured products. It covers corporate actions (stock split, cash dividend) and lifecylce events (coupon payment, barrier hit, early redemption). A key feature being demonstrated is the separation of instrument and position lifecycling, where the privacy properties of the model ensure that no position or client data is exposed from the bank to the CSD.

## Quick Start

Build the DAML project:

    daml build

Start the sandbox ledger:

    daml start

Generate the Typescript code:

    daml codegen js -o daml.js .daml/dist/*.dar

Install the Javascript dependencies:

    cd ui && yarn install

Start up the development server:

    cd ui && yarn start

This opens a browser page pointing to `http://localhost:3000/#/login`.

## SDK Upgrade

Change the version in `daml.yaml`:

    sdk-version: <sdk-version>
    ..

Change the version in `package.json`:

    ..
    "@daml/ledger": "<sdk-version>",
    "@daml/react": "<sdk-version>",
    "@daml/types": "<sdk-version>",
    ..

Clean all build artifacts:

    make clean

Now rerun the above quickstart steps

## Contributing

We welcome suggestions for improvements via issues, or direct contributions via pull requests.
