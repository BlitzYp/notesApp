const {
    getNotes,
    addNote,
    removeNote,
    listNotes,
    read
} = require("./notes");
const chalk = require('chalk');
const yargs = require("yargs");

// Changing version of yargs
yargs.version("1.1.0")

//add, remove, read, list

//ADD
yargs.command({
    command: "add",
    describe: "Add a note",
    builder: {
        title: {
            describe: "this is the note title",
            demandOption: true,
            type: "string"
        },
        body: {
            describe: "This is the note body",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        addNote(argv.title, argv.body)
    }
})

//REMOVE
yargs.command({
    command: "remove",
    describe: "Remove a note",
    builder: {
        title: {
            describe: "the note title",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        removeNote(argv.title)
    }
})
//LIST
yargs.command({
    command: "listNotes",
    describe: "Show all the notes",
    handler() {
        listNotes()
    }
})
//READ
yargs.command({
    command: "read",
    describe: "Read your notes",
    builder: {
        title: {
            describe: "Read a note",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        read(argv.title)
    }
})

yargs.parse()