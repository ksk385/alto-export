### Options for Content Extraction

1. We can parse the DOM using the content script. We would have to do this on the specific delivery page since the patient data is only visible on the DOM there. This only works with MutationObserver because regular DOMContentLoaded events are firing too soon.

2. We can intercept the network request to `central-fill` so that we can capture all the data easily which makes for a smoother integration. This seems like its a complicated approach since we are trying to read the data in the body.
