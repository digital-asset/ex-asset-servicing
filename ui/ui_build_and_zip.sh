echo 
echo Building UI
yarn workspaces run build

echo
echo Creating UI Zip file
rm -r target/
mkdir target
zip -r target/ex-asset-servicing-ui.zip build/

echo
echo UI Zip file created at 'target/ex-asset-servicing-ui.zip'