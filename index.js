const inquirer = require("inquirer");
const fs = require("fs");
let year = new Date().getFullYear();

const generateREADME = (answers) => {
  let additionalProjectLinks = "";

  if (answers.projectLinks) {
    additionalProjectLinks = answers.projectLinks.split(",").join("<br>");
  }

  let screenshots = "";
  if (answers.imageURL) {
    for (let i = 0; i < answers.imageURL.split(",").length; i++) {
      screenshots += `<kbd>![screenshot${i + 1}](${answers.imageURL
        .split(",")
        [i].trim()})</kbd>`;
    }
  }

  return ` 
# ${answers.title.toUpperCase()}
[![github-follow](https://img.shields.io/github/followers/${answers.username
    .trim()
    .toLowerCase()}?label=Follow&logoColor=purple&style=social)](https://github.com/${answers.username
    .trim()
    .toLowerCase()})
[![project-languages-used](https://img.shields.io/github/languages/count/${answers.username
    .trim()
    .toLowerCase()}/${answers.repoName.trim()}?color=important)](https://github.com/${answers.username
    .trim()
    .toLowerCase()}/${answers.repoName.trim()})
[![project-top-language](https://img.shields.io/github/languages/top/${answers.username
    .trim()
    .toLowerCase()}/${answers.repoName.trim()}?color=blueviolet)](https://github.com/${answers.username
    .trim()
    .toLowerCase()}/${answers.repoName.trim()})
[![license](https://img.shields.io/badge/License-${answers.license
    .toUpperCase()
    .split("-")
    .join("v")}-brightgreen.svg)](https://choosealicense.com/licenses/${
    answers.license
  }/)
## Table of Content
* [ Project Links ](#Project-Links)
* [ Screenshots](#Screenshots)
* [ Project Description ](#Project-Description)
* [ User Story ](#User-Story)
* [ Technologies ](#Technologies)
* [ Installation ](#Installation)
* [ Usage ](#Usage)
* [ Credits and Reference ](#Credits-and-Reference)
* [ Tests ](#Tests)
* [ Contributing ](#Contributing)
* [ Questions ](#Questions)
* [ License ](#License)
#
##  Project Links
https://github.com/${answers.username
    .trim()
    .toLowerCase()}/${answers.repoName.trim()}<br>
${additionalProjectLinks}
## Screenshots-Demo
${screenshots}

## Project Description
${answers.description}

## User Story
${answers.userStory}
## Technologies 
\`\`\`
${answers.technologies}
\`\`\`

## Installation
${answers.installation}
## Usage 
${answers.usage}

## Credits and Reference
${answers.credits}
## Tests
${answers.test}
## Contributing
${answers.contributing}
## Questions
${answers.questions}
Contact the author with any questions!<br>
Github link: [${answers.username
    .trim()
    .toLowerCase()}](https://github.com/${answers.username
    .trim()
    .toLowerCase()})<br>
Email: ${answers.email}
## License
This project is [${answers.license.toUpperCase()}](https://choosealicense.com/licenses/${
    answers.license
  }/) licensed.<br />
Copyright © ${year} [${answers.authorName
    .trim()
    .toUpperCase()}](https://github.com/${answers.username
    .trim()
    .toLowerCase()})

`;
};

