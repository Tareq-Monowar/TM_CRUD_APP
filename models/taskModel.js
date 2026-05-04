let tasks = [];
let id = 1;

exports.getAll = () => tasks;

exports.getById = (taskId) => tasks.find(t => t.id === taskId);

exports.create = (data) => {
    const task = {
        id: id++,
        title: data.title,
        description: data.description || "",
        status: data.status || "To Do"
    };
    tasks.push(task);
    return task;
};

exports.update = (taskId, data) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return null;

    task.title = data.title ?? task.title;
    task.description = data.description ?? task.description;
    task.status = data.status ?? task.status;

    return task;
};

exports.remove = (taskId) => {
    const index = tasks.findIndex(t => t.id === taskId);
    if (index === -1) return false;

    tasks.splice(index, 1);
    return true;
};