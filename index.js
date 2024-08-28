const FILE_PATH = "./data.json";
const simpleGit = require("simple-git");
const jsonfile = require("jsonfile");
const moment = require("moment");
const random = require("random");

// Change the working directory to where your local repository is located
const git = simpleGit('E:/Git graph/Git bot/ContributionChart');

const makeCommit = (n) => {
  if (n === 0) {
    // Push changes to the remote repository at the end
    git.push(["-u", "origin", "main"], (err, result) => {
      if (err) {
        console.error("Error pushing to remote:", err);
      } else {
        console.log("Pushed all changes to the remote repository");
      }
    });
    return;
  }

  const x = random.int(0, 54);
  const y = random.int(0, 6);
  const DATE = moment()
    .subtract(1, "y")  // Subtract one year from the current date
    .add(1, "d")       // Add one day
    .add(x, "w")       // Add random weeks
    .add(y, "d")       // Add random days
    .format();

  const data = {
    date: DATE,
  };
  console.log(`Committing with date: ${DATE}`);

  jsonfile.writeFile(FILE_PATH, data, () => {
    git
      .add([FILE_PATH])
      .commit(DATE, { "--date": DATE })
      .then(() => {
        console.log(`Committed: ${DATE}`);
        makeCommit(--n);
      })
      .catch((err) => {
        console.error("Error during commit:", err);
      });
  });
};

makeCommit(120);








// const FILE_PATH = "./data.json";
// const simpleGit = require("simple-git");
// const jsonfile = require("jsonfile");
// const moment = require("moment");
// const random = require("random");

// Change the working directory to where your local repository is located
// const git = simpleGit('E:/Git graph/Git bot/ContributionChart');

// const makeCommit = (n) => {
//   if (n === 0) {
//     // Push changes to the remote repository at the end
//     git.push(["-u", "origin", "main"], (err, result) => {
//       if (err) {
//         console.error("Error pushing to remote:", err);
//       } else {
//         console.log("Pushed all changes to the remote repository");
//       }
//     });
//     return;
//   }

//   // Use today's date for all commits
//   const DATE = moment().format();

//   const data = {
//     date: DATE,
//   };
//   console.log(`Committing with date: ${DATE}`);

//   jsonfile.writeFile(FILE_PATH, data, () => {
//     git
//       .add([FILE_PATH])
//       .commit(`Commit on ${DATE}`, { "--date": DATE })
//       .then(() => {
//         console.log(`Committed: ${DATE}`);
//         makeCommit(--n);
//       })
//       .catch((err) => {
//         console.error("Error during commit:", err);
//       });
//   });
// };

// // Call the function to make 20 commits
// makeCommit(20);

