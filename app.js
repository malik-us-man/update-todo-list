#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let todos = [];
let condition = true;
console.log(chalk.bold.yellow("\n \tWelcome to Todo-List Application\n"));
while (condition) {
    let ans = await inquirer.prompt([
        {
            name: "select",
            type: "list",
            message: "select an operation",
            choices: ["Add", "Update", "View", "Delete", "Exit"],
        },
    ]);
    if (ans.select === "Add") {
        let addTodo = await inquirer.prompt({
            name: "todo",
            type: "input",
            message: chalk.blue("Add item in the list"),
            validate: function (input) {
                if (input.trim() == "") {
                    return "Please enter a non-empty item.";
                }
                return true;
            },
        });
        if (addTodo.todo.trim() !== "") {
            todos.push(addTodo.todo);
            todos.forEach((todo) => console.log(todo));
        }
    }
    if (ans.select === "Update") {
        let updateTodo = await inquirer.prompt({
            name: "todo",
            type: "list",
            message: chalk.blue("Update item in the list"),
            choices: todos.map((item) => item),
        });
        let addTodo = await inquirer.prompt({
            name: "todo",
            type: "input",
            message: chalk.blue("Add item in the list"),
        });
        let newTodo = todos.filter((val) => val !== updateTodo.todo);
        todos = [...newTodo, addTodo.todo];
        todos.forEach((todo) => console.log(todo));
    }
    if (ans.select === "View") {
        todos.forEach((todo) => console.log(todo));
    }
    if (ans.select === "Delete") {
        let deletetodo = await inquirer.prompt({
            name: "todo",
            type: "list",
            message: chalk.blue("Select item to delete"),
            choices: todos.map((item) => item),
        });
        let newTodo = todos.filter((val) => val !== deletetodo.todo);
        todos = [...newTodo];
        todos.forEach((todo) => console.log(todo));
    }
    if (ans.select === "Exit") {
        console.log("Exiting program...");
        condition = false;
    }
}
