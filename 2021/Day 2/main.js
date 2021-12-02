const fs = require('fs');

const input = './input.txt';
const fileRead = (fileName) => (fs.readFileSync(fileName)).toString();
const cmd = (fileRead(input)).split('\n');

function finalResult (part, cmd){
    let axis = { horizontal: 0, depth: 0, aim: 0 /* aim: second part */ };

    cmd.forEach(command => {
        if(!command.includes(' ')) return;
        const [nameCMD, value] = [command.split(' ')[0], parseInt(command.split(' ')[1])];
        if(!nameCMD || !value) return;

        if(part){
            if(nameCMD === 'forward') axis.horizontal += value;
            if(nameCMD === 'down') axis.depth += value;
            if(nameCMD === 'up') axis.depth -= value;
        }
        if(!part){
            if(nameCMD === 'forward') axis.horizontal += value, axis.depth += (axis.aim * value);
            if(nameCMD === 'down') axis.aim += value;
            if(nameCMD === 'up') axis.aim -= value;
        }
    });

    return axis.horizontal * axis.depth;
}

// Answer first part: 1427868
console.log(finalResult(true, cmd));

// Answer second part: 1568138742
console.log(finalResult(false, cmd));