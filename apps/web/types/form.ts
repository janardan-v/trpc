export type FieldType=
|"TEXT"
|"EMAIL"
|"NUMBER"
|"DATE"
|"SELECT"
|"CHECKBOX"
|"RATING";

export interface SelectOption{

 id:string;

 label:string;

 value:string;

}

export interface BuilderField{

 id:string;

 formId:string;

 label:string;

 labelKey:string;

 type:FieldType;

 description:string|null;

 placeholder:string|null;

 index:string;

 isRequired:boolean;

 options?:
 SelectOption[]|null;

 checkboxLabel?:
 string|null;

 ratingMax?:
 number|null;

 minValue?:
 number|null;

 maxValue?:
 number|null;

}

export interface BuilderMeta{

 formId:string;

 title:string;

 description:string;

 visibility:
 "PUBLIC"
|"PRIVATE"
|"UNLISTED";

 deadline:Date;

 isPublished:boolean;

 password?:string;

}