inquirer
  .prompt([
    {
      //Author Name
      type: "input",
      message: "Enter your FULL name",
      name: "authorName",
      validate: function (name) {
        let validate = name.match(/^[a-zA-Z]+ [a-zA-Z]+$/g);
        if (validate) {
          return true;
        }

        return "Please enter a valid FULL name.";
      },
    },
    {
      //Author Email
      type: "input",
      message: "Enter your email",
      name: "email",
      validate: function (email) {
        let validate = email.match(/\S+@\S+\.\S+/g);
        if (validate) {
          return true;
        }

        return "Please enter a valid email.";
      },
    },
    {
      //Github Username
      type: "input",
      message: "Enter your github username",
      name: "username",
      validate: function (username) {
        if (username) {
          return true;
        }

        return "It is required to enter your github username.";
      },
    },
    {
      // Github REPO name
      type: "input",
      message: "Enter your Project Github Repo name",
      name: "repoName",
      validate: function (reponame) {
        if (reponame) {
          return true;
        }

        return "It is required to enter your Github Project Repo name.";
      },
    },
    {
      //Check on additional project links
      type: "confirm",
      name: "isLinks",
      message:
        "Besides the project repo link, Would you like to add additional project link(s)?",
      default: false,
    },
    {
      // Get addtional project links
      // https://stackoverflow.com/questions/161738/what-is-the-best-regular-expression-to-check-if-a-string-is-a-valid-url
      type: "input",
      name: "projectLinks",
      message:
        'Enter the additional project link(s) using the entire link, including the http(s):. (* Use comma "," to separate each link)',
      when: function (answers) {
        return answers.isLinks !== false;
      },
      validate: function (projectLinks) {
        for (let i = 0; i < projectLinks.split(",").length; i++) {
          let pass = projectLinks
            .split(",")
            [i].trim()
            .match(
              /^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$/g
            );

          if (pass) {
            return true;
          }

          return "Provide the valid links of the project using the entire link, including the http(s):";
        }
      },
    },
    {
      //  Project Title
      type: "input",
      message: "Enter your project title",
      name: "title",
      validate: function (title) {
        if (title) {
          return true;
        }

        return "A professional README has a project title.";
      },
    },
    {
      //Check on Screenshots and/or Demo
      type: "confirm",
      name: "screenshots",
      message: "Would you like to add screenshots or demo to README?",
      default: false,
    },
    {
      // Get image path and/or URL
      type: "input",
      name: "imageURL",
      message:
        'Enter the image paths or urls of screenshots or demo. (* Use comma "," to separate each path or url)',
      when: function (answers) {
        return answers.screenshots !== false;
      },
      validate: function (imageURL) {
        if (imageURL) {
          return true;
        }

        return "Provide the image paths or urls of screenshots or demo. ";
      },
    },
    {
      //Project Description
      type: "input",
      message: "What is your project description?",
      name: "description",
      validate: function (description) {
        if (description) {
          return true;
        }

        return "A professional README provides the project description.";
      },
    },
    {
      // Project user-story
      type: "input",
      message: "Provide the User Story for your project",
      name: "userStory",
      validate: function (userstory) {
        if (userstory) {
          return true;
        }

        return "A professional README provides the User Story for the propject.";
      },
    },
    {
      //Technologies used
      type: "input",
      message:
        'List the technologies used for the Project. (* Use comma "," to separate each technology)',
      name: "technologies",
      validate: function (tech) {
        if (tech) {
          return true;
        }

        return "A professional README lists technologies used for the Project.";
      },
    },
    {
      //Installation
      type: "input",
      message: "What are the steps required to install your project?",
      name: "installation",
      validate: function (install) {
        if (install) {
          return true;
        }

        return "A professional README provides steps on how to install the project.";
      },
    },
    {
      // How to use
      type: "input",
      message: "Provide instructions on how to use your project",
      name: "usage",
      validate: function (use) {
        if (use) {
          return true;
        }

        return "A professional README provides instructions on how to use the project.";
      },
    },
    {
      //Credits / Reference
      type: "input",
      message: "Enter the parties and links you like to give credits to",
      name: "credits",
      validate: function (credits) {
        if (credits) {
          return true;
        }

        return "A professional README provides credits and refereneces to the project.";
      },
    },
    {
      // Tests
      type: "input",
      message: "How can others test your project?",
      name: "test",
      default: "npm test",
    },
    {
      // Contributing
      type: "input",
      message: "How can others contribute to this project?",
      name: "contributing",
      validate: function (contributing) {
        if (contributing) {
          return true;
        }

        return "Professional README's include contributions.";
      },
    },
    {
      // Tests
      type: "input",
      message: "How do others reach out with additional questions?",
      name: "questions",
      validate: function (questions) {
        if (questions) {
          return true;
        }

        return "Professional README's include contact references.";
      },
    },
    {
      // License
      type: "list",
      message: "Please select a license for your project.",
      name: "license",
      choices: [
        {
          name: "MIT",
          value: "mit",
        },
        {
          name: "GNU GPLv3",
          value: "gpl-3.0",
        },
        {
          name: "GNU AGPLv3",
          value: "agpl-3.0",
        },
        {
          name: "GNU LGPLv3",
          value: "lgpl-3.0",
        },
        {
          name: "APACHE 2.0",
          value: "apache-2.0",
        },
        {
          name: "Mozilla Public 2.0",
          value: "mpl-2.0",
        },
        {
          name: "The Unlicense",
          value: "unlicense",
        },
        {
          name: "Boost Software 1.0 ",
          value: "bsl-1.0",
        },
      ],
    },
  ])
  .then((answers) => {
    const readMeContent = generateREADME(answers);

    fs.writeFile("README.md", readMeContent, (err) =>
      err ? console.log(err) : console.log("Successfully created README!")
    );
  });
