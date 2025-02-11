import { FieldValue, Timestamp } from "firebase/firestore";

export interface User{
    id:String;
    name:String;
    email:String;
    imageUrl:String;
    CreatedAt:Timestamp | FieldValue ;
    updatedAt:Timestamp | FieldValue;

}