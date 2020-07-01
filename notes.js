const fs = require("fs");
const chalk = require('chalk');

const addNote = (title, body) => {
	const notes = loadNotes();
	const dupNote = notes.find(note => {
		return note.title === title
	})
	if (!dupNote) {
		notes.push({
			title: title,
			body: body
		})
		save(notes)
		console.log(chalk.greenBright("A note has been added! :)"));
	} else {
		console.log(chalk.red("You can not write that because it already exists!"));
	}
}

const removeNote = (title) => {
	const notesN = loadNotes();
	const filteredNotes = notesN.filter(note => {
		return note.title !== title
	})
	if (filteredNotes.length < notesN.length) {
		console.log(chalk.green("The note was removed :)"));
		save(filteredNotes);
	} else {
		console.log(chalk.red("Oh dear it looks like the note was not removed!"));
	}
}

const listNotes = () => {
	const notes = loadNotes();
	const res = notes.map(note => {
		return note.title
	})
	console.log(chalk.bold("Your notes....\n") + chalk.bgYellow(chalk.black(res)));
}

const read = (title) => {
	notes = loadNotes();
	const findNote = notes.find((note) => {
		return note.title === title
	})
	if (findNote) {
		console.log(chalk.cyanBright(`${title} has been found!\n ${chalk.green(findNote.body)}`));
	} else {
		console.log(chalk.redBright(`${chalk.underline(title)} does not exist!`));
	}
}

const save = (notes) => {
	const jsonNotes = JSON.stringify(notes);
	fs.writeFileSync("notes.json", jsonNotes);
}

const loadNotes = () => {
	try {
		const noteBuffer = fs.readFileSync("notes.json");
		const note = noteBuffer.toString();
		const noteData = JSON.parse(note);
		return noteData
	} catch (err) {
		console.log("okay creating new note!");
		return []
	}
}

module.exports = {
	addNote: addNote,
	removeNote: removeNote,
	listNotes: listNotes,
	read: read
}