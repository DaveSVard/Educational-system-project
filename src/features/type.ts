export enum UserRole {
    ADMIN = 0,
    TEACHER = 1,
    STUDENT = 2,
}

export interface User {
    id:number;
    name:string;
    surname:string;
    email:string;
    password:string;
    phone_number:string;
    role:UserRole;
    pic_url:string;
    emailToken:string;
    code:any;
    isVerified:number;
}

export interface ITeacher {
    userId:number;
    user:User;
    groups:IGroup[];
}

export interface IStudent {
    user:User
    userId:number;
    groupId:number;
}

export interface IStudents {
    id:number;
    name:string;
    surname:string;
    pic_url:string;
    grades:number;
}

export interface ICourse {
    id:number;
    name:string;
    moduleGroups:any;
    modules:IModule[];
}   

export interface IModule {
    id:number;
    name:string;
    courseId:number;
    course:ICourse
}

export interface IGroup {
    id:number;      
    name:string;
    activeModuleId:number;
    teacherUserId:number;
    teacher:ITeacher;
    moduleGroups:IModuleGroups[]
    students:IStudent[];
}

export interface IModuleGroups {
    id:number;
    moduleId:number;
    groupId:number;
    module:IModule;
    group:IGroup;
    course:ICourse;
}

export interface IHomework {
    id:number;
    title:string;
    description:string;
    taskNumber:number;
    moduleGroupsId:number;
    grades: IGrade[];
}

export interface IGrade {
    id:number;
    rating:number;
    studentUserId:number;
    homeworkId:number;
    homeworks:IHomework[];
    student:IStudent;
}