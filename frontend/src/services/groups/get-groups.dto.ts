/**
 * Group data from BE
 */

//assuming the camel casing works
export type GroupData = {
  gid: string;
  groupName: string;
  groupDescription: string;
};

/**
 * Get groups response body
 */
export type GetGroupsDto = {
  data: {
    /**
     * Groups where user is admin in
     */
    adminArr: GroupData[];
    /**
     * Groups where user is member in
     */
    memberArr: GroupData[];
  };
};
