// {
//     "data": [
//         {
//             "group_name": "asdasda",
//             "group_description": "this is a description"
//         }
//     ]
// }

type GroupDetails = {
  group_name: string;
  group_description: string;
};

export type GroupDetailsDto = {
  data: GroupDetails[]
  
};
