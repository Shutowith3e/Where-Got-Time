// {
//     "data": [
//         {
//             "group_name": "asdasda",
//             "group_description": "this is a description"
//         }
//     ]
// }

type GroupDetail = {
  group_name: string;
  group_description: string;
};

export type GroupDetailDto = {
  data: GroupDetail[]
  
};
