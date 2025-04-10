import fs from "fs";
const filePath = "./tasks.json";
import path from "path";

const dirPath = path.resolve(filePath);

if (!fs.existsSync(dirPath)) {
  // fs.mkdirSync(dirPath, {recursive : true})
  fs.writeFileSync(dirPath, JSON.stringify([]));
}

const loadTasks = () => {
  //! Callback will not work with synchronous functions
  // fs.readFileSync(filePath, 'utf-8',(err,data) => {
  //     if(err){
  //         console.error('Error reading file:', err);
  //         return [];
  //     }else{
  //         const dataBuffer = data.toString();
  //         console.log(JSON.parse(dataBuffer))
  //         return JSON.parse(dataBuffer);
  //     }
  // })
  const data = fs.readFileSync(filePath, "utf-8");

  try {
    const dataBuffer = data.toString();
    const tasks = JSON.parse(dataBuffer);
    return tasks;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return [];
  }
};

const saveTask = (allTasks) => {
  const dataJson = JSON.stringify(allTasks);
  //! Callback will not work with synchronous functions
  // fs.writeFileSync(filePath , dataJson , (err) => {
  //     if(err){
  //         console.error('Error writing file:', err);
  //     }
  // })

  fs.writeFileSync(filePath, dataJson);
};

const addTask = (task) => {
  const allTasks = loadTasks();
  const taskData = {
    id: Date.now(),
    task: task,
    completed: false,
    createdAt: new Date().toLocaleString(),
  };
  allTasks.push(taskData);
  saveTask(allTasks);
  console.log("Task added successfully!");
};

const listTasks = () => {
  const tasks = loadTasks();
  if (tasks.length === 0) {
    console.log("No tasks found.");
    return;
  }
  console.log("All Tasks::", tasks);
};

const removeTask = (taskId) => {
  const allTasks = loadTasks();
  taskId = parseInt(taskId, 10); // Convert taskId to an integer
  const filteredTasks = allTasks.filter((task) => task.id !== taskId);

  if (allTasks.length === filteredTasks.length) {
    console.log("No task found with that id");
    return;
  }
  saveTask(filteredTasks);
  const tasks = loadTasks();
  console.log(tasks);
};

const updateTask = (taskId) => {
    const allTasks = loadTasks();
    taskId = parseInt(taskId, 10); // Convert taskId to an integer

    const taskIndex = allTasks.findIndex((task) =>  task.id === taskId)

    if(taskIndex === -1 ){
        console.log("No task found with that id")
        return;
    }

    allTasks[taskIndex].completed = !allTasks[taskIndex].completed;
    allTasks[taskIndex].updatedAt = new Date().toLocaleString();
    saveTask(allTasks);
    console.log("Task updated successfully!");
}

const command = process.argv[2];
const argument = process.argv[3];

if (command === "add") {
  addTask(argument);
} else if (command === "list") {
  listTasks();
} else if (command === "remove") {
  removeTask(argument);
}
else if(command === "update"){
    updateTask(argument);
}
else {
  console.log("Command not recognized");
}
