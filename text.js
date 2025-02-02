// src/game.ts
import inquirer from 'inquirer';
var Direction;
(function (Direction) {
    Direction["NORTH"] = "north";
    Direction["SOUTH"] = "south";
    Direction["EAST"] = "east";
    Direction["WEST"] = "west";
})(Direction || (Direction = {}));
const rooms = {
    'start': {
        description: 'You are in a dark room. There are doors to the north and east.',
        [Direction.NORTH]: 'northRoom',
        [Direction.EAST]: 'eastRoom'
    },
    'northRoom': {
        description: 'You are in a room with a bright light coming from the north. There is a door to the south.',
        [Direction.SOUTH]: 'start'
    },
    'eastRoom': {
        description: 'You are in a room with a treasure chest!',
        [Direction.WEST]: 'start'
    }
};
let currentRoom = 'start';
function displayRoomDescription(room) {
    console.log(room.description);
}
async function move() {
    const { direction } = await inquirer.prompt({
        type: 'list',
        name: 'direction',
        message: 'Which direction do you want to go?',
        choices: Object.values(Direction)
    });
    const nextRoom = rooms[currentRoom][direction];
    if (nextRoom) {
        currentRoom = nextRoom;
        displayRoomDescription(rooms[currentRoom]);
    }
    else {
        console.log('You cannot go that way.');
    }
}
async function playGame() {
    displayRoomDescription(rooms[currentRoom]);
    while (true) {
        await move();
    }
}
playGame().catch(err => console.error(err));
