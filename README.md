## To run this app:
- You need Node.js and Git installed
- Clone this repository
- Run `npm install` in the directory created on clonation

Now, from that directory, we can run commands to import the files to a supposed DB.
This app currently accepts two different commands that are intended to import from two different sources, and here are the commands accepted:

- `node importProducts.js softwareAdvice feed-products/softwareAdvice.json`
- `node importProducts.js capterra feed-products/capterra.yaml`

'node importProducts.js' executes the app residing in that file. If I had more time I would implement my own CLI with a simpler command.

The first argument is the type of import, that can be one of the two options: ['capterra', 'softwareAdvice']. The second argument is the location of the file.

I added a brief sample of tests in a npm script. In order to run them you need to execute `npm run test` in your terminal.

If I had more time and the project would be greater, I would have created git branches to develop, branches for features, etc.

This is an exercise and you can find below the predicate:




## SaaS Products Import

We update our inventory of SaaS products from several sources.  Each source provides its content to us in a different format.  Write a command line script to import the products.

Input/output should be something like this:
 
````bash
$ import capterra feed-products/capterra.yaml

importing: Name: "GitHub";  Categories: Bugs & Issue Tracking, Development Tools; Twitter: @github
importing: Name: "Slack"; Categories: Instant Messaging & Chat, Web Collaboration, Productivity; Twitter: @slackhq
````

Considerations:

- Currently, we are importing products from 2 sites: capterra and softwareadvice.  They send us their weekly feed via email.  This week's files are in /feed-products
- We plan to add a third provider soon who will make their feed available via csv output online via a url (you don't need to implement this, just keep it in mind)
- Do not implement any data persistence code, just provide some dummy classes that echo what they are doing.  Keep in mind that the company is planning to switch from MySQL to MongoDB in 3 months.
- The focus here should be on design, more than implementation.  We are less interested in seeing that this works than in seeing how you approach the problem.
- Please provide at least some unit tests (it is not required to write them for every class). Functional tests are also a plus.
- Please provide a short summary detailing anything you think is relevant, for example:
  - Installation steps
  - How to run your code / tests
  - Where to find your code
  - Was it your first time writing a unit test, using a particular framework, etc?
  - What would you have done differently if you had had more time
  - Etc.
* * * 

## Code Submission

As a result of this assignment we expect to recieve a link to your shared git repository (i.e. Bitbucket or Gitlab offer free private repos).
Having full commit history is optional but would be considered as a plus.
