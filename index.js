const readline = require('readline');
const fs = require('fs').promises;
const { program } = require('commander');
require('colors');


// rl.on('line', (txt) => {
//     console.log('Your text:' + txt);
//     process.exit();
// })

program.option('-f, --file <file name>', 'log file name', 'game_results.txt');
program.parse(process.argv);

 

// console.log(program.opts());

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let counter = 0;
const mind = Math.ceil(Math.random() * 10);
const logFile = program.opts().file;
/**
 * 
 * @param {string} msg 
 * @returns {Promise<voit>}
 */
const logger = async(msg) => {
    try{
        await fs.appendFile(logFile, `${msg}\n`);
        console.log(`Successfully saved game results to the file ${logFile}`.white);

    } catch (error) {
        console.log(error.message);
    }
}



/**
 * Basic number validator...
 * @param {number} value 
 * @returns {boolean}
 */
const isValid = (value) => {
    if(!isNaN(value) && value > 0 && value <= 10){
        return true;
    }
    if(isNaN(value)) {
        console.log('Please, enter a number!'.blue);
    }

    if(value < 1 || value > 10) {
        console.log('Number shoud be between 1 and 10'.magenta);
    } 

    return false;
};

const game = () => {
    rl.question('Please, choose number from 1 to 10!\n'.red, (value) => {
        const number = Number(value);

        if(!isValid(number)){
            return game();
        }

        counter ++;

        if (number !== mind) {
            console.log('Oh no! Try again!!!'.yellow);

            return game();5
        }
            console.log(`Congratulations! You have guessed the number in ${counter} step(s)`.green);
            logger(`${new Date().toLocaleString('uk-UA')}: Congratulations!!!!! You guessed the number in ${counter} step(s)`.green)
            rl.close();
    });
};

game();