declare interface IList  {
    _id?: any;
    listName?: string;
    text?: string;
    completed?: boolean;
    private?: boolean;
    numberOfTodos?: number;
    numberOfTodosCompleted?: number;
    createdBy?: string;
    createdAt?: string;
    lastEditDate?: Date;
}
