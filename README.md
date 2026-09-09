## What if build app for production
1. comment REACT_APP_API_URL key of development and uncomment production one in .env.local file
2. update REACT_APP_ROOT_PATH=/erp in .env.local file
3. set property "homepage": "https://app.mhc9dmh.com/erp/" in package.json
4. set prop basename="/erp" to Router component
5. remove email and password values of initialValues prop in Login view (optional)