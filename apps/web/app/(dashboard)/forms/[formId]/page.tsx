"use client";

import {
 useParams,
} from
"next/navigation";

export default function SubmitPage(){

const params=
useParams();

const formId=
params.formId as string;

return(

<div
className="
mx-auto
max-w-3xl
space-y-6
p-8
"
>

<h1>

Form Submission

</h1>

<p>

Form:

{formId}

</p>

</div>

);

